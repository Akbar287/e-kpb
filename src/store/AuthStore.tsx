import { AuthTypesProps } from "@/types/AuthTypes"
import { createZustandStore } from "nes-zustand"

// Create a store
export const authStore = createZustandStore<AuthTypesProps | null>({
    key: "authStore",
    default: null,
})
