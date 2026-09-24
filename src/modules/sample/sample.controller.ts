import { Body, Controller, Post } from '@nestjs/common';
import { type CreateSampleDto, CreateSampleSchema } from './dto/sample.dto.js';
import { SampleService } from './sample.service.js';
import {
  BaseResponseDto,
  SwaggerApiResponse,
} from '../../utils/base-response.dto.js';
import { SampleResponseDto } from './dto/sample-response.dto.js';

@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Post()
  @SwaggerApiResponse(SampleResponseDto, { isArray: true })
  async createSample(
    @Body({ schema: CreateSampleSchema }) dto: CreateSampleDto,
  ) {
    await this.sampleService.createSample(dto);
    return BaseResponseDto.success();
  }
}
