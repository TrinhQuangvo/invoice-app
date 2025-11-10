import { MongoProvider } from '@common/configuration';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CONFIGURATION, TConfiguration } from './configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => CONFIGURATION],
    }),
    MongoProvider,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static CONFIGURATION: TConfiguration = CONFIGURATION;
}
