"use client"
import React from "react"
import Image from "next/image"
import logo from "@/assets/icons/KPB-Logo.png"
import Link from "next/link"
import { MoonIcon, SunIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"

const LayoutNoauth = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()

    return pathname === "/login" || pathname === "/register" ? (
        children
    ) : (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-100 to-red-100 dark:from-gray-800 dark:to-gray-700">
            <header className="sticky top-0 z-50 bg-transparent border-b dark:bg-gray-900 backdrop-blur-lg border-white/20">
                <nav className="container flex items-center justify-between px-4 py-4 mx-auto">
                    <div className="flex items-center gap-2">
                        <div className="p-2 dark:bg-gray-100 rounded-xl">
                            <Image
                                src={logo}
                                priority
                                width={55}
                                height={15}
                                alt="logo"
                                style={{
                                    width: "auto",
                                    height: "auto",
                                }}
                            />
                        </div>
                        <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text"></span>
                    </div>
                    <div className="hidden gap-8 text-gray-600 md:flex dark:text-gray-50">
                        <Link
                            href="/"
                            className={`${
                                pathname === "/"
                                    ? "text-green-500 scale-110"
                                    : "text-gray-800 dark:text-gray-200"
                            } hover:scale-105 hover:dark:text-green-300 hover:text-green-600 hover:underline duration-100 transition-colors`}
                        >
                            Beranda
                        </Link>
                        <Link
                            href="/layanan"
                            className={`${
                                pathname === "/layanan"
                                    ? "text-green-500 scale-110"
                                    : "text-gray-800 dark:text-gray-200"
                            } hover:scale-105 hover:dark:text-green-300 hover:text-green-600 hover:underline duration-100 transition-colors`}
                        >
                            Layanan
                        </Link>
                        <Link
                            href="/statistik"
                            className={`${
                                pathname === "/statistik"
                                    ? "text-green-500 scale-110"
                                    : "text-gray-800 dark:text-gray-200"
                            } hover:scale-105 hover:dark:text-green-300 hover:text-green-600 hover:underline duration-100 transition-colors`}
                        >
                            Statistik
                        </Link>
                    </div>
                    <Link
                        href={"/login"}
                        className="flex items-center gap-2 px-8 py-3 text-gray-800 clay-button bg-gradient-to-r from-green-600 to-green-300 dark:text-white dark:from-green-900 dark:to-green-500 rounded-xl"
                    >
                        Masuk
                    </Link>
                </nav>
            </header>
            <div className="fixed bottom-0 right-0 z-50 mb-10 mr-10 w-30 h-30">
                <button
                    type="button"
                    className={`${
                        theme === "dark"
                            ? "from-green-800 to-green-700 text-white"
                            : "from-green-300 to-green-100 text-gray-800"
                    } clay-button bg-gradient-to-r px-4 py-4 rounded-xl`}
                    onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                    }
                >
                    {theme === "dark" ? <MoonIcon /> : <SunIcon />}
                </button>
            </div>
            {children}
            <footer className="py-12 text-gray-800 dark:bg-gray-700 border-t-[1px] border-gray-50 dark:text-gray-50">
                <div className="container px-4 mx-auto">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2 bg-gray-100 rounded-lg">
                                    <Image
                                        src={logo}
                                        priority
                                        width={55}
                                        height={15}
                                        alt="logo"
                                        style={{
                                            width: "auto",
                                            height: "auto",
                                        }}
                                    />
                                </div>
                            </div>
                            <p className="text-primary-light">
                                Memberdayakan petani dengan solusi pertanian
                                terpadu.
                            </p>
                        </div>

                        <div>
                            <h4 className="mb-4 font-semibold">Layanan</h4>
                            <ul className="space-y-2 text-primary-light">
                                <li>
                                    <Link
                                        className="hover:underline hover:text-green-700 hover:dark:text-green-500"
                                        href={"/syarat-ketentuan"}
                                    >
                                        Syarat dan Ketentuan
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="hover:underline hover:text-green-700 hover:dark:text-green-500"
                                        href={"/layanan"}
                                    >
                                        Semua Layanan
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="hover:underline hover:text-green-700 hover:dark:text-green-500"
                                        href={"/saldo-kpb"}
                                    >
                                        Saldo e-KPB
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="hover:underline hover:text-green-700 hover:dark:text-green-500"
                                        href={"/partner"}
                                    >
                                        Partner
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-4 font-semibold">Dukungan</h4>
                            <ul className="space-y-2 text-primary-light">
                                <li>
                                    <Link
                                        className="hover:underline hover:text-green-700 hover:dark:text-green-500"
                                        href={"/pusat-bantuan"}
                                    >
                                        Pusat Bantuan
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="hover:underline hover:text-green-700 hover:dark:text-green-500"
                                        href={"/dokumentasi"}
                                    >
                                        Dokumentasi
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="hover:underline hover:text-green-700 hover:dark:text-green-500"
                                        href={"/hubungi-kami"}
                                    >
                                        Hubungi Kami
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="hover:underline hover:text-green-700 hover:dark:text-green-500"
                                        href={"/faq"}
                                    >
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-4 font-semibold">Legal</h4>
                            <ul className="space-y-2 text-primary-light">
                                <li>
                                    <Link
                                        className="hover:underline hover:text-green-700 hover:dark:text-green-500"
                                        href={"/kebijakan-privasi"}
                                    >
                                        Kebijakan Privasi
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="hover:underline hover:text-green-700 hover:dark:text-green-500"
                                        href={"/karir"}
                                    >
                                        Karir
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="hover:underline hover:text-green-700 hover:dark:text-green-500"
                                        href={"/kebijakan-cookie"}
                                    >
                                        Kebijakan Cookie
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="hover:underline hover:text-green-700 hover:dark:text-green-500"
                                        href={"/statistik"}
                                    >
                                        Statistik
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 mt-8 text-center border-t border-primary-light/20 text-primary-light">
                        <p>
                            © {new Date().getFullYear()} Akbar. All rights
                            reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default LayoutNoauth
