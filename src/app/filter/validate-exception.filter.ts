import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  Injectable,
} from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Response } from 'express';
import { UserService } from '../services/user.service';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    console.log('exceptionResponse', exceptionResponse);

    const customResponse = {
      statusCode: status,
      message: 'Validation failed',
      errors: this.formatErrors(exceptionResponse),
    };

    response.status(status).json(customResponse);
  }

  private formatErrors(response: any) {
    if (
      typeof response === 'object' &&
      response.message &&
      Array.isArray(response.message)
    ) {
      return response.message.map((msg) => {
        if (typeof msg === 'string') {
          return msg;
        } else if (typeof msg === 'object') {
          return Object.values(msg.constraints).join(', ');
        }
      });
    }
    return response;
  }
}

@ValidatorConstraint({ name: 'IsEmailUserAlreadyExist', async: true })
@Injectable()
export class IsEmailExistConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly userService: UserService) {}
  async validate(value: string) {
    const user = this.userService.getDetailUserByField('email', value);
    return !user;
  }
}

export function IsEmailUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailExistConstraint,
    });
  };
}
