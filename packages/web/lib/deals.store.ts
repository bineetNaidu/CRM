import create from 'zustand';
import type { IDeal } from '@crm/common';

interface IState {
  deals: IDeal[];
  clearDeals: () => void;
  setDeals: (deals: IDeal[]) => void;
  addDeal: (deal: IDeal) => void;
  deleteDeal: (dealId: string) => void;
  updateDeal: (dealId: string, updatedDeal: IDeal) => void;
}

export const useDealsStore = create<IState>((set) => ({
  deals: [],
  clearDeals: () => set(() => ({ deals: [] })),
  setDeals: (data) => set(() => ({ deals: data })),
  addDeal: (newDeal) => set((s) => ({ deals: [...s.deals, newDeal] })),
  deleteDeal: (id) =>
    set((s) => ({
      deals: s.deals.filter((n) => n.id !== id),
    })),
  updateDeal: (id, data) =>
    set((s) => ({
      deals: s.deals.map((d) => {
        if (d.id === id) {
          d = data;

          return d;
        }
        return d;
      }),
    })),
}));
