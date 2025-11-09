import { HTTP_MESSAGES, MetadataKeys } from '@common/constants';
import { ResponseDTO } from '@common/interfaces';
import { CallHandler, ExecutionContext, HttpException, HttpStatus, Logger, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { catchError, map, Observable } from 'rxjs';

export class ExceptionInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ExceptionInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request: Request & { [MetadataKeys.PROCESS_ID]: string; [MetadataKeys.START_TIME]: number } =
      ctx.getRequest();

    const processId = request[MetadataKeys.PROCESS_ID];
    const startTime = request[MetadataKeys.START_TIME];

    return next.handle().pipe(
      map((data: ResponseDTO<unknown>) => {
        const duration = Date.now() - startTime;
        data.processId = processId;
        data.duration = duration;

        return {
          ...data,
          message: data.message || HTTP_MESSAGES.OK,
          statusCode: data.statusCode || HttpStatus.OK,
        };
      }),
      catchError((error) => {
        this.logger.error({ error });

        const duration = Date.now() - startTime;

        const message = error?.response?.message || error?.message || error || HTTP_MESSAGES.INTERNAL_SERVER_ERROR;
        const statusCode =
          error?.code || error.statusCode || error?.response?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

        throw new HttpException(new ResponseDTO({ data: null, message, statusCode, duration, processId }), statusCode);
      }),
    );
  }
}
