import { LayananTypeProps } from "@/types/RoleTypes"
import { createZustandStore } from "nes-zustand"

// Create a store
export const selectedLayananStore = createZustandStore<LayananTypeProps | null>(
    {
        key: "selectedLayananStore",
        default: null,
    }
)
