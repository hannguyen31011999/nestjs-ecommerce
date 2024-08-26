import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../services/user.service';

@ValidatorConstraint({ name: 'IsEmailAlreadyExist', async: true })
@Injectable()
export class IsEmailAlreadyExist implements ValidatorConstraintInterface {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService,
  ) {}

  async validate(email: string) {
    const user = await this.usersService.getDetailUserByField('email', email);
    return !user;
  }

  defaultMessage() {
    return 'Email $value already exists!';
  }
}
