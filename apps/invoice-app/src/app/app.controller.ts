import { TcpLoggingInterceptor } from '@common/interceptors';
import { Response } from '@common/interfaces';
import { Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
interface Invoice {
  invoiceId: number;
  amount: number;
  status: string;
}
@Controller()
@UseInterceptors(new TcpLoggingInterceptor())
export class AppController {
  @MessagePattern('get_invoice')
  getInvoice(data: Invoice): Response<Invoice> {
    return Response.success<Invoice>(data);
  }
}
