import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    console.log('aa');
    return this.appService.getData();
  }

  @MessagePattern('get_invoice')
  async getInvoice(invoiceId: number): Promise<any> {
    return await {
      invoiceId,
      amount: 1000,
      status: 'PAID',
    };
  }
}
