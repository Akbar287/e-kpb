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
import { RoleTypeProps } from "@/types/RoleTypes"

export function RoleManagerDrawer({
    roles,
    setRoles,
    handleAddRole,
    myRoles,
    loadingAddRemoveRole,
    setLoadingAddRemoveRole,
    loadingLogout,
}: {
    roles: RoleTypeProps[]
    setRoles: (roles: RoleTypeProps[]) => void
    handleAddRole: (role: RoleTypeProps) => void
    myRoles: RoleTypeProps[] | null
    loadingAddRemoveRole: boolean
    setLoadingAddRemoveRole: React.Dispatch<React.SetStateAction<boolean>>
    loadingLogout: boolean
}) {
    const [loading, setLoading] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [selectedRole, setSelectedRole] = useState<RoleTypeProps | null>(null)

    const getRoles = async () => {
        if (roles.length > 0) return
        setLoading(true)
        try {
            const res = await fetch("/api/protected/role/all")
            const data = await res.json()
            setRoles(
                myRoles
                    ? data.data.filter(
                          (role: RoleTypeProps) =>
                              !myRoles.some(
                                  (myRole) => myRole.RoleId === role.RoleId
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
    React.useEffect(() => {
        getRoles()
    }, [])

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, x: 100 },
    }

    const filteredRoles = roles.filter((role) =>
        role.NamaRole.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <Drawer>
            <LayoutGroup>
                <DrawerTrigger asChild>
                    <Button
                        className="bg-transparent text-blue-800 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800 border-2 border-gray-800 dark:border-gray-100"
                        type="button"
                        disabled={loadingAddRemoveRole || loadingLogout}
                        onClick={() => getRoles()}
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
                        className="bg-gradient-to-br from-green-300/80 to-yellow-300/50 via-red-300/30 dark:from-gray-800 dark:to-gray-700 h-full text-gray-800/80 dark:text-white flex flex-col"
                    >
                        <div className="bg-gradient-to-br from-green-300/80 to-yellow-300/50 via-red-300/30 dark:from-gray-800 dark:to-gray-700 h-full text-gray-800/80 dark:text-white flex-1 flex flex-col">
                            <div className="w-full lg:max-w-7xl mx-auto p-6">
                                <DrawerHeader className="border-b border-white/20 pb-6">
                                    <div className="flex justify-between items-center">
                                        <DrawerTitle className="text-3xl font-bold">
                                            Atur Peran Anda
                                        </DrawerTitle>
                                        <DrawerTrigger>
                                            <X className="h-6 w-6 text-gray-500 dark:text-white/70 hover:text-white transition-colors" />
                                        </DrawerTrigger>
                                    </div>

                                    <div className="mt-6 flex gap-4">
                                        <div className="relative flex-1 flex items-center justify-center">
                                            <Search className="absolute left-2 top-2 h-5 w-5 text-gray-500 dark:text-white/50" />
                                            <Input
                                                placeholder="Cari Peran..."
                                                value={searchQuery}
                                                onChange={(e) => {
                                                    setSearchQuery(
                                                        e.target.value
                                                    )
                                                }}
                                                disabled={
                                                    loadingAddRemoveRole ||
                                                    loading ||
                                                    loadingLogout
                                                }
                                                className="pl-10 transition-all active:shadow-md hover:shadow-lg bg-transparent border-gray-800/20 dark:bg-white/5 dark:border-white/20 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/50"
                                            />
                                        </div>
                                    </div>
                                </DrawerHeader>

                                <LayoutGroup>
                                    {loading ? (
                                        <div className="flex-1 flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-600/20"></div>
                                        </div>
                                    ) : (
                                        <motion.div
                                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 p-4 flex-1 h-[calc(100vh-200px)] overflow-y-auto"
                                            layout
                                        >
                                            <AnimatePresence mode="popLayout">
                                                {filteredRoles.map((role) => (
                                                    <motion.div
                                                        key={role.RoleId}
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
                                                                    ? "bg-white/20 border-2 border-green-700 dark:border-green-200"
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
                                                                {role.NamaRole}
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
                                                                            disabled={
                                                                                loadingAddRemoveRole ||
                                                                                loadingLogout
                                                                            }
                                                                            className={`${
                                                                                loadingAddRemoveRole
                                                                                    ? "from-green-800 to-yellow-600 via-red-500 text-white"
                                                                                    : "from-green-200 to-yellow-100 via-red-100 text-gray-700"
                                                                            } text-xs transition-all  bg-gradient-to-r hover:scale-105`}
                                                                        >
                                                                            <LogInIcon className="mr-2 h-3 w-3" />
                                                                            {loadingAddRemoveRole
                                                                                ? "Menambah..."
                                                                                : "Ajukan"}
                                                                        </Button>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </motion.div>
                                    )}
                                </LayoutGroup>
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
