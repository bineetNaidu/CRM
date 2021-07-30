import create from 'zustand';
import type { ISetting } from '@crm/common';

interface IState {
  setting: ISetting | null;
  clearSetting: () => void;
  setSetting: (setting: ISetting) => void;
  updateSetting: (setting: ISetting) => void;
}

export const useSettingStore = create<IState>((set) => ({
  setting: null,
  clearSetting: () => set(() => ({ setting: null })),
  setSetting: (setting: ISetting) => set(() => ({ setting })),
  updateSetting: (setting: ISetting) => set(() => ({ setting })),
}));
