import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
  RequestMethod,
} from '@nestjs/common';
import { HTTP_CODE_METADATA } from '@nestjs/common/constants.js';
import { Request } from 'express';
import { ClsService } from 'nestjs-cls';
import { Observable, tap } from 'rxjs';
import { RequestContext } from '../request-context.js';

@Injectable()
export class ApiLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ApiLoggingInterceptor.name, {
    timestamp: true,
  });

  constructor(private readonly cls: ClsService<RequestContext>) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const req = context.switchToHttp().getRequest<Request>();

    return next.handle().pipe(
      tap({
        next: (data) => {
          this.log(req, this.getSuccessStatus(context, req), data);
        },
        error: (error) => {
          const status =
            error instanceof HttpException
              ? error.getStatus()
              : HttpStatus.INTERNAL_SERVER_ERROR;
          const body =
            error instanceof HttpException
              ? error.getResponse()
              : { message: error?.message };
          this.log(req, status, body);
        },
      }),
    );
  }

  private log(req: Request, status: number, response: unknown) {
    const requestId = this.cls.get('requestId');
    const startTime = this.cls.get('startTime') ?? Date.now();
    const duration = Date.now() - startTime;

    const message = JSON.stringify({
      requestId,
      method: req.method,
      url: req.originalUrl,
      status,
      duration: `${duration}ms`,
      ip: req.ip ?? req.socket.remoteAddress,
      userAgent: req.get('user-agent'),
      request: {
        params: req.params,
        query: req.query,
        body: req.body,
      },
      response,
    });

    if (status >= 500) {
      this.logger.error(message);
    } else if (status >= 400) {
      this.logger.warn(message);
    } else {
      this.logger.log(message);
    }
  }

  // Nest applies the final status code after interceptors run, so resolve it
  // the same way Nest does: @HttpCode() if present, otherwise 201 for POST, 200 for the rest.
  private getSuccessStatus(context: ExecutionContext, req: Request): number {
    const httpCode = Reflect.getMetadata(
      HTTP_CODE_METADATA,
      context.getHandler(),
    ) as number | undefined;
    if (httpCode) return httpCode;
    return req.method === RequestMethod[RequestMethod.POST]
      ? HttpStatus.CREATED
      : HttpStatus.OK;
  }
}
