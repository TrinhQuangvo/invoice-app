import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

interface Invoice {
  invoiceId: number;
  amount: number;
  status: string;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    console.log('aa');
    return this.appService.getData();
  }

  @MessagePattern('get_invoice')
  async getInvoice(data: Invoice): Promise<Invoice> {
    return await data;
  }
}
