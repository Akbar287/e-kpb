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
import { removeItemAtIndex } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const LayoutChecker = ({ children }: { children: React.ReactNode }) => {
    const { toast } = useToast()
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
    const [loadingLogout, setLoadingLogout] = React.useState(false)
    const [loadingAddRemoveRole, setLoadingAddRemoveRole] =
        React.useState(false)
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
        setLoadingLogout(true)
        setSelectedRole(null)
        setSelectedLayanan(null)
        await signOut()
            .then(() => {
                localStorage.removeItem("kpb.my-role")
                localStorage.removeItem("kpb.my-profile")
                localStorage.removeItem("kpb.selected-role")
                localStorage.removeItem("kpb.selected-services")
                router.push("/")
            })
            .catch((err) => {
                console.error(err)
            })
            .finally(() => {
                setLoadingLogout(false)
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
        setLoadingAddRemoveRole(true)
        const res = await fetch(
            "/api/protected/role/addRoleToMember?roleId=" + localRole.RoleId
        )
        if (res.status === 200) {
            if (role) {
                setZustandValue(roleStore, [...role, localRole])
                setRole([...role, localRole])
                localStorage.setItem(
                    "kpb.my-role",
                    JSON.stringify([...role, localRole])
                )
                setRoles(roles.filter((r) => r.RoleId !== localRole.RoleId))
                toast({
                    variant: "default",
                    title: "Peran berhasil ditambahkan",
                    description: `Peran ${localRole.NamaRole} berhasil ditambahkan. Mohon tunggu untuk verifikasi Role oleh Admin.`,
                })
            }
        }
        setLoadingAddRemoveRole(false)
    }

    const handleRemoveRole = async (localRole: RoleTypeProps) => {
        setLoadingAddRemoveRole(true)
        const res = await fetch(
            "/api/protected/role/removeRoleFromMember?roleId=" +
                localRole.RoleId
        )
        if (res.status === 200) {
            if (role) {
                const index = role.findIndex(
                    (x) => x.RoleId === localRole.RoleId
                )
                setZustandValue(roleStore, removeItemAtIndex(role, index))
                localStorage.setItem(
                    "kpb.my-role",
                    JSON.stringify(removeItemAtIndex(role, index))
                )
                setRole(removeItemAtIndex(role, index))
                setRoles([...roles, localRole])
                setSelectedRole(null)
                setSelectedLayanan(null)
                toast({
                    variant: "default",
                    title: "Peran berhasil dihapus",
                    description: `Peran ${localRole.NamaRole} berhasil dihapus.`,
                })
            }
        }
        setLoadingAddRemoveRole(false)
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
                                loadingAddRemoveRole={loadingAddRemoveRole}
                                setLoadingAddRemoveRole={
                                    setLoadingAddRemoveRole
                                }
                                loadingLogout={loadingLogout}
                            />
                            <Button
                                className="bg-transparent text-red-800 dark:text-red-100 hover:bg-red-200 dark:hover:bg-red-800 border-2 border-red-800 dark:border-red-100"
                                type="button"
                                disabled={loadingAddRemoveRole || loadingLogout}
                                onClick={() => logout()}
                            >
                                <span className="md:block hidden">
                                    {loadingLogout ? "Logout..." : "Logout"}
                                </span>
                                <LogOut size={24} />
                            </Button>
                        </div>
                    </div>
                    {role ? (
                        <ResponsiveServiceSelector
                            roles={role}
                            handleRemoveRole={handleRemoveRole}
                            selectedRole={selectedRole}
                            setSelectedRole={setSelectedRole}
                            selectedLayanan={selectedLayanan}
                            setSelectedLayanan={setSelectedLayanan}
                            gotoApp={gotoApp}
                            loadingAddRemoveRole={loadingAddRemoveRole}
                            setLoadingAddRemoveRole={setLoadingAddRemoveRole}
                            loadingLogout={loadingLogout}
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
