import { CreateInvoiceTcpRequest } from '@common/interfaces';
import { Invoice } from '@common/schemas';
import { ObjectId } from 'mongodb';

export const invoiceRequestMapping = (data: CreateInvoiceTcpRequest): Partial<Invoice> => {
  return {
    ...data,
    items: data.items.map((item) => ({ ...item, productId: new ObjectId(item.productId) })),
    totalAmount: data.items.reduce((acc, item) => acc + item.total, 0),
    vatAmount: data.items.reduce((acc, item) => acc + item.unitPrice * item.quantity * (item.vatRate / 100), 0),
  };
};
