import mongoose from 'mongoose';
export const defaultCustomer = {
  firstName: 'test',
  lastName: 'test',
  email: 'test@test.com',
  phoneNumber: '(000) 000 0000',
  timezone: 'Pacific time',
  avatar:
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.w3schools.com%2Fbootstrap%2Fimg_avatar3.png&f=1&nofb=1',
  notes: [],
  deals: [],
};

export const defaultDeal = {
  name: 'test',
  description: 'test',
  startDate: new Date().toISOString(),
  endDate: new Date(new Date().setHours(72)).toISOString(),
  estimatedTime: 1633545000000,
};

export const defaultSetting = {
  crmName: 'test',
  timezone: 'IST',
};

export const defaultInvoice = {
  customer: mongoose.Types.ObjectId(),
  invoiceDate: new Date().toISOString(),
  payment: {
    method: 'paypal',
    transactionId: '123456789',
    cardNumber: '12345VV678XX9',
  },
  subject: 'test subject',
  summary: 'test summary',
  totalAmount: 11150,
  tax: 0,
  subTotal: 11150,
  shippingCost: 0,
};
