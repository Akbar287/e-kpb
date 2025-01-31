"use client"

import LayoutAuth from "@/components/layout/layout-auth"
import LayoutNoauth from "@/components/layout/layout-noauth"
import React from "react"
import { signOut, useSession } from "next-auth/react"
import { ResponsiveServiceSelector } from "@/components/change-role-service"
import { getZustandValue, setZustandValue } from "nes-zustand"
import { roleStore } from "@/store/RoleStore"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { selectedRoleStore } from "@/store/SelectedRoleStore"
import { selectedLayananStore } from "@/store/SelectedServiceStore"
import { LoadingScreen } from "@/components/loading-screen"
import { RoleManagerDrawer } from "@/components/role-manage-drawer"
import { LayananTypeProps, RoleTypeProps } from "@/types/RoleTypes"

const LayoutChecker = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [app, setApp] = React.useState(false)
    const [role, setRole] = React.useState<RoleTypeProps[] | null>(() => {
        if (typeof window !== "undefined") {
            return getZustandValue(roleStore)
        }
        return null
    })
    const [roles, setRoles] = React.useState<RoleTypeProps[]>([])
    const [loading, setLoading] = React.useState(false)
    const [selectedRole, setSelectedRole] =
        React.useState<RoleTypeProps | null>(null)
    const [selectedLayanan, setSelectedLayanan] =
        React.useState<LayananTypeProps | null>(null)

    const gotoApp = () => {
        if (selectedRole && selectedLayanan) {
            setZustandValue(selectedRoleStore, selectedRole)
            setZustandValue(selectedLayananStore, selectedLayanan)
            localStorage.setItem(
                "kpb.selected-role",
                JSON.stringify(selectedRole)
            )
            localStorage.setItem(
                "kpb.selected-services",
                JSON.stringify(selectedLayanan)
            )
            setApp(true)
        }
    }

    const clearRoleAndService = () => {
        setZustandValue(selectedRoleStore, null)
        setZustandValue(selectedLayananStore, null)
        localStorage.removeItem("kpb.selected-role")
        localStorage.removeItem("kpb.selected-services")
        setSelectedLayanan(null)
        setSelectedRole(null)
        setApp(false)
    }

    const logout = async () => {
        await signOut().then(() => {
            localStorage.removeItem("kpb.my-role")
            localStorage.removeItem("kpb.my-profile")
            localStorage.removeItem("kpb.selected-role")
            localStorage.removeItem("kpb.selected-services")
            router.push("/")
        })
    }

    const checkRole = () => {
        setLoading(true)
        const roleZustand = getZustandValue(roleStore)
        if (roleZustand) {
            localStorage.setItem("kpb.my-role", JSON.stringify(roleZustand))
            setRole(roleZustand)
        } else {
            if (localStorage.getItem("kpb.my-role")) {
                const res = JSON.parse(
                    localStorage.getItem("kpb.my-role") || ""
                )
                setZustandValue(roleStore, res)
                setRole(res)
            }
        }
        setLoading(false)
    }

    const handleAddRole = async (localRole: RoleTypeProps) => {
        const res = await fetch(
            "/api/protected/role/addRoleToMember?roleId=" + localRole.roleId
        )
        if (res.status === 200) {
            if (role) {
                setZustandValue(roleStore, [...role, localRole])
                setRole([...role, localRole])
            } else {
                setZustandValue(roleStore, [localRole])
                setRole([localRole])
            }
            setRoles(roles.filter((r) => r.roleId !== localRole.roleId))
        }
    }

    React.useEffect(() => {
        checkRole()
    }, [])

    if (status === "loading") {
        return <LoadingScreen />
    }

    return status === "authenticated" ? (
        app ? (
            <LayoutAuth
                clearRoleAndService={clearRoleAndService}
                logout={logout}
            >
                {children}
            </LayoutAuth>
        ) : loading ? (
            <LoadingScreen />
        ) : (
            <div className="p-8 min-h-screen bg-gradient-to-br from-green-100 via-yellow-100 to-red-100 dark:from-gray-800 dark:to-gray-700 ">
                <div className="max-w-7xl mx-auto">
                    <div className="flex ml-4 mb-8">
                        <h1 className="text-3xl font-bold text-primary flex">
                            <span className="md:block hidden mr-2">
                                Layanan
                            </span>
                            e-KPB
                        </h1>
                        <div className="w-12 h-12 right-0 absolute mr-28 md:mr-[230px] flex gap-2">
                            {/* <Button
                                className="bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 border-2 border-gray-800 text-gray-800 dark:text-gray-200 dark:border-gray-100"
                                type="button"
                                onClick={() => checkRole()}
                            >
                                <RefreshCwIcon size={24} />
                                <span className="md:block hidden">Refresh</span>
                            </Button> */}
                            <RoleManagerDrawer
                                roles={roles}
                                setRoles={setRoles}
                                handleAddRole={handleAddRole}
                                myRoles={role}
                            />
                            <Button
                                className="bg-transparent text-red-800 dark:text-red-100 hover:bg-red-200 dark:hover:bg-red-800 border-2 border-red-800 dark:border-red-100"
                                type="button"
                                onClick={() => logout()}
                            >
                                <span className="md:block hidden">Keluar</span>
                                <LogOut size={24} />
                            </Button>
                        </div>
                    </div>
                    {role ? (
                        <ResponsiveServiceSelector
                            roles={role}
                            selectedRole={selectedRole}
                            setSelectedRole={setSelectedRole}
                            selectedLayanan={selectedLayanan}
                            setSelectedLayanan={setSelectedLayanan}
                            gotoApp={gotoApp}
                        />
                    ) : (
                        <LoadingScreen />
                    )}
                </div>
            </div>
        )
    ) : (
        <LayoutNoauth>{children}</LayoutNoauth>
    )
}

export default LayoutChecker
