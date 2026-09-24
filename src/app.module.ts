import { Module } from '@nestjs/common';
import { SampleModule } from './modules/sample/sample.module.js';
import { DbModule } from './db/db.module.js';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    DbModule,
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
    SampleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
