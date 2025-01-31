// components/loading-screen.tsx
"use client"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export function LoadingScreen() {
    return (
        <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.8,
                    delay: 0.2,
                    ease: [0, 0.71, 0.2, 1.01],
                }}
                className="flex flex-col items-center gap-6"
            >
                {/* Animated Logo Container */}
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1.2, 1, 1],
                    }}
                    transition={{
                        duration: 2,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    className="relative h-24 w-24"
                >
                    {/* Outer Circle */}
                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />

                    {/* Inner Circle */}
                    <motion.div
                        className="absolute inset-4 border-4 border-primary rounded-full"
                        animate={{
                            borderWidth: [4, 8, 4],
                            opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                        }}
                    />

                    {/* Center Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="h-8 w-8 text-primary animate-spin-slow" />
                    </div>
                </motion.div>

                {/* Animated Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-2 text-center"
                >
                    <motion.h1
                        className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent"
                        animate={{
                            backgroundPosition: [
                                "0% 50%",
                                "100% 50%",
                                "0% 50%",
                            ],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                        }}
                        style={{
                            backgroundSize: "200% auto",
                        }}
                    >
                        Memuat Aplikasi
                    </motion.h1>

                    {/* Progress Dots */}
                    <div className="flex justify-center gap-2">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="h-2 w-2 bg-primary rounded-full"
                                animate={{
                                    y: [0, -10, 0],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Animated Progress Bar */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    className="h-2 bg-gray-700 rounded-full overflow-hidden max-w-xs"
                >
                    <div className="h-full bg-gradient-to-r from-primary to-purple-400 relative">
                        <motion.div
                            className="absolute top-0 left-0 w-1/2 h-full bg-white/20"
                            animate={{
                                left: ["-50%", "150%"],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}
