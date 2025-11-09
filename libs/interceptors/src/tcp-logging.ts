import { CallHandler, ExecutionContext, Logger, NestInterceptor } from '@nestjs/common';
import { catchError, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

export class TcpLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger();
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();
    const handler = context.getHandler();
    const handlerName = handler.name;

    const args = context.getArgs();
    const payload = args[0];
    const processId = payload?.processId || 'N/A';

    this.logger.log(`[TCP][${handlerName}] Request - Process ID: ${processId} - Payload: ${JSON.stringify(payload)}`);

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - now;
        this.logger.log(`[TCP][${handlerName}] Response - Process ID: ${processId} - Duration: ${duration}ms`);
      }),
      catchError((error) => {
        const duration = Date.now() - now;
        this.logger.error(
          `[TCP][${handlerName}] Error - Process ID: ${processId} - Duration: ${duration}ms - Error: ${error.message}`,
        );
        throw error;
      }),
    );
  }
}
