import { MongoProvider } from '@common/configuration';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CONFIGURATION, TConfiguration } from './configurations';
import { InvoiceModule } from './modules/invoice/invoice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => CONFIGURATION],
    }),
    MongoProvider,
    InvoiceModule,
  ],
  controllers: [],
  providers: [InvoiceModule],
})
export class AppModule {
  static CONFIGURATION: TConfiguration = CONFIGURATION;
}
