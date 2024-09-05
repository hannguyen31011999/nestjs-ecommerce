import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants, msgResponse } from 'src/common/constant';
import { BaseController } from '../controllers/base.controller';
import { IUser } from '../types/user';
import { UserService } from './user.service';

@Injectable()
export class AuthService extends BaseController {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private jwtService: JwtService,
  ) {
    super(HttpStatus.BAD_REQUEST, msgResponse[400]);
  }

  async signIn(email: string, password: string) {
    try {
      const user = await this.userService.getDetailUserByField('email', email);
      if (!user) return this.getResponse(null);
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return this.getResponse(null);
      const { accessToken, refreshToken } = await this.getTokens(user);
      await this.updateAccessToken(user.id, accessToken);
      this.setter(HttpStatus.OK, msgResponse.signIn.success);
      return this.getResponse({ accessToken, refreshToken, user });
    } catch (err) {
      throw new HttpException(msgResponse[400], HttpStatus.BAD_REQUEST);
    }
  }

  async logout(token: string) {
    let statusCode: number = HttpStatus.OK;
    let messageCode: string = msgResponse.signOut.success;
    const user = await this.userService.getDetailUserByField(
      'access_token',
      token,
    );
    if (!user) {
      statusCode = HttpStatus.BAD_REQUEST;
      messageCode = msgResponse.signOut.fail;
    }
    this.setter(statusCode, messageCode);
    await this.updateAccessToken(user.id, '');
    return this.getResponse(null);
  }

  async updateAccessToken(id: string, accessToken: string) {
    await this.userService.updateUserByField(id, 'access_token', accessToken);
  }

  async refreshToken(token: string) {
    let statusCode: number = HttpStatus.OK;
    let messageCode: string = msgResponse.refreshToken.success;
    const user: IUser = await this.userService.getDetailUserByField(
      'refresh_token',
      token,
    );
    if (!user) {
      statusCode = HttpStatus.BAD_REQUEST;
      messageCode = msgResponse[400];
    }
    const { refreshToken } = await this.getTokens(user);
    this.setter(statusCode, messageCode);
    return this.getResponse({ refreshToken });
  }

  async getTokens(user: IUser) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          user,
        },
        {
          secret: jwtConstants.secret,
          expiresIn: jwtConstants.expired.access_token,
        },
      ),
      this.jwtService.signAsync(
        {
          user,
        },
        {
          secret: jwtConstants.secret,
          expiresIn: jwtConstants.expired.refresh_token,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
