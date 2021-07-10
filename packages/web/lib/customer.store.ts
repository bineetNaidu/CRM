import create from 'zustand';
import type { ICustomer } from '@crm/common';

interface IState {
  customers: ICustomer[];
  setCustomer: (customers: ICustomer[]) => void;
  addCustomer: (customer: ICustomer) => void;
  deleteCustomer: (customerId: string) => void;
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
}));
