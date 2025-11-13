import { TCP_REQUEST_MESSAGE } from '@common/constants';
import { RequestParams } from '@common/decorators';
import { CreateInvoiceTcpRequest, InvoiceTcpResponse, Response } from '@common/interfaces';
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InvoiceService } from './invoice.service';
@Controller()
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @MessagePattern(TCP_REQUEST_MESSAGE.INVOICE.CREATE)
  async create(@RequestParams() params: CreateInvoiceTcpRequest): Promise<Response<InvoiceTcpResponse>> {
    Logger.log({ params }, 'InvoiceController#create');
    const result = await this.invoiceService.create(params);
    return Response.success<InvoiceTcpResponse>(result);
  }
}
