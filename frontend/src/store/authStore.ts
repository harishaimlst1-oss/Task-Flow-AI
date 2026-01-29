import { create } from "zustand";

export type Role = "owner" | "admin" | "manager" | "member" | "viewer";

export type UserSession = {
  id: string;
  name: string;
  email: string;
  role: Role;
  orgId: string;
  permissions: string[];
};

type AuthState = {
  session: UserSession | null;
  setSession: (session: UserSession) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
  clearSession: () => set({ session: null })
}));
