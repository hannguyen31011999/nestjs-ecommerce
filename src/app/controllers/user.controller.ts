import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { msgResponse } from 'src/common/constant';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { UpdateActiveUserDto } from '../dto/user/update-active-dto';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { EmailExistsPipe } from '../pipes/email-exist.pipe';
import { NumberPhoneExistsPipe } from '../pipes/number-phone-exist.pipe';
import { UserService } from '../services/user.service';
import { IUser, ResponseListUser, UserFilter } from '../types/user';
import { BaseController } from './base.controller';

@ApiTags('user')
@Controller('user')
export class UserController extends BaseController {
  constructor(private userService: UserService) {
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
  async getListUser(@Query() { page, limit, orderBy }: UserFilter) {
    const result: ResponseListUser = await this.userService.getListUser({
      page,
      limit,
      orderBy,
    });
    if (result.data.length > 0) {
      this.setter(HttpStatus.OK, msgResponse.user.read);
    }
    return this.getResponse(result);
  }

  @Post('register')
  @UsePipes(NumberPhoneExistsPipe)
  @UsePipes(EmailExistsPipe)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user: IUser | undefined | null =
      await this.userService.createUser(createUserDto);
    if (user) {
      this.setter(HttpStatus.OK, msgResponse.user.create);
    }
    return this.getResponse(user);
  }

  @ApiParam({
    name: 'id',
    example: 1,
  })
  @Get('/:id')
  async getUserById(@Param('id') id) {
    const user: IUser | undefined | null =
      await this.userService.getDetailUserByField('id', id);
    if (user) {
      this.setter(HttpStatus.OK, msgResponse.user.read);
    }
    return this.getResponse(user);
  }

  @ApiParam({
    name: 'id',
    example: 1,
  })
  @Put('/:id')
  @UsePipes(NumberPhoneExistsPipe)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.updateUser(id, updateUserDto);
    if (user) this.setter(HttpStatus.OK, msgResponse.user.update);
    return this.getResponse(user);
  }

  @ApiParam({
    name: 'id',
    example: 1,
  })
  @ApiBody({
    type: UpdateActiveUserDto,
  })
  @Put('active/:id')
  async updateActiveUser(
    @Param('id') id: string,
    @Body('isActive') isActive: boolean,
  ) {
    const user = await this.userService.updateStatus(id, isActive);
    if (user) this.setter(HttpStatus.OK, msgResponse.user.update);
    return this.getResponse(user);
  }
}
