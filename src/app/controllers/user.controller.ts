import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { msgResponse } from 'src/common/constant';
import { User } from 'src/database/schemas/user.schema';
import { CreateUserDto } from '../dto/user/create-user.dto';
import {
  UpdateActiveUserDto,
  UpdateUserDto,
} from '../dto/user/update-user.dto';
import { AccessTokenGuard } from '../guards/access-token.guard';
import { EmailExistsPipe } from '../pipes/email-exist.pipe';
import { NumberPhoneExistsPipe } from '../pipes/number-phone-exist.pipe';
import { UserService } from '../services/user.service';
import { ResponseListUser, UserFilter } from '../types/user';
import { BaseController } from './base.controller';
@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
@UseGuards(AccessTokenGuard)
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
    const user: User | undefined | null =
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
    const user: User | undefined | null =
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
