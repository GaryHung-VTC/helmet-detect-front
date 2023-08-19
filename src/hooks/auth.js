import { create } from "zustand";
import { persist } from "zustand/middleware";

let status = {
  token: "",
  profile: null,
  isAuthenticated: false,
};

const useAuthStore = create(
  persist(
    (set) => ({
      ...status,
      setSignIn: ({ token, profile }) =>
        set({ token, profile, isAuthenticated: true }),
      setSignOut: () =>
        set({ token: "", profile: null, isAuthenticated: false }),
    }),
    {
      name: "auth-token",
    }
  )
);

export default useAuthStore;
