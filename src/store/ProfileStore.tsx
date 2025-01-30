import { ProfileModelProps } from "@/models/ProfilModel"
import { createZustandStore } from "nes-zustand"

export const profileStore = createZustandStore<ProfileModelProps | null>({
    key: "profileStore",
    default: null,
})
