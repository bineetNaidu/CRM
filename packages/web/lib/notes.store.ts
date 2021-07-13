import create from 'zustand';
import type { INote } from '@crm/common';

interface IState {
  notes: INote[];
  clearNotes: () => void;
  addNote: (note: INote) => void;
  deleteNote: (noteId: string) => void;
  updateNote: (noteId: string, updatedNote: INote) => void;
}

export const useNotesStore = create<IState>((set) => ({
  notes: [],
  clearNotes: () => set((s) => ({ notes: [] })),
  addNote: (newNote) => set((s) => ({ notes: [...s.notes, newNote] })),
  deleteNote: (id) =>
    set((s) => ({
      notes: s.notes.filter((n) => n.id !== id),
    })),
  updateNote: (id, data) =>
    set((s) => ({
      notes: s.notes.map((n) => {
        if (n.id === id) {
          n = data;

          return n;
        }
        return n;
      }),
    })),
}));
