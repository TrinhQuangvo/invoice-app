import { ResponseDTO, TCPClient } from '@common/interfaces';
import { Controller, Get, Inject } from '@nestjs/common';
import { map } from 'rxjs';
import { AppService } from './app.service';

interface Invoice {
  invoiceId: number;
  amount: number;
  status: string;
}
@Controller('app')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('TCP_INVOICE_SERVICE') private readonly invoiceClient: TCPClient,
  ) {}

  @Get()
  getData() {
    const data = this.appService.getData();
    return new ResponseDTO({ data });
  }

  @Get('invoice')
  async getInvoice() {
    const payload = { invoiceId: 1, amount: 1000, status: 'PAID' };
    return this.invoiceClient
      .send<Invoice>('get_invoice', { ...payload, message: 'Requesting invoice', statusCode: 200 })
      .pipe(map((res) => new ResponseDTO({ data: res.data })));
  }
}
