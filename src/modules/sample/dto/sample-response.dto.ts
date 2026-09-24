import { ApiProperty } from '@nestjs/swagger';

export class SampleResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;
}
