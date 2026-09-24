import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ClsService } from 'nestjs-cls';
import { Observable, tap } from 'rxjs';
import { RequestContext } from '../request-context.js';

@Injectable()
export class RequestContextInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService<RequestContext>) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const requestId = randomUUID().toString();
    const startTime = Date.now();

    this.cls.set('requestId', requestId);
    this.cls.set('startTime', startTime);

    return next.handle().pipe(
      tap(() => {
        const endTime = Date.now();
        this.cls.set('endTime', endTime);
      }),
    );
  }
}
