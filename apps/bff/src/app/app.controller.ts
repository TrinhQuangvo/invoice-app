import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseDTO } from '@common/interfaces';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
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
    const data = await firstValueFrom(this.invoiceClient.send<string, number>('get_invoice', 21312312));
    return new ResponseDTO<string>({ data });
  }
}
