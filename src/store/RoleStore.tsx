import { RoleTypeProps } from "@/types/RoleTypes"
import { createZustandStore } from "nes-zustand"

// Create a store
export const roleStore = createZustandStore<RoleTypeProps[] | null>({
    key: "roleStore",
    default: null,
})
