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
      await this.updateToken(user.id, '', '');
      await this.updateToken(user.id, accessToken, refreshToken);
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
    await this.updateToken(user.id, '', '');
    return this.getResponse(null);
  }

  async updateToken(id: string, accessToken: string, refreshToken: string) {
    await this.userService.updateUserByField(id, 'access_token', accessToken);
    await this.userService.updateUserByField(id, 'refresh_token', refreshToken);
  }

  async refreshToken(token: string) {
    let statusCode: number = HttpStatus.OK;
    let messageCode: string = msgResponse.refreshToken.success;
    let data: { accessToken: string; refreshToken: string } | null = null;
    const user: IUser = await this.userService.getDetailUserByField(
      'refresh_token',
      token,
    );
    if (!user) {
      statusCode = HttpStatus.BAD_REQUEST;
      messageCode = msgResponse[400];
    } else {
      const { refreshToken, accessToken } = await this.getTokens(user);
      await this.updateToken(user.id.toString(), accessToken, refreshToken);
      data = { refreshToken, accessToken };
    }
    this.setter(statusCode, messageCode);
    return this.getResponse(data);
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
    console.log('accessToken', accessToken);
    return {
      accessToken,
      refreshToken,
    };
  }
}
