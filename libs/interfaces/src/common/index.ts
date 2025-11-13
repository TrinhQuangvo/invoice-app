import { HTTP_MESSAGES } from '@common/constants';
import { HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
export class Request<T> {
  processId?: string;
  data?: T;

  constructor(data: Partial<Request<T>>) {
    Object.assign(this, data);
  }
}

export class Response<T> {
  code: string;
  data?: T;
  error?: string;
  statusCode: number;

  constructor(data: Partial<Response<T>>) {
    this.code = data.code ?? HTTP_MESSAGES.OK;
    this.data = data.data;
    this.error = data.error;
    this.statusCode = data.statusCode ?? HttpStatus.OK;
  }

  static success<T>(data: T) {
    return new Response<T>({ data, code: HTTP_MESSAGES.OK, statusCode: HttpStatus.OK });
  }
}

export interface TCPClient {
  send<TResult = any, TInput = any>(pattern: any, data: RequestType<TInput>): Observable<ResponseType<TResult>>;
  emit<TResult = any, TInput = any>(pattern: any, data: RequestType<TInput>): Observable<ResponseType<TResult>>;
}

export type RequestType<T> = Request<T>;
export type ResponseType<T> = Response<T>;
