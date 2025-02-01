import "./globals.css"
import React from "react"
import { Poppins } from "next/font/google"
import { ThemeProvider } from "@/provider/theme-provider"
import type { Metadata } from "next"
import Providers from "./providers"
import { getSession } from "../provider/api"
import { Toaster } from "@/components/ui/toaster"
import LayoutChecker from "../components/layout/layout-checker"

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
})

export const metadata: Metadata = {
    title: "e-KPB",
    description: "e-KPB adalah Ekosistem KPB",
    icons: {
        icon: "/favicon.ico",
        shortcut: "/shortcut-icon.png",
        apple: "/apple-touch-icon.png",
    },
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const session = await getSession()

    return (
        <html lang="en" className={poppins.variable}>
            <body className="font-sans">
                <Providers session={session}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                    >
                        <Toaster />
                        <LayoutChecker>{children}</LayoutChecker>
                    </ThemeProvider>
                </Providers>
            </body>
        </html>
    )
}
