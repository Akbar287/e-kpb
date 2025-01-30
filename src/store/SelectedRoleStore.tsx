import { RoleModelProps } from "@/models/RoleModel"
import { createZustandStore } from "nes-zustand"

// Create a store
export const selectedRoleStore = createZustandStore<RoleModelProps | null>({
    key: "selectedRoleStore",
    default: null,
})
