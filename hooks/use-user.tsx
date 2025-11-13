"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type BusinessType = "OEM" | "Contract Manufacturer" | "Supplier"

interface User {
  name: string
  email: string
  businessName: string
  businessType: BusinessType
  role: string
}

interface UserStore {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "ops-advisor-user",
    },
  ),
)

export function useUser() {
  return useUserStore()
}
