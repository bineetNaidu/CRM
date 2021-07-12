import mongoose from 'mongoose';
import { StringAndRequired, StringAndRequiredAndUnique } from './utils';
import { ICustomer, INote } from '@crm/common';
import { Note } from './Note';

interface ICustomerDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  timezone: string;
  avatar: string;
  notes: INote[] | string[];
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
  }
});

const Customer = mongoose.model<ICustomerDoc, ICustomerModel>(
  'Customer',
  CustomerSchema
);

export { Customer };
