import { HttpStatus } from '@nestjs/common';

export class BaseController {
  private statusCode: number = HttpStatus.OK;
  private message: string = '';
  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
  getter() {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
  setter(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
  getResponse<T>(dataRes: Array<T> | null | T) {
    return {
      statusCode: this.statusCode,
      message: this.message,
      data: dataRes,
    };
  }
}
