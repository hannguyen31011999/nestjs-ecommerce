import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { msgResponse } from 'src/common/constant';

@Injectable()
export class NumberPhoneExistsPipe implements PipeTransform {
  constructor(private readonly usersService: UserService) {}

  async transform(value: any) {
    const user = await this.usersService.getDetailUserByField(
      'phone_number',
      value.phone_number,
    );
    if (user) {
      throw new BadRequestException({
        statusCode: 400,
        message: msgResponse[422],
        errors: {
          phone_number: 'Phone number already exists',
        },
      });
    }

    return value;
  }
}
