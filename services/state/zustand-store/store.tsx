"use client";

import { INotification } from "@/app/(home)/notifications/page";
import { create } from "zustand";

interface StoreState {
  notificationsValue: number;
  setNotificationsValue: (value: number) => void;
  notificationData: INotification[] | null;
  setNotificationData: (data: INotification[]) => void;
}

export const useStore = create<StoreState>()((set) => ({
  notificationsValue: 0,
  setNotificationsValue: (value) => set({ notificationsValue: value }),
  notificationData: null,
  setNotificationData: (data) => set({ notificationData: data }),
}));
