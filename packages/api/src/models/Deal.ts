import mongoose from 'mongoose';
import { StringAndRequired } from './utils';
import type { IDeal, StatusTypes } from '@crm/common';

interface IDealDoc extends mongoose.Document {
  name: string;
  description: string;
  startDate: Date | string;
  endDate: Date | string;
  estimatedTime: number;
  actualTime: number;
  status: StatusTypes;
}

interface IDealModel extends mongoose.Model<IDealDoc> {
  build(data: IDeal): IDealDoc;
}

const DealSchema = new mongoose.Schema(
  {
    name: StringAndRequired,
    description: StringAndRequired,
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    estimatedTime: { type: Number, required: true },
    actualTime: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ['planning', 'inProgress', 'finalized', 'done'],
      default: 'planning',
    },
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

DealSchema.statics.build = (data: IDeal) => {
  return new Deal(data);
};

const Deal = mongoose.model<IDealDoc, IDealModel>('Deal', DealSchema);

export { Deal };
