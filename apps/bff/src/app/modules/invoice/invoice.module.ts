import { TCP_SERVICE, tcpProvider } from '@common/configuration';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { InvoiceController } from './invoice.controller';

@Module({
  imports: [ClientsModule.registerAsync([tcpProvider(TCP_SERVICE.INVOICE_SERVICE)])],
  controllers: [InvoiceController],
  providers: [],
  exports: [],
})
export class InvoiceModule {}
