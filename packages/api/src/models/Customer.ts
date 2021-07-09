import mongoose from 'mongoose';
import { StringAndRequired, StringAndRequiredAndUnique } from './utils';

interface ICustomer {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  timezone: string;
  avatar: string;
}

interface ICustomerDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  timezone: string;
  avatar: string;
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

const Customer = mongoose.model<ICustomerDoc, ICustomerModel>(
  'Customer',
  CustomerSchema
);

export { Customer };
