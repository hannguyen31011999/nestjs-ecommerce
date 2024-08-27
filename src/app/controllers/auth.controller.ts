import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { msgResponse } from 'src/common/constant';
import { SignInDto } from '../dto/auth/auth.dto';
import { AuthService } from '../services/auth.service';
import { BaseController } from './base.controller';

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
}
