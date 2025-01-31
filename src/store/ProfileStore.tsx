import { ProfileTypeProps } from "@/types/ProfilTypes"
import { createZustandStore } from "nes-zustand"

export const profileStore = createZustandStore<ProfileTypeProps | null>({
    key: "profileStore",
    default: null,
})
