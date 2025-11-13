import { CreateInvoiceRequestDto } from '../gateway/dto/invoice';

export type CreateInvoiceTcpRequest = CreateInvoiceRequestDto;

export type SendInvoiceTcpReq = {
  invoiceId: string;
  userId: string;
};
