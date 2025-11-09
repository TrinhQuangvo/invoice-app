import { TcpLoggingInterceptor } from '@common/interceptors';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Response } from '@common/interfaces';
interface Invoice {
  invoiceId: number;
  amount: number;
  status: string;
}
@Controller()
@UseInterceptors(new TcpLoggingInterceptor())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    console.log('aa');
    return this.appService.getData();
  }

  @MessagePattern('get_invoice')
  getInvoice(data: Invoice): Response<Invoice> {
    return new Response<Invoice>({ data });
  }
}
