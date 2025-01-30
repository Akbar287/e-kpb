"use client"
import React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const sections = [
    {
        title: "1. Pendahuluan",
        content:
            "Selamat datang di situs web kami. Dengan mengakses situs web ini, Anda setuju untuk mematuhi syarat dan ketentuan penggunaan kami...",
    },
    {
        title: "2. Penggunaan Layanan",
        content:
            "Dengan menggunakan layanan kami, Anda setuju untuk tidak melanggar hukum setempat, negara, atau internasional...",
    },
    {
        title: "3. Konten",
        content:
            "Kami tidak bertanggung jawab atas konten yang muncul di situs web pihak ketiga...",
    },
    {
        title: "4. Penutup",
        content:
            "Kami berhak untuk memperbarui, mengubah, atau mengganti bagian dari syarat dan ketentuan ini...",
    },
    {
        title: "5. Hukum yang Berlaku",
        content:
            "Syarat dan ketentuan ini diatur oleh dan diinterpretasikan sesuai dengan hukum negara kami...",
    },
]

const Page = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-transparent py-12 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-100 dark:to-purple-500 bg-clip-text text-transparent">
                        Terms & Conditions
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-200">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                >
                    <Accordion type="single" collapsible className="w-full">
                        {sections.map((section, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <Card className="mb-4 overflow-hidden">
                                    <AccordionItem value={`item-${index}`}>
                                        <AccordionTrigger className="px-6 py-4 hover:bg-indigo-50 dark:hover:bg-indigo-600 transition-colors">
                                            <span className="text-lg font-semibold text-indigo-800 dark:text-indigo-200">
                                                {section.title}
                                            </span>
                                        </AccordionTrigger>
                                        <AccordionContent className="px-6 py-4 text-gray-700 dark:text-gray-100 leading-relaxed">
                                            {section.content}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Card>
                            </motion.div>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Page
