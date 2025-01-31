import React from "react"
import HomePage from "./(no-auth)/home/page"
import MainPage from "@/app/(main)/main/page"
import { getSession } from "../provider/api"
const Page = async () => {
    const session = await getSession()
    const status = session ? "authenticated" : "unauthenticated"

    return status === "authenticated" ? <MainPage /> : <HomePage />
}

export default Page
