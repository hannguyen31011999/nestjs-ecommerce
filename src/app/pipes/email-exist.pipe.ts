import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { msgResponse } from 'src/common/constant';

@Injectable()
export class EmailExistsPipe implements PipeTransform {
  constructor(private readonly usersService: UserService) {}

  async transform(value: any) {
    const user = await this.usersService.getDetailUserByField(
      'email',
      value.email,
    );
    if (user) {
      throw new BadRequestException({
        statusCode: 400,
        message: msgResponse[422],
        errors: {
          email: 'Email already exists',
        },
      });
    }

    return value;
  }
}
