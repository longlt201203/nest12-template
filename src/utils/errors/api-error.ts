import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode, ErrorMessage } from './error-code.js';

export class ApiError extends HttpException {
  code: ErrorCode;

  constructor(code: ErrorCode, status: HttpStatus) {
    super(ErrorMessage[code], status);
    this.code = code;
  }
}
