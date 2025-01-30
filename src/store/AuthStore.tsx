import { AuthModelProps } from "@/models/AuthModel"
import { createZustandStore } from "nes-zustand"

// Create a store
export const authStore = createZustandStore<AuthModelProps | null>({
    key: "authStore",
    default: null,
})
