"use client"
import React from "react"
import { motion } from "framer-motion"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
    {
        question: "Apa itu e-KPB?",
        answer: "e-KPB adalah ekosistem layanan pertanian terpadu yang memudahkan petani dalam merencanakan, mendapatkan akses permodalan, dan menjual hasil pertanian secara online.",
    },
    {
        question: "Apa itu Saldo e-KPB ?",
        answer: "Saldo e-KPB adalah saldo yang dapat digunakan untuk melakukan pembayaran di e-KPB. Anda dapat menambahkan saldo dengan mentransfer uang ke rekening e-KPB.",
    },
    {
        question: "Apa Layanan didalamnya gratis ?",
        answer: "Ya, Layanan e-KPB gratis untuk semua pengguna. Anda dapat menggunakan semua fitur tanpa adanya biaya.",
    },
    {
        question: "Bagaimana Menghubungi Kantor e-KPB?",
        answer: "Tim kami siap membantu Anda. Anda dapat menghubungi kami melalui email, telepon, atau chat.",
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
}

const Page = () => {
    return (
        <div className=" bg-transparent py-20 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center mb-16"
            >
                <h1 className="text-4xl font-bold text-gray-700 dark:text-gray-100 mb-4">
                    Frequently Asked Questions
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-200">
                    Temukan jawaban atas pertanyaan yang sering diajukan
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto space-y-4"
            >
                {faqItems.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        transition={{ duration: 0.4 }}
                    >
                        <Accordion type="single" collapsible>
                            <AccordionItem value={`item-${index}`}>
                                <motion.div whileHover={{ scale: 1.01 }}>
                                    <AccordionTrigger className="text-left  dark:bg-white bg-gray-500 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                                        <span className="text-lg font-semibold text-gray-100 dark:text-[#1e293b]">
                                            {item.question}
                                        </span>
                                    </AccordionTrigger>
                                </motion.div>
                                <AccordionContent className=" shadow-lg">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="p-6 bg-white/80 mt-1 rounded-b-lg text-[#475569]"
                                    >
                                        {item.answer}
                                    </motion.div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default Page
