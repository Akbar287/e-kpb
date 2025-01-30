"use client"
import React from "react"
import { motion } from "framer-motion"
import { Wallet, ShieldCheck, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
const features = [
    {
        icon: Wallet,
        title: "Transaksi Real-time",
        description:
            "Transaksi instan dan aman untuk kebutuhan e-commerce dan e-Lelang Anda",
    },
    {
        icon: ShieldCheck,
        title: "Secure Transactions",
        description: "Melindungi dana Anda dengan enkripsi tingkat tinggi",
    },
    {
        icon: Clock,
        title: "24/7 Akses",
        description: "Akses saldo Anda kapan saja, di mana saja",
    },
    {
        icon: Zap,
        title: "Instant Top-up",
        description: "Top up saldo Anda dengan cepat dan mudah",
    },
]

const steps = [
    {
        title: "Register Account",
        description:
            "Registrasi Akun e-KPB otomatis akan membuat Saldo e-KPB Anda",
    },
    {
        title: "Top Up Dana",
        description: "Top up saldo Anda dengan mudah melalui berbagai metode",
    },
    {
        title: "Mulai Transaksi",
        description: "Gunakan saldo Anda untuk bertransaksi di e-KPB",
    },
]

const Page = () => {
    const router = useRouter()
    return (
        <div className="min-h-screen bg-transparent">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Wallet className="w-24 h-24 text-gray-700 dark:text-gray-100 mx-auto mb-8" />
                    <h1 className="text-5xl font-bold text-gray-700 dark:text-gray-100 mb-6">
                        Saldo e-KPB - Solusi Transaksi Digital Anda
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-gray-200 mb-8 max-w-2xl mx-auto">
                        Keamanan, transaksi instan untuk kebutuhan e-commerce
                        dan e-Lelang Anda. Kelola dana Anda dengan mudah dengan
                        sistem saldo digital kami.
                    </p>
                    {/* <Button className="bg-green-600 hover:bg-green-800 text-white text-lg px-8 py-6 rounded-full">
                        Mulai
                    </Button> */}
                </motion.div>
            </section>

            <section className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gray-200/70 dark:bg-gray-600 backdrop-blur-lg rounded-xl p-6"
                        >
                            <feature.icon className="w-12 h-12 text-indigo-400 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-200">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="container mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-700 dark:text-gray-100 mb-4">
                        Cara Kerja Saldo e-KPB
                    </h2>
                    <p className="text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                        Dengan langkah-langkah yang mudah, Anda dapat mulai
                        menggunakan saldo e-KPB untuk bertransaksi di e-commerce
                        dan e-Lelang.
                    </p>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-8 justify-center">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="flex-1 bg-gray-200/70 dark:bg-gray-600 backdrop-blur-lg p-8 rounded-xl border border-white/10"
                        >
                            <div className="text-indigo-800 dark:text-indigo-100 text-2xl mb-4">
                                0{index + 1}
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-100 mb-4">
                                {step.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-200">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="bg-green-700/50 py-20 mt-20"
            >
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-8">
                        Bergabunglah Sekarang
                    </h2>
                    <Button
                        onClick={() => router.push("/register")}
                        className="bg-green-600 hover:bg-green-800 text-white  text-lg px-8 py-6 rounded-full"
                    >
                        Daftar Sekarang
                    </Button>
                </div>
            </motion.section>
        </div>
    )
}

export default Page
