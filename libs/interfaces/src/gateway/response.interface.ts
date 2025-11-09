import { HttpStatus } from '@nestjs/common';
import { HTTP_MESSAGES } from '@common/constants';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDTO<T> {
  @ApiProperty({ type: String })
  data?: T;

  @ApiProperty()
  message: HTTP_MESSAGES.OK;

  @ApiProperty()
  statusCode: HttpStatus.OK;
  @ApiProperty()
  processId?: string;

  @ApiProperty({ type: Number })
  duration?: number;

  constructor(payload: Partial<ResponseDTO<T>>) {
    Object.assign(this, payload);
  }
}
