import { CreateInvoiceTcpRequest } from '@common/interfaces';
import { invoiceRequestMapping } from './invoice.mapped';
import { InvoiceRepository } from './invoice.repository';
export class InvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  create(params: CreateInvoiceTcpRequest) {
    const input = invoiceRequestMapping(params);

    return this.invoiceRepository.create(input);
  }
}
