"use client"
import React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartLineIcon, Code, Phone } from "lucide-react"

const Page = () => {
    const careers = [
        {
            title: "Senior Full-Stack Developer",
            type: "Teknik",
            location: "Remote",
            icon: <Code className="w-8 h-8 mb-4 text-indigo-600" />,
            description:
                "Memimpin pengembangan produk dengan arsitektur teknologi berbasis event.",
            requirements: [
                "5+ years experience with Java, React/Node.js",
                "Ahli dalam menggunakan Layanan Cloud",
                "Pengalaman dengan arsitektur mikroservice",
                "Pengalaman dalam menggunakan CI/CD dan TDD",
            ],
        },
        {
            title: "Mobile App Developer",
            type: "Teknik",
            location: "Hybrid",
            icon: <Phone className="w-8 h-8 mb-4 text-green-600" />,
            description:
                "Membuat aplikasi mobile yang responsif dan mudah digunakan.",
            requirements: [
                "3+ Tahun pengalaman dengan React Native",
                "Pengetahuan Native iOS/Android",
                "Pengalaman Dasar iOS/Android",
                "Pengalaman Testing dan Debugging Aplikasi",
            ],
        },
        {
            title: "Business Analyst",
            type: "Produk",
            location: "On-site",
            icon: <ChartLineIcon className="w-8 h-8 mb-4 text-blue-600" />,
            description:
                "Menjembatani kebutuhan bisnis dengan tim teknis untuk mengembangkan produk.",
            requirements: [
                "Strong SQL skills",
                "Experience with BI tools",
                "Excellent communication skills",
                "Agile methodology experience",
            ],
        },
    ]

    return (
        <div className="min-h-screen bg-transparent">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="py-20 text-center bg-gradient-to-r from-green-800 via-red-700 to-yellow-700"
            >
                <div className="container px-4 mx-auto">
                    <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl font-display">
                        Bangun Masa Depan Bersama Kami
                    </h1>
                    <p className="text-lg text-indigo-100">
                        Gabung dengan tim kami yang bersemangat untuk
                        menciptakan solusi teknologi terbaik.
                    </p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="container px-4 py-16 mx-auto mt-5"
            >
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {careers.map((career, index) => (
                        <motion.div
                            key={career.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-6 transition-all duration-300 hover:shadow-lg h-full">
                                <div className="mb-4">
                                    {career.icon}
                                    <h3 className="mb-2 text-xl font-semibold">
                                        {career.title}
                                    </h3>
                                    <div className="flex gap-2 mb-4 text-sm">
                                        <span className="px-2 py-1 text-indigo-600 bg-indigo-100 rounded-full">
                                            {career.location}
                                        </span>
                                        <span className="px-2 py-1 text-green-600 bg-green-100 rounded-full">
                                            {career.type}
                                        </span>
                                    </div>
                                </div>
                                <p className="mb-4 text-gray-600  dark:text-gray-100">
                                    {career.description}
                                </p>
                                <ul className="mb-6 space-y-2 text-gray-600 dark:text-gray-100">
                                    {career.requirements.map((req) => (
                                        <li
                                            key={req}
                                            className="flex items-center"
                                        >
                                            <span className="w-1.5 h-1.5 mr-2 bg-indigo-500 rounded-full" />
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                                {/* <Button className="w-full transition-transform hover:scale-105">
                                    Apply Now
                                </Button> */}
                                <Button
                                    className="w-full cursor-not-allowed"
                                    disabled
                                >
                                    Tutup
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}

export default Page
