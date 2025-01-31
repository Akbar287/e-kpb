import { RoleTypeProps } from "@/types/RoleTypes"
import { createZustandStore } from "nes-zustand"

// Create a store
export const selectedRoleStore = createZustandStore<RoleTypeProps | null>({
    key: "selectedRoleStore",
    default: null,
})
