import mongoose from 'mongoose';
import { StringAndRequired } from './utils';
import type { INote } from '@crm/common';

interface INoteDoc extends mongoose.Document {
  body: string;
  bgColor: string;
}

interface INoteModel extends mongoose.Model<INoteDoc> {
  build(data: INote): INoteDoc;
}

const NoteSchema = new mongoose.Schema(
  {
    body: StringAndRequired,
    bgColor: {
      type: String,
      default: '#fff',
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

NoteSchema.statics.build = (data: INote) => {
  return new Note(data);
};

const Note = mongoose.model<INoteDoc, INoteModel>('Note', NoteSchema);

export { Note };
