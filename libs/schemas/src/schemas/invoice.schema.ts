import { Prop, Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema, createSchema } from './base.schema';
import { INVOICE_STATUS } from '@common/constants';

class Client {
  @Prop({ type: String })
  name: string;
  @Prop({ type: String })
  email: string;
  @Prop({ type: String })
  address: string;
  @Prop({ type: String })
  phone: string;
}

class Item {
  @Prop({ type: String })
  productId: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: Number })
  quantity: number;

  @Prop({ type: Number })
  unitPrice: number;

  @Prop({ type: Number })
  totalPrice: number;

  @Prop({ type: Number })
  vatPrice: number;

  @Prop({ type: Number })
  total: number;
}

@Schema()
export class Invoice extends BaseSchema {
  @Prop({ type: Client })
  client: Client;
  @Prop({ type: Number })
  totalAmount: number;

  @Prop({ type: Number })
  vatAmount: number;

  @Prop({ type: [Item] })
  items: Item[];

  @Prop({ type: String, enum: INVOICE_STATUS, default: INVOICE_STATUS.PENDING })
  status: INVOICE_STATUS;

  @Prop({ type: String, required: false })
  supervisorId: string;

  @Prop({ type: String, required: false })
  fileUrl: string;
}

export const InvoiceSchema = createSchema(Invoice);
export const InvoiceModelName = Invoice.name;

export const InvoiceDestination = {
  name: InvoiceModelName,
  schema: InvoiceSchema,
};

export type InvoiceModel = Model<Invoice>;
