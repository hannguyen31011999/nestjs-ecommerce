import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    console.log('logger', createUserDto);
    this.userService.createUser(createUserDto);
  }
}
