"use client"

import { create } from "zustand"

export type Role =
  | "NPI Ops Program Mgr"
  | "Sustaining Ops Program Mgr"
  | "Material Program Mgr"
  | "Supply Planner"
  | "Logistics Planner"
  | "Global Commodity Manager"
  | "Material Manager"
  | "Supplier Quality Manager"
  | "Manufacturing Technical Engineer"

interface RoleStore {
  role: Role
  setRole: (role: Role) => void
  roles: Role[]
}

export const useRoleStore = create<RoleStore>((set) => ({
  role: "Supply Planner",
  setRole: (role) => set({ role }),
  roles: [
    "NPI Ops Program Mgr",
    "Sustaining Ops Program Mgr",
    "Material Program Mgr",
    "Supply Planner",
    "Logistics Planner",
    "Global Commodity Manager",
    "Material Manager",
    "Supplier Quality Manager",
    "Manufacturing Technical Engineer",
  ],
}))

export function useRole() {
  return useRoleStore()
}
