import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CONFIGURATIONS } from '../configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => CONFIGURATIONS],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static PORT = CONFIGURATIONS.PORT;
  static IS_DEVELOPMENT = CONFIGURATIONS.IS_DEVELOPMENT;
  static GLOBAL_PREFIX = CONFIGURATIONS.GLOBAL_PREFIX;
  static NODE_ENV = CONFIGURATIONS.NODE_ENV;
}
