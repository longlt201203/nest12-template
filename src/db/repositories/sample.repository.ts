import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base-repository.js';
import { DataSource } from 'typeorm';
import { SampleEntity } from '../entities/sample.entity.js';

@Injectable()
export class SampleRepository extends BaseRepository<SampleEntity> {
  constructor(datasource: DataSource) {
    super(SampleEntity, datasource);
  }
}
