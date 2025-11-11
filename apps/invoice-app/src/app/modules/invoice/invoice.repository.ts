import { INVOICE_STATUS } from '@common/constants';
import { Invoice, InvoiceModel, InvoiceModelName } from '@common/schemas';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class InvoiceRepository {
  constructor(@InjectModel(InvoiceModelName) private readonly invoiceModel: InvoiceModel) {}

  create(payload: Partial<Invoice>) {
    return this.invoiceModel.create({ ...payload, status: INVOICE_STATUS.CREATED });
  }

  getById(id: string) {
    return this.invoiceModel.findById(id).exec();
  }

  update(id: string, payload: Partial<Invoice>) {
    return this.invoiceModel.findByIdAndUpdate(id, payload, { new: true }).exec();
  }

  delete(id: string) {
    return this.invoiceModel.findByIdAndDelete(id).exec();
  }
}
