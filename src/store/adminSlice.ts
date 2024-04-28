import { create } from "zustand";

export interface IAdmin {
  id: number;
  email: string;
  avarage_duration: Float32Array;
}

export type AdminUsersState = {
  activeAdminUser: IAdmin["id"];
  adminUsers: IAdmin[];
};

export type GetAdminUsersType = IAdmin[] | null;

export type AdminsUsersAction = {
  changeActiveAdminUser: (adminUserId: number) => void;
  closeAdminUser: () => void;
  updateActiveAdminUsers: (adminUsers: IAdmin[]) => void;
};

const initialState: AdminUsersState = {
  activeAdminUser: -1,
  adminUsers: [],
};

export const useAdminUsers = create<AdminsUsersAction & AdminUsersState>(
  (set) => ({
    ...initialState,
    changeActiveAdminUser: (adminUserId) =>
      set({ activeAdminUser: adminUserId }),
    closeAdminUser: () => set({ activeAdminUser: -1 }),
    updateActiveAdminUsers: (adminUsers) => set({ adminUsers }),
  })
);
