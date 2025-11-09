import { TCP_SERVICE, tcpProvider } from '@common/configuration';
import { ExceptionInterceptor } from '@common/interceptors';
import { LoggerMiddleware } from '@common/middlewares';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { CONFIGURATION } from '../configurations';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => CONFIGURATION],
    }),
    // Kết nối microservice TCP đến TCP Invoice Service
    ClientsModule.registerAsync([tcpProvider(TCP_SERVICE.INVOICE_SERVICE)]),
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
