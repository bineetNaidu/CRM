import create from 'zustand';
import type { IInvoice } from '@crm/common';

interface IState {
  invoices: IInvoice[];
  setInvoices: (invoices: IInvoice[]) => void;
  addInvoice: (invoice: IInvoice) => void;
  deleteInvoice: (id: string) => void;
}

export const useInvoiceStore = create<IState>((set) => ({
  invoices: [],
  setInvoices: (invoices) => set(() => ({ invoices })),
  addInvoice: (invoice) =>
    set((s) => ({
      invoices: [...s.invoices, invoice],
    })),
  deleteInvoice: (id) =>
    set((s) => ({
      invoices: s.invoices.filter((i) => i.id !== id),
    })),
}));
