"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const Page = () => {
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
                duration: 0.5,
            },
        },
    }

    const benefits = [
        {
            title: "Strategic Collaboration",
            description: "Combine resources for mutual growth",
        },
        {
            title: "Market Expansion",
            description: "Access new markets and customer bases",
        },
        {
            title: "Innovation Boost",
            description: "Co-develop cutting-edge solutions",
        },
        {
            title: "Shared Resources",
            description: "Leverage combined expertise and assets",
        },
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-transparent py-12 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                        Bangun Partnership
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-200 mb-8">
                        Kolaborasi untuk pertumbuhan bersama
                    </p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg">
                            Mulai Kolaborasi
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Benefits Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
                >
                    {benefits.map((benefit, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card className="h-full bg-white hover:bg-indigo-50 transition-colors duration-300">
                                <CardHeader>
                                    <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                        <span className="text-indigo-600 text-xl">
                                            ✨
                                        </span>
                                    </div>
                                    <CardTitle className="text-slate-900">
                                        {benefit.title}
                                    </CardTitle>
                                    <CardDescription className="text-slate-600">
                                        {benefit.description}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Partnership Form */}
                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                        Ayo Kolaborasi Bersama Kami
                    </h2>
                    <form className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                                    Nama Usaha
                                </label>
                                <Input className="focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Email
                                </label>
                                <Input
                                    type="email"
                                    className="focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Proposal Kolaborasi
                                </label>
                                <Textarea
                                    rows={4}
                                    className="focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 text-lg"
                            >
                                Kirim Proposal
                            </Button>
                        </motion.div>
                    </form>
                </div>

                {/* Testimonials */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 grid md:grid-cols-2 gap-8"
                >
                    <Card className="bg-indigo-50 border-indigo-100">
                        <CardContent className="pt-6">
                            <p className="text-lg text-slate-700 italic mb-4">
                                "Pertumbuhan e-KPB sangat luar biasa dengan
                                teknologi yang mumpuni mampu menyejahterakan
                                masyarakat."
                            </p>
                            <p className="font-medium text-slate-900">
                                - Kios A.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-indigo-50 border-indigo-100">
                        <CardContent className="pt-6">
                            <p className="text-lg text-slate-700 italic mb-4">
                                "Kami sangat puas dengan layanan yang diberikan
                                oleh e-KPB."
                            </p>
                            <p className="font-medium text-slate-900">
                                - Kios B.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Page
