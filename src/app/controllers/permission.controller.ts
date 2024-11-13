import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../guards/access-token.guard';
import { BaseController } from './base.controller';
import { PermissionService } from '../services/permission.service';
import { msgResponse } from 'src/common/constant';

@ApiBearerAuth()
@ApiTags('permission')
@Controller('permission')
@UseGuards(AccessTokenGuard)
export class PermissionController extends BaseController {
  constructor(private permissionService: PermissionService) {
    super(HttpStatus.BAD_REQUEST, 'Bad request');
  }
  @Get()
  async getPermission() {
    const data = await this.permissionService.getListPermission();
    this.setter(HttpStatus.OK, msgResponse.permission.read);
    return this.getResponse(data);
  }
}
