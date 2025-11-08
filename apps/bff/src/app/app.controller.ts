import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseDTO } from '@common/interfaces';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

interface Invoice {
  invoiceId: number;
  amount: number;
  status: string;
}
@Controller('app')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('TCP_INVOICE_SERVICE') private readonly invoiceClient: ClientProxy,
  ) {}

  @Get()
  getData() {
    const data = this.appService.getData();
    return new ResponseDTO({ data });
  }

  @Get('invoice')
  async getInvoice() {
    const payload = { invoiceId: 1, amount: 1000, status: 'PAID' };
    const data = await firstValueFrom(this.invoiceClient.send<Invoice>('get_invoice', payload));
    return new ResponseDTO<Invoice>({ data });
  }
}
