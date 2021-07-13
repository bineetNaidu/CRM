import create from 'zustand';
import type { ICustomer } from '@crm/common';

interface IState {
  customers: ICustomer[];
  setCustomer: (customers: ICustomer[]) => void;
  addCustomer: (customer: ICustomer) => void;
  deleteCustomer: (customerId: string) => void;
  updateCustomer: (customerId: string, customer: ICustomer) => void;
}

export const useCustomerStore = create<IState>((set) => ({
  customers: [],
  setCustomer: (customers) => set((state) => ({ customers })),
  addCustomer: (customer) =>
    set((state) => ({
      customers: [...state.customers, customer],
    })),
  deleteCustomer: (id) =>
    set((state) => ({
      customers: state.customers.filter((c) => c.id !== id),
    })),
  updateCustomer: (id, customer) =>
    set((s) => ({
      customers: s.customers.map((c) => {
        if (c.id === id) {
          c = customer;
          return c;
        }

        return c;
      }),
    })),
}));
