import {
  ApiExtraModels,
  ApiProperty,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ErrorCode, ErrorMessage } from './errors/error-code.js';
import { Builder } from 'builder-pattern';
import { applyDecorators, Type } from '@nestjs/common';
import { ApiError } from './errors/api-error.js';

export class BaseResponseDto<T = unknown> {
  @ApiProperty({ type: String, enum: ErrorCode })
  code: ErrorCode;

  @ApiProperty({ type: String })
  message: string;

  @ApiProperty({ required: false })
  error: any;

  data?: T;

  static success<T>(data?: T): BaseResponseDto {
    return Builder(BaseResponseDto)
      .code(ErrorCode.SUCCESS)
      .message(ErrorMessage[ErrorCode.SUCCESS])
      .data(data)
      .build();
  }

  static error(error: ApiError) {
    return Builder(BaseResponseDto)
      .code(error.code)
      .message(error.message)
      .error(error.getResponse())
      .build();
  }
}

export interface SwaggerApiResponseOptions {
  isArray?: boolean;
}

export const SwaggerApiResponse = <TModel extends Type<any>>(
  model?: TModel,
  options?: SwaggerApiResponseOptions,
) => {
  if (!model) {
    return applyDecorators(
      ApiExtraModels(BaseResponseDto),
      ApiResponse({
        schema: {
          allOf: [{ $ref: getSchemaPath(BaseResponseDto) }],
        },
      }),
    );
  }

  return applyDecorators(
    ApiExtraModels(BaseResponseDto, model),
    ApiResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(BaseResponseDto) },
          {
            properties: {
              data: options?.isArray
                ? { type: 'array', items: { $ref: getSchemaPath(model) } }
                : { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
};
