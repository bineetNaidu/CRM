import mongoose from 'mongoose';
import { StringAndRequired } from './utils';
import type { ISetting } from '@crm/common';

interface ISettingDoc extends mongoose.Document {
  isDarkMode: boolean;
  timezone: string;
  crmName: string;
}

interface ISettingModel extends mongoose.Model<ISettingDoc> {
  build(data: ISetting): ISettingDoc;
}

const SettingSchema = new mongoose.Schema(
  {
    isDarkMode: {
      type: Boolean,
      required: true,
      default: true,
    },
    timezone: StringAndRequired,
    crmName: StringAndRequired,
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

SettingSchema.statics.build = (data: ISetting) => {
  return new Setting(data);
};

const Setting = mongoose.model<ISettingDoc, ISettingModel>(
  'Setting',
  SettingSchema
);

export { Setting };
