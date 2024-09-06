import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { msgResponse } from 'src/common/constant';
import { RefreshTokenDto, SignInDto } from '../dto/auth/auth.dto';
import { AccessTokenGuard } from '../guards/access-token.guard';
import { AuthService } from '../services/auth.service';
import { BaseController } from './base.controller';
import { Auth } from '../decorators/auth.decorator';
import { IUser } from '../types/user';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super(HttpStatus.BAD_REQUEST, msgResponse[400]);
  }

  @Post('sign-in')
  signIn(@Body() { email, password }: SignInDto) {
    return this.authService.signIn(email, password);
  }

  @UseGuards(AccessTokenGuard)
  @Post('sign-out')
  async signOut(@Auth('user') user: IUser) {
    return this.authService.logout(user.access_token);
  }

  @ApiBody({
    type: RefreshTokenDto,
  })
  @Post('refresh-token')
  async refreshToken(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
