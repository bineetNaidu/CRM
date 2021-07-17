import { Request, Response } from 'express';
import { Customer } from '../models/Customer';
import { Note } from '../models/Note';

export const createNote = async (req: Request, res: Response) => {
  const { body, bgColor } = req.body;
  const customer = await Customer.findById(req.params.id);
  if (!customer) throw new Error('Customer Was Not Found!');
  const note = await Note.build({
    body,
    bgColor,
  }).save();

  customer.notes.push(note.id);
  await customer.save();

  res.status(201).json({
    data: note,
    created: !!note,
    success: true,
  });
};

export const getAllNotesByCustomer = async (req: Request, res: Response) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) throw new Error('Customer Was Not Found!');
  const notes = await Note.find({
    _id: {
      $in: customer.notes,
    },
  });

  res.json({
    data: notes,
    length: notes.length,
    success: true,
  });
};

export const updateNote = async (req: Request, res: Response) => {
  const note = await Note.findById(req.params.noteId);

  if (!note) throw new Error('Note Was Not Found!');

  await note.set(req.body);
  const updatedNote = await note.save();

  res.json({
    data: updatedNote,
    updated: !!note,
  });
};

export const deleteNote = async (req: Request, res: Response) => {
  const { id, noteId } = req.params;
  const note = await Note.findById(noteId);

  if (!note) throw new Error('Note Was Not Found!');
  await Customer.findOneAndUpdate({ _id: id }, { $pull: { notes: noteId } });
  await note.remove();

  res.json({
    deletedNoteId: note.id,
    deleted: !!note,
  });
};
