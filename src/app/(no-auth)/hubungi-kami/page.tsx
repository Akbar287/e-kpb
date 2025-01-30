"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"
import { useAnimation } from "framer-motion"
import { useEffect } from "react"

const Page = () => {
    const controls = useAnimation()

    useEffect(() => {
        controls.start("visible")
    }, [controls])

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
        <div className=" bg-transparent py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto text-center mb-16"
            >
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Hubungi Kami
                </h1>
                <p className="text-lg text-gray-600">
                    Jangan ragu untuk menghubungi kami
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={controls}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
                {/* Address Card */}
                <motion.div variants={itemVariants}>
                    <Card className="p-8 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 h-full">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="flex flex-col items-center"
                        >
                            <div className="bg-indigo-100 p-4 rounded-full mb-6">
                                <MapPin className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Kantor Kami
                            </h3>
                            <p className="text-gray-600 text-center leading-relaxed">
                                Way Rarem No. 7
                                <br />
                                Bandar Lampung
                                <br />
                                Indonesia
                            </p>
                        </motion.div>
                    </Card>
                </motion.div>

                {/* Phone Card */}
                <motion.div variants={itemVariants}>
                    <Card className="p-8 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 h-full">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="flex flex-col items-center"
                        >
                            <div className="bg-purple-100 p-4 rounded-full mb-6">
                                <Phone className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Nomor Telepon
                            </h3>
                            <p className="text-gray-600 text-center leading-relaxed">
                                Umum: +62 812345678
                                <br />
                                Teknis: +62 812345678
                                <br />
                                Fax: +62 812345678
                            </p>
                        </motion.div>
                    </Card>
                </motion.div>

                {/* Email Card */}
                <motion.div variants={itemVariants}>
                    <Card className="p-8 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 h-full">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="flex flex-col items-center"
                        >
                            <div className="bg-pink-100 p-4 rounded-full mb-6">
                                <Mail className="w-8 h-8 text-pink-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Email
                            </h3>
                            <p className="text-gray-600 text-center leading-relaxed">
                                Umum: info@e-kpb.com
                                <br />
                                Teknis: support@e-kpb.com
                                <br />
                                Operation: sales@e-kpb.com
                            </p>
                        </motion.div>
                    </Card>
                </motion.div>
            </motion.div>

            {/* Bouncing Phone Animation */}
            <motion.div
                initial={{ y: -20 }}
                animate={{ y: 20 }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
                className="fixed bottom-8 left-8 bg-purple-600 p-4 rounded-full shadow-lg"
            >
                <Phone className="w-6 h-6 text-white" />
            </motion.div>
            <motion.div
                initial={{ y: -20 }}
                animate={{ y: 20 }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
                className="fixed top-20 right-32 bg-purple-600 p-4 rounded-full shadow-lg"
            >
                <Mail className="w-6 h-6 text-white" />
            </motion.div>
        </div>
    )
}

export default Page
