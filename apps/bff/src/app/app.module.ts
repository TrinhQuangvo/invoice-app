import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CONFIGURATION } from '../configurations';
import { LoggerMiddleware } from '@common/middlewares';
import { ExceptionInterceptor } from '@common/interceptors';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => CONFIGURATION],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: ExceptionInterceptor,
    },
  ],
})
export class AppModule {
  static GLOBAL_PREFIX = CONFIGURATION.GLOBAL_PREFIX;
  static NODE_ENV = CONFIGURATION.NODE_ENV;
  static PORT = CONFIGURATION.APP_CONFIG.PORT;

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
