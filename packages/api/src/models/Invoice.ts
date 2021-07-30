import mongoose from 'mongoose';
import { IInvoice, ICustomer } from '@crm/common';
import { StringAndRequired } from './utils';

interface IInvoiceDoc extends mongoose.Document {
  customer: string | ICustomer;
  invoiceDate: Date | string;
  payment: {
    method: string;
    transactionId: string;
    cardNumber: string;
  };
  summary: string;
  totalAmount: number;
  tax?: number;
  subTotal?: number;
  shippingCost?: number;
}

interface IInvoiceModel extends mongoose.Model<IInvoiceDoc> {
  build(data: IInvoice): IInvoiceDoc;
}

const InvoiceSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      require: true,
    },
    invoiceDate: { type: Date, required: true },
    payment: {
      method: StringAndRequired,
      transactionId: StringAndRequired,
      cardNumber: StringAndRequired,
    },
    summary: StringAndRequired,
    totalAmount: { type: Number, required: true },
    tax: Number,
    subTotal: Number,
    shippingCost: Number,
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

InvoiceSchema.statics.build = (data: IInvoice) => {
  return new Invoice(data);
};

const Invoice = mongoose.model<IInvoiceDoc, IInvoiceModel>(
  'Invoice',
  InvoiceSchema
);

export { Invoice };
