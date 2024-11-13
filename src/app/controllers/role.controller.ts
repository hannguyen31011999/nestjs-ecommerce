import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { msgResponse } from 'src/common/constant';
import { CreateRoleDto } from '../dto/role/create-role.dto';
import { UpdateRoleDto } from '../dto/role/update-role-dto';
import { RoleNameExistsPipe } from '../pipes/role-name-exist.pipe';
import { RoleService } from '../services/role.service';
import { ResponseListRole, RoleFilter } from '../types/role';
import { BaseController } from './base.controller';

@ApiTags('role')
@Controller('role')
export class RoleController extends BaseController {
  constructor(private roleService: RoleService) {
    super(HttpStatus.BAD_REQUEST, 'Bad request');
  }

  @ApiQuery({
    name: 'page',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    example: 10,
  })
  @Get()
  async getListRole(@Query() { page, limit, orderBy }: RoleFilter) {
    const result: ResponseListRole = await this.roleService.getListRole({
      page,
      limit,
      orderBy,
    });
    if (result.data.length > 0) {
      this.setter(HttpStatus.OK, msgResponse.role.read);
    }
    return this.getResponse(result);
  }

  @Post('create')
  @UsePipes(RoleNameExistsPipe)
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    const role = await this.roleService.createRole(createRoleDto);
    if (role) {
      this.setter(HttpStatus.OK, msgResponse.role.create);
    }
    return this.getResponse(role);
  }

  @Get('/:id')
  async getDetailRole(@Param('id') id: string) {
    const roleDetail = await this.roleService.getDetailRoleByField('id', id);
    if (roleDetail) this.setter(HttpStatus.OK, msgResponse.role.read);
    return this.getResponse(roleDetail);
  }

  @Put('/:id')
  @UsePipes(RoleNameExistsPipe)
  async updateRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    const updateRole = await this.roleService.updateRole(id, updateRoleDto);
    if (updateRole) this.setter(HttpStatus.OK, msgResponse.role.update);
    return this.getResponse(updateRole);
  }

  @Delete('/:id')
  async deleteRole(@Param('id') id: string) {
    const updateRole = await this.roleService.deleteRole(id);
    if (updateRole) this.setter(HttpStatus.OK, msgResponse.role.delete);
    return this.getResponse(updateRole);
  }
}
