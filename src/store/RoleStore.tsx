import { RoleModelProps } from "@/models/RoleModel"
import { createZustandStore } from "nes-zustand"

// Create a store
export const roleStore = createZustandStore<RoleModelProps[] | null>({
    key: "roleStore",
    default: null,
})
