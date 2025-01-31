"use client"

import { useState } from "react"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { InfoIcon, SearchIcon, Trash2Icon } from "lucide-react"
import { LayananTypeProps, RoleTypeProps } from "@/types/RoleTypes"

export function ResponsiveServiceSelector({
    roles,
    handleRemoveRole,
    selectedRole,
    setSelectedRole,
    selectedLayanan,
    setSelectedLayanan,
    gotoApp,
}: {
    roles: RoleTypeProps[]
    handleRemoveRole: (role: RoleTypeProps) => void
    selectedRole: RoleTypeProps | null
    setSelectedRole: React.Dispatch<React.SetStateAction<RoleTypeProps | null>>
    selectedLayanan: LayananTypeProps | null
    setSelectedLayanan: React.Dispatch<
        React.SetStateAction<LayananTypeProps | null>
    >
    gotoApp: () => void
}) {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredLayanan =
        selectedRole?.Layanan.filter(
            (layanan) =>
                layanan.NamaLayanan.toLowerCase().includes(
                    searchQuery.toLowerCase()
                ) ||
                layanan.Keterangan.toLowerCase().includes(
                    searchQuery.toLowerCase()
                )
        ) || []

    return (
        <div className="min-h-screen flex flex-col">
            <div className="md:hidden p-4 border-gray-900/50 flex items-center gap-4">
                <Select
                    value={selectedRole?.RoleId || ""}
                    onValueChange={(value) => {
                        const role = roles.find((r) => r.RoleId === value)
                        setSelectedRole(role || null)
                    }}
                >
                    <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Pilih Peran" />
                    </SelectTrigger>
                    <SelectContent>
                        {roles
                            .filter((role) => role.Aktif)
                            .map((role) => (
                                <SelectItem
                                    key={role.RoleId}
                                    value={role.RoleId}
                                >
                                    {role.NamaRole}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex-1 flex">
                <div className="hidden md:block w-64 border-r border-gray-900/50">
                    <div className="h-full">
                        <div className="p-4 space-y-1">
                            <h3 className="px-2 mb-2 text-lg font-semibold">
                                Daftar Peran
                            </h3>
                            {roles
                                .filter((role) => role.Aktif)
                                .map((role, index) => (
                                    <Button
                                        key={index}
                                        variant={
                                            selectedRole?.RoleId === role.RoleId
                                                ? "secondary"
                                                : "ghost"
                                        }
                                        className={`${
                                            role.RoleId === selectedRole?.RoleId
                                                ? "border-primary bg-primary/5 ring-1 ring-primary scale-105 translate-x-2 shadow-md"
                                                : "border-gray-200 dark:border-gray-600 border-[1px] border-foreground "
                                        } mb-3 w-full flex justify-between hover:bg-gradient-to-r dark:bg-gray-700/50 dark:hover:bg-gray-300 dark:hover:text-gray-800 hover:from-green-200/50 transition-all hover:to-yellow-200/50 hover:via-red-200/40`}
                                        onClick={() => {
                                            setSelectedRole(role)
                                            setSelectedLayanan(null)
                                        }}
                                    >
                                        {role.NamaRole}
                                        {!role.Confirm && (
                                            <InfoIcon
                                                size={16}
                                                className="text-gray-800 dark:text-gray-300"
                                            />
                                        )}
                                    </Button>
                                ))}
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="p-4 border-b border-gray-900/50">
                        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 ">
                            <div className="relative flex-1 ">
                                <Input
                                    placeholder="Cari layanan..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="pl-10 border-gray-800/50 dark:border-gray-300 hover:shadow-lg transition-all active:shadow-sm"
                                />
                                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-800 dark:text-gray-300" />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-lg text-gray-700 p-4">
                                {selectedRole?.NamaRole || "Pilih Peran"}
                            </h3>
                            {selectedRole && (
                                <Button
                                    variant={"destructive"}
                                    onClick={() =>
                                        handleRemoveRole(selectedRole)
                                    }
                                    className=""
                                >
                                    <span className="md:block hidden">
                                        Hapus Peran
                                    </span>
                                    <Trash2Icon />
                                </Button>
                            )}
                        </div>
                        {!selectedRole ? (
                            <h3 className="font-semibold text-lg text-center text-muted-foreground p-4">
                                Silakan pilih Peran
                            </h3>
                        ) : !selectedRole.Confirm ? (
                            <div className="flex justify-center items-center">
                                <h3 className="font-semibold text-lg text-center text-muted-foreground p-4">
                                    Peran {selectedRole?.NamaRole} belum
                                    dikonfirmasi
                                </h3>
                            </div>
                        ) : filteredLayanan.length === 0 ? (
                            <div className="flex justify-center items-center">
                                <h3 className="font-semibold text-lg text-center text-muted-foreground p-4">
                                    Layanan di Peran {selectedRole?.NamaRole}{" "}
                                    tidak tersedia
                                </h3>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 ">
                                {filteredLayanan.map((layanan) => (
                                    <Card
                                        key={layanan.LayananId}
                                        className={`cursor-pointer transition-all hover:scale-110 hover:border-primary ${
                                            selectedLayanan?.LayananId ===
                                            layanan.LayananId
                                                ? "border-primary bg-primary/5 ring-1 scale-105 ring-primary"
                                                : "border-gray-500/50 bg-transparent"
                                        }`}
                                        onClick={() =>
                                            setSelectedLayanan(layanan)
                                        }
                                    >
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-primary/10 rounded-lg">
                                                    <div
                                                        style={{
                                                            width: 24,
                                                            height: 24,
                                                            overflow: "hidden",
                                                        }}
                                                    >
                                                        <span
                                                            className="w-6 h-6 text-primary"
                                                            dangerouslySetInnerHTML={{
                                                                __html: layanan.Icon,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <CardTitle className="text-lg">
                                                    {layanan.NamaLayanan}
                                                </CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground line-clamp-3">
                                                {layanan.Keterangan}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>

                    {selectedLayanan && (
                        <div className="sticky bottom-0 p-4 border-t backdrop-blur-xl border-gray-900/50 bg-gradient-to-r from-indigo-200/70 dark:from-gray-800/60 dark:to-gray-700/50 to-green-400/70 via-red-100 shadow-lg">
                            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="space-y-1 flex-1">
                                    <div className="flex flex-row justify-start items-center">
                                        <div className="mr-5">
                                            <p className="text-sm text-muted-foreground">
                                                Peran terpilih:
                                            </p>
                                            <h3 className="font-semibold text-primary truncate">
                                                {selectedRole?.NamaRole}
                                            </h3>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Layanan terpilih:
                                            </p>
                                            <h3 className="font-semibold text-primary truncate">
                                                {selectedLayanan.NamaLayanan}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    size="lg"
                                    className="w-full md:w-auto"
                                    onClick={() => gotoApp()}
                                >
                                    Buka Layanan
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
