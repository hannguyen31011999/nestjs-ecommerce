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
      this.updateRefreshToken(user.id, accessToken);
      this.setter(HttpStatus.OK, msgResponse.signIn.success);
      return this.getResponse({ accessToken, refreshToken });
    } catch (err) {
      throw new HttpException(msgResponse[400], HttpStatus.BAD_REQUEST);
    }
  }

  async logout(id: string) {
    return (await this.userService.getDetailUserByField('id', id)).updateOne({
      access_token: '',
    });
  }

  async updateRefreshToken(id: string, accessToken: string) {
    (await this.userService.getDetailUserByField('id', id)).updateOne({
      access_token: accessToken,
    });
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
