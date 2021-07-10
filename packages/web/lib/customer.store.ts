import create from 'zustand';

interface IState {
  customers: any[];
  setCustomer: (customers: any[]) => void;
  addCustomer: (customer: any) => void;
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
