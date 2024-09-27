import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { msgResponse } from 'src/common/constant';
import { CreateRoleDto } from '../dto/role/create-role.dto';
import { RoleService } from '../services/role.service';
import { BaseController } from './base.controller';

@ApiTags('role')
@Controller('role')
export class RoleController extends BaseController {
  constructor(private roleService: RoleService) {
    super(HttpStatus.BAD_REQUEST, 'Bad request');
  }

  @Post('create')
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    const role = await this.roleService.createRole(createRoleDto);
    if (role) {
      this.setter(HttpStatus.OK, msgResponse.role.create);
    }
    return this.getResponse(role);
  }
}
