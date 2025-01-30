"use client"

import React, { useState } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Search, X, UserPenIcon, LogInIcon } from "lucide-react"
import { RoleModelProps } from "@/models/RoleModel"

export function RoleManagerDrawer({
    roles,
    setRoles,
    handleAddRole,
    myRoles,
}: {
    roles: RoleModelProps[]
    setRoles: (roles: RoleModelProps[]) => void
    handleAddRole: (role: RoleModelProps) => void
    myRoles: RoleModelProps[] | null
}) {
    const [loading, setLoading] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [selectedRole, setSelectedRole] = useState<RoleModelProps | null>(
        null
    )

    React.useEffect(() => {
        const getRoles = async () => {
            if (roles.length > 0) return
            setLoading(true)
            try {
                const res = await fetch("/api/protected/role/all")
                const data = await res.json()
                setRoles(
                    myRoles
                        ? data.data.filter(
                              (role: RoleModelProps) =>
                                  !myRoles.some(
                                      (myRole) => myRole.roleId === role.roleId
                                  )
                          )
                        : data.data
                )
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        getRoles()
    }, [])

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, x: 100 },
    }

    const filteredRoles = roles.filter((role) =>
        role.namaRole.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <Drawer>
            <LayoutGroup>
                <DrawerTrigger asChild>
                    <Button
                        className="bg-transparent text-blue-800 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800 border-2 border-gray-800 dark:border-gray-100"
                        type="button"
                    >
                        <UserPenIcon size={24} />
                        <span className="md:block hidden">Atur Peran</span>
                    </Button>
                </DrawerTrigger>

                <DrawerContent
                    aria-describedby="dialog-content"
                    className="h-screen max-w-full rounded-t-2xl "
                >
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 20,
                        }}
                        className="bg-gradient-to-br from-indigo-900 to-purple-900 h-full text-white flex flex-col"
                    >
                        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 h-full text-white flex-1 flex flex-col">
                            <div className="max-w-7xl mx-auto p-6">
                                <DrawerHeader className="border-b border-white/20 pb-6">
                                    <div className="flex justify-between items-center">
                                        <DrawerTitle className="text-3xl font-bold">
                                            Pengaturan Peran Anda
                                        </DrawerTitle>
                                        <DrawerTrigger>
                                            <X className="h-6 w-6 text-white/70 hover:text-white transition-colors" />
                                        </DrawerTrigger>
                                    </div>

                                    <div className="mt-6 flex gap-4">
                                        <div className="relative flex-1 flex items-center justify-center">
                                            <Search className="absolute left-2 top-2 h-5 w-5 text-white/50" />
                                            <Input
                                                placeholder="Cari Peran..."
                                                value={searchQuery}
                                                onChange={(e) => {
                                                    setSearchQuery(
                                                        e.target.value
                                                    )
                                                }}
                                                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50"
                                            />
                                        </div>
                                    </div>
                                </DrawerHeader>

                                <LayoutGroup>
                                    <motion.div
                                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 p-4 flex-1 overflow-y-auto"
                                        layout
                                    >
                                        <AnimatePresence mode="popLayout">
                                            {filteredRoles.map((role) => (
                                                <motion.div
                                                    key={role.roleId}
                                                    layout
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    variants={cardVariants}
                                                    transition={{
                                                        duration: 0.3,
                                                    }}
                                                    className="relative group"
                                                >
                                                    <div
                                                        className={`p-6 rounded-xl cursor-pointer transition-all${
                                                            selectedRole ===
                                                            role
                                                                ? "bg-white/20 border-2 border-indigo-400"
                                                                : "bg-white/10 hover:bg-white/15 border-2 border-transparent"
                                                        }`}
                                                        onClick={() =>
                                                            setSelectedRole(
                                                                (prev) =>
                                                                    prev ===
                                                                    role
                                                                        ? null
                                                                        : role
                                                            )
                                                        }
                                                    >
                                                        <h3 className="text-lg font-semibold truncate">
                                                            {role.namaRole}
                                                        </h3>

                                                        <AnimatePresence>
                                                            {selectedRole ===
                                                                role && (
                                                                <motion.div
                                                                    initial={{
                                                                        opacity: 0,
                                                                        y: -10,
                                                                    }}
                                                                    animate={{
                                                                        opacity: 1,
                                                                        y: 0,
                                                                    }}
                                                                    exit={{
                                                                        opacity: 0,
                                                                        y: -10,
                                                                    }}
                                                                    className="mt-4 flex justify-end gap-2"
                                                                >
                                                                    <Button
                                                                        size="sm"
                                                                        onClick={(
                                                                            e
                                                                        ) => {
                                                                            e.stopPropagation()
                                                                            handleAddRole(
                                                                                role
                                                                            )
                                                                        }}
                                                                        className="text-xs"
                                                                    >
                                                                        <LogInIcon className="mr-2 h-3 w-3" />
                                                                        Ajukan
                                                                    </Button>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>

                                                    {/* Hover effect */}
                                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </motion.div>
                                </LayoutGroup>

                                {/* Empty State */}
                                {loading ? (
                                    <></>
                                ) : (
                                    filteredRoles.length === 0 && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-center py-24 text-white/50 flex-1 flex items-center justify-center"
                                        >
                                            Tidak ada role yang ditemukan
                                        </motion.div>
                                    )
                                )}
                            </div>
                        </div>
                    </motion.div>
                </DrawerContent>
            </LayoutGroup>
        </Drawer>
    )
}
