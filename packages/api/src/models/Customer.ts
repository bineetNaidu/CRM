import mongoose from 'mongoose';
import { StringAndRequired, StringAndRequiredAndUnique } from './utils';
import { ICustomer, IDeal, INote } from '@crm/common';
import { Note } from './Note';
import { Deal } from './Deal';

interface ICustomerDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  timezone: string;
  avatar: string;
  notes: INote[] | string[];
  deals: IDeal[] | string[];
}

interface ICustomerModel extends mongoose.Model<ICustomerDoc> {
  build(data: ICustomer): ICustomerDoc;
}

const CustomerSchema = new mongoose.Schema(
  {
    firstName: StringAndRequired,
    lastName: StringAndRequired,
    email: StringAndRequiredAndUnique,
    phoneNumber: StringAndRequiredAndUnique,
    timezone: StringAndRequired,
    avatar: StringAndRequired,
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
      },
    ],
    deals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deal',
      },
    ],
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

CustomerSchema.statics.build = (data: ICustomer) => {
  return new Customer(data);
};

CustomerSchema.post('remove', async function (doc) {
  if (doc) {
    await Note.deleteMany({
      _id: {
        $in: doc.notes,
      },
    });
    await Deal.deleteMany({
      _id: {
        $in: doc.deals,
      },
    });
  }
});

const Customer = mongoose.model<ICustomerDoc, ICustomerModel>(
  'Customer',
  CustomerSchema
);

export { Customer };
