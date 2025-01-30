"use client"
import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mail, Phone, Search, BookOpen } from "lucide-react"
import Image from "next/image"
import logo from "@/assets/icons/KPB-Logo.png"

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
}
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
}

const Page = () => {
    return (
        <div className="flex items-center justify-center w-full h-full ">
            <div className="">
                {/* Hero Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="py-20 text-center"
                >
                    <div className="container max-w-4xl px-4">
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Image
                                className="mx-auto my-5 dark:bg-gray-200 dark:p-4 dark:rounded-lg"
                                src={logo}
                                priority
                                width={130}
                                height={145}
                                alt="logo"
                            />
                        </motion.div>
                        <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                            Bagaimana kami bisa membantu Anda?
                        </h1>
                        <div className="relative max-w-xl mx-auto">
                            <Input
                                placeholder="Cari Artikel di Knowledge Base..."
                                className="pl-12 pr-4 py-6 rounded-full shadow-lg dark:border-gray-100"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-200" />
                        </div>
                    </div>
                </motion.section>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="container grid md:grid-cols-3 gap-8 px-4 mb-20"
                >
                    {[
                        {
                            icon: BookOpen,
                            title: "Knowledge Base",
                            color: "bg-indigo-100",
                        },
                        {
                            icon: Mail,
                            title: "Dukungan Email",
                            color: "bg-purple-100",
                        },
                        {
                            icon: Phone,
                            title: "Chat / Telepon",
                            color: "bg-pink-100",
                        },
                    ].map((item, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card className="hover:shadow-lg transition-shadow duration-300">
                                <CardHeader>
                                    <div
                                        className={`${item.color} w-fit p-4 rounded-xl mb-4`}
                                    >
                                        <item.icon className="h-8 w-8 text-indigo-600" />
                                    </div>
                                    <CardTitle className="text-slate-800 dark:text-slate-100">
                                        {item.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Button
                                        variant="link"
                                        className="text-indigo-600 dark:text-indigo-200 p-0"
                                    >
                                        Get started →
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default Page
