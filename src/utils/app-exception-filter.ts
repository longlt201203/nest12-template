import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiError } from './errors/api-error.js';
import { BaseResponseDto } from './base-response.dto.js';
import { ErrorCode } from './errors/error-code.js';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AppExceptionFilter.name, {
    timestamp: true,
  });

  catch(exception: any, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    if (exception instanceof ApiError) {
      res.status(exception.getStatus()).send(BaseResponseDto.error(exception));
      return;
    } else {
      this.logger.error(exception);
      res
        .status(500)
        .send(
          BaseResponseDto.error(
            new ApiError(
              ErrorCode.INTERNAL_SERVER_ERROR,
              HttpStatus.INTERNAL_SERVER_ERROR,
            ),
          ),
        );
      return;
    }
  }
}
