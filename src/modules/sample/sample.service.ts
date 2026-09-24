import { Injectable } from '@nestjs/common';
import { SampleRepository } from '../../db/repositories/sample.repository.js';
import { CreateSampleDto } from './dto/sample.dto.js';

@Injectable()
export class SampleService {
  constructor(private readonly sampleRepo: SampleRepository) {}

  async createSample(dto: CreateSampleDto) {
    await this.sampleRepo.insert(dto);
  }
}
