"use client";

import { create } from "zustand";

interface StoreState {
  notificationsValue: number;
  setNotificationsValue: (value: number) => void;
}

export const useStore = create<StoreState>()((set) => ({
  notificationsValue: 0,
  setNotificationsValue: (value) => set({ notificationsValue: value }),
}));
