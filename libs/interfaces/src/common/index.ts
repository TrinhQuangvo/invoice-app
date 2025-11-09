import { HTTP_MESSAGES } from '@common/constants';
import { HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
export class Request<T> {
  payload?: T;
  processId?: string;

  constructor(data: Partial<Request<T>>) {
    Object.assign(this, data);
  }
}

export class Response<T> {
  data?: T;
  message: string;
  error?: string;
  statusCode?: number;

  constructor(data: Partial<Response<T>>) {
    this.data = data.data;
    this.message = data.message || HTTP_MESSAGES.OK;
    this.error = data.error;
    this.statusCode = data.statusCode ?? HttpStatus.OK;
  }

  static success<U>(data: U): Response<U> {
    return new Response<U>({ data });
  }
}

export interface TCPClient {
  send<TResult = any, TInput = any>(pattern: any, data: ResponseType<TInput>): Observable<ResponseType<TResult>>;
  emit<TResult = any, TInput = any>(pattern: any, data: RequestType<TInput>): Observable<ResponseType<TResult>>;
}

export type RequestType<T> = Request<T>;
export type ResponseType<T> = Response<T>;
