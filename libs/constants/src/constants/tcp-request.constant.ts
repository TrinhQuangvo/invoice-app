enum INVOICE {
  GET_BY_ID = 'invoice.get_by_id',
  CREATE = 'invoice.create',
  PAGINATE = 'invoice.paginate',
  UPDATE = 'invoice.update',
  DELETE = 'invoice.delete',
  SEND = 'invoice.send',
}

export const TCP_REQUEST_MESSAGE = {
  INVOICE,
};
