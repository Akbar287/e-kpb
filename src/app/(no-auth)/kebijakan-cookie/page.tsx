"use client"
import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
const Page = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-4xl mx-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="bg-white dark:bg-gray-500 rounded-2xl shadow-lg p-8 backdrop-blur-lg border border-white/20"
                >
                    <motion.div variants={itemVariants}>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 dark:from-gray-100 to-purple-500 dark:to-purple-300 bg-clip-text text-transparent mb-4">
                            Kebijakan Penggunaan Cookie
                        </h1>
                        <p className="text-gray-600 dark:text-gray-100 mb-8">
                            Terakhir diubah: {new Date().toLocaleDateString()}
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        className="space-y-8"
                    >
                        <motion.section variants={itemVariants}>
                            <h2 className="text-2xl font-semibold text-indigo-600 dark:text-gray-50 mb-4">
                                Pembuka
                            </h2>
                            <p className="text-gray-600 dark:text-gray-50 leading-relaxed">
                                Website kami menggunakan cookies untuk
                                meningkatkan pengalaman Anda dalam menjelajahi
                                situs dan menganalisis lalu lintas situs. Dengan
                                melanjutkan penggunaan situs kami, Anda
                                menyetujui penggunaan cookies kami sebagaimana
                                dijelaskan dalam kebijakan ini.
                            </p>
                        </motion.section>

                        <motion.section variants={itemVariants}>
                            <h2 className="text-2xl font-semibold text-purple-600 dark:text-gray-50 mb-4">
                                Apa itu Cookies?
                            </h2>
                            <p className="text-gray-600 dark:text-gray-50 leading-relaxed">
                                Cookie adalah file teks kecil yang disimpan di
                                perangkat Anda saat Anda mengunjungi situs web.
                                Mereka membantu situs web mengingat informasi
                                tentang kunjungan Anda, yang dapat membuatnya
                                lebih mudah untuk dikunjungi lagi dan membuat
                                situs lebih berguna bagi Anda.
                            </p>
                        </motion.section>

                        <motion.section variants={itemVariants}>
                            <h2 className="text-2xl font-semibold text-pink-600 dark:text-gray-50 mb-4">
                                Jenis Cookies yang Kami Gunakan
                            </h2>
                            <div className="space-y-4">
                                <div className="p-4 bg-indigo-50 dark:bg-gray-600 rounded-lg">
                                    <h3 className="font-semibold text-indigo-700 dark:text-gray-50">
                                        Cookie Wajib
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-50 text-sm mt-2">
                                        Cookie ini diperlukan untuk menjaga
                                        keamanan dan fungsionalitas situs web
                                        kami. Tanpa cookie ini, situs web kami
                                        tidak akan berfungsi dengan baik.
                                    </p>
                                </div>
                                <div className="p-4 bg-purple-50 dark:bg-gray-600 rounded-lg">
                                    <h3 className="font-semibold text-purple-700 dark:text-gray-50">
                                        Cookie Analitik
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-50 text-sm mt-2">
                                        Tolong kami memahami bagaimana
                                        pengunjung berinteraksi dengan situs web
                                        dengan mengumpulkan dan melaporkan
                                        informasi.
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        <motion.section variants={itemVariants}>
                            <h2 className="text-2xl font-semibold text-indigo-600 dark:text-gray-50 mb-4">
                                Mengelola Cookies
                            </h2>
                            <p className="text-gray-600 dark:text-gray-50 leading-relaxed mb-4">
                                Kamu dapat mengelola cookie di browser web kamu.
                                Bagaimanapun jika kamu memilih untuk
                                menonaktifkan cookie, mungkin saja beberapa
                                bagian dari situs web kami tidak berfungsi
                                dengan baik.
                            </p>
                            <div className="flex text-center items-center justify-center gap-4">
                                <h4 className="text-gray-800  font-bold py-2 dark:text-gray-200">
                                    Dengan Mendaftar e-KPB, anda menyetujui
                                    kebijakan Cookie
                                </h4>
                            </div>
                        </motion.section>
                    </motion.div>
                </motion.div>

                {/* Floating Cookie */}
                <motion.div
                    animate={{
                        rotate: [0, 10, -10, 0],
                        y: [0, 20, -20, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="fixed bottom-20 left-8 bg-white p-4 rounded-full shadow-lg"
                >
                    <svg
                        className="w-12 h-12 text-amber-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v2h8z"
                        />
                    </svg>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Page
