import { HttpStatus, Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from './base.controller';
import { msgResponse } from 'src/common/constant';

@ApiTags('auth')
@Injectable()
export class AuthController extends BaseController {
  constructor() {
    super(HttpStatus.BAD_REQUEST, msgResponse[400]);
  }
}
