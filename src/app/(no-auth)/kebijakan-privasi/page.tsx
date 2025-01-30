"use client"
import React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

const Page = () => {
    const sections = [
        {
            title: "Pendahuluan",
            content:
                "Kami berkomitmen mematuhi peraturan perlindungan data pribadi...",
        },
        {
            title: "Pengumpulan Data",
            content:
                "kami mengumpulkan data untuk menyediakan layanan, memproses transaksi...",
        },
        {
            title: "Penggunaan Data",
            content:
                "Data anda membantu kami menyediakan layanan, mengelola akun...",
        },
        {
            title: "Keamanan Data",
            content:
                "kami melindungi data anda dengan teknologi terbaru dan enkripsi...",
        },
        {
            title: "Third Parties",
            content:
                "Kami tidak membagikan data anda dengan pihak ketiga tanpa izin...",
        },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-transparent py-12 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    {sections.map((section, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded">
                                        {section.title}
                                    </span>
                                </h2>
                                <p className="text-gray-600 dark:text-gray-200 leading-relaxed">
                                    {section.content}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center text-gray-600 dark:text-gray-200 border-t pt-8 border-gray-200"
                >
                    <p>Hubungi kami untuk pertanyaan privasi lainnya</p>
                    <p className="mt-2">
                        Email: e-kpb@go.id
                        <br />
                        Phone: (62) 08123456789
                    </p>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Page
