import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOptions } from './datasource-options.js';
import { SampleEntity } from './entities/sample.entity.js';
import { SampleRepository } from './repositories/sample.repository.js';

const entities = [SampleEntity];

const repositories = [SampleRepository];

@Global()
@Module({
  imports: [TypeOrmModule.forRoot({ ...datasourceOptions, entities })],
  providers: [...repositories],
  exports: [...repositories],
})
export class DbModule {}
