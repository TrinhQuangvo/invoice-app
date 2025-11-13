import { HTTP_MESSAGES } from '@common/constants';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty()
  message = HTTP_MESSAGES.OK;

  @ApiProperty({})
  data?: T;

  @ApiProperty()
  processID?: string;

  @ApiProperty()
  statusCode = HttpStatus.OK;

  @ApiProperty()
  duration?: string;

  constructor(data: Partial<ResponseDto<T>>) {
    Object.assign(this, data);
  }
}
