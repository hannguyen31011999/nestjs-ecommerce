import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';
import { msgResponse } from 'src/common/constant';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const customResponse = {
      statusCode: status,
      message: msgResponse[422],
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
