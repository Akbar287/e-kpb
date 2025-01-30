"use client"
import React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card } from "@/components/ui/card"
import {
    CheckCircle,
    ClipboardList,
    UserCheck,
    Settings,
    CreditCard,
} from "lucide-react"

const Page = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.4 })

    const steps = [
        {
            title: "Registrasi dan Validasi",
            description:
                "Selesaikan registrasi dan admin validasi NIK dan data diri",
            icon: <ClipboardList className="w-8 h-8" />,
            number: 1,
        },
        {
            title: "Pilih dan Ajukan Role",
            description:
                "Pilih role yang sesuai dengan kebutuhan dan ajukan permintaan Validasi Role",
            icon: <UserCheck className="w-8 h-8" />,
            number: 2,
        },
        {
            title: "Pemilihan Layanan",
            description: "Pilih layanan yang akan digunakan",
            icon: <Settings className="w-8 h-8" />,
            number: 3,
        },
        {
            title: "Pilih Menu dan Fitur",
            description: "Pilih menu dan fitur yang akan digunakan",
            icon: <CheckCircle className="w-8 h-8" />,
            number: 4,
        },
        {
            title: "Mengelola Akun",
            description:
                "Tambahkan metode pembayaran dan kelola akun Profil anda",
            icon: <CreditCard className="w-8 h-8" />,
            number: 5,
        },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    }
    return (
        <div className="min-h-screen bg-gradient-to-r from-green-800 via-red-600 to-yellow-700 py-20 px-4">
            <motion.div
                className="max-w-4xl mx-auto"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={containerVariants}
                ref={ref}
            >
                <h1 className="text-4xl font-bold text-center text-white mb-16">
                    Mulai dengan langkah-langkah berikut ini
                </h1>

                <div className="relative">
                    <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-pink-400 to-purple-600 transform -translate-x-1/2" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            className={`flex ${
                                index % 2 === 0
                                    ? "justify-start"
                                    : "justify-end"
                            } mb-12`}
                            variants={itemVariants}
                        >
                            <Card className="p-6 w-full max-w-md bg-opacity-20 backdrop-blur-lg bg-white border border-white/20">
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center">
                                            <span className="text-white font-bold">
                                                {step.number}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-200 mt-2">
                                            {step.description}
                                        </p>
                                    </div>
                                    <div className="ml-auto text-pink-400">
                                        {step.icon}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}

export default Page
