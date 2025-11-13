import { TCP_SERVICE } from '@common/configuration';
import { TCP_REQUEST_MESSAGE } from '@common/constants';
import { ProcessId } from '@common/decorators';
import {
  CreateInvoiceRequestDto,
  CreateInvoiceTcpRequest,
  InvoiceResponseDto,
  InvoiceTcpResponse,
  ResponseDto,
  TCPClient,
} from '@common/interfaces';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { map } from 'rxjs';

@ApiTags('Invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(@Inject(TCP_SERVICE.INVOICE_SERVICE) private readonly invoiceClient: TCPClient) {}

  @Post()
  @ApiOkResponse({ type: ResponseDto<InvoiceResponseDto> })
  @ApiOperation({ summary: 'Create Invoice' })
  create(@Body() body: CreateInvoiceRequestDto, @ProcessId() processId: string) {
    return this.invoiceClient
      .send<InvoiceTcpResponse, CreateInvoiceTcpRequest>(TCP_REQUEST_MESSAGE.INVOICE.CREATE, {
        data: body,
        processId,
      })
      .pipe(map((data) => new ResponseDto(data)));
  }
}
