import { LayananModelProps } from "@/models/RoleModel"
import { createZustandStore } from "nes-zustand"

// Create a store
export const selectedLayananStore =
    createZustandStore<LayananModelProps | null>({
        key: "selectedLayananStore",
        default: null,
    })
