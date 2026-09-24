import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { Env } from './utils/env.js';
import { initSwagger } from './utils/swagger.js';
import { RequestContextInterceptor } from './utils/interceptors/request-context.interceptor.js';
import { ApiLoggingInterceptor } from './utils/interceptors/api-logging.interceptor.js';
import { ClsService } from 'nestjs-cls';
import { RequestContext } from './utils/request-context.js';
import { AppExceptionFilter } from './utils/app-exception-filter.js';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: Env.FE_URL,
      credentials: true,
    },
  });
  if (Env.ENABLE_SWAGGER) {
    initSwagger(app);
  }
  const clsService = app.get(ClsService<RequestContext>);
  app.useGlobalInterceptors(
    new RequestContextInterceptor(clsService),
    new ApiLoggingInterceptor(clsService),
  );
  app.useGlobalFilters(new AppExceptionFilter());
  app.use(helmet());
  await app.listen(Env.LISTEN_PORT);
}
await bootstrap();
