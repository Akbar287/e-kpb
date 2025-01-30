// components/responsive-service-selector.tsx
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
import { SearchIcon } from "lucide-react"
import { LayananModelProps, RoleModelProps } from "@/models/RoleModel"

export function ResponsiveServiceSelector({
    roles,
    selectedRole,
    setSelectedRole,
    selectedLayanan,
    setSelectedLayanan,
    gotoApp,
}: {
    roles: RoleModelProps[]
    selectedRole: RoleModelProps | null
    setSelectedRole: React.Dispatch<React.SetStateAction<RoleModelProps | null>>
    selectedLayanan: LayananModelProps | null
    setSelectedLayanan: React.Dispatch<
        React.SetStateAction<LayananModelProps | null>
    >
    gotoApp: () => void
}) {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredLayanan =
        selectedRole?.layanan.filter(
            (layanan) =>
                layanan.namaLayanan
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                layanan.keterangan
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
        ) || []

    return (
        <div className="h-screen bg-transparent flex flex-col">
            <div className="md:hidden p-4 border-b flex items-center gap-4">
                <Select
                    value={selectedRole?.roleId || ""}
                    onValueChange={(value) => {
                        const role = roles.find((r) => r.roleId === value)
                        setSelectedRole(role || null)
                    }}
                >
                    <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Pilih Peran" />
                    </SelectTrigger>
                    <SelectContent>
                        {roles
                            .filter((role) => role.aktif)
                            .map((role) => (
                                <SelectItem
                                    key={role.roleId}
                                    value={role.roleId}
                                >
                                    {role.namaRole}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex-1 flex">
                <div className="hidden md:block w-64 border-r">
                    <div className="h-full">
                        <div className="p-4 space-y-1">
                            <h3 className="px-2 mb-2 text-lg font-semibold">
                                Daftar Peran
                            </h3>
                            {roles
                                .filter((role) => role.aktif)
                                .map((role, index) => (
                                    <Button
                                        key={index}
                                        variant={
                                            selectedRole?.roleId === role.roleId
                                                ? "secondary"
                                                : "ghost"
                                        }
                                        className={`${
                                            role.roleId === selectedRole?.roleId
                                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                                : "border-secondary bg-secondary/5 ring-1 ring-secondary"
                                        } w-full justify-start`}
                                        onClick={() => {
                                            setSelectedRole(role)
                                            setSelectedLayanan(null)
                                            console.log("selectedRole")
                                            console.log(selectedRole)
                                            console.log("role")
                                            console.log(role)
                                        }}
                                    >
                                        {role.namaRole}
                                    </Button>
                                ))}
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="p-4 border-b">
                        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Input
                                    placeholder="Cari layanan..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="pl-10"
                                />
                                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                            {filteredLayanan.map((layanan) => (
                                <Card
                                    key={layanan.layananId}
                                    className={`cursor-pointer transition-all hover:border-primary ${
                                        selectedLayanan?.layananId ===
                                        layanan.layananId
                                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                                            : "border-secondary bg-secondary/5 ring-1 ring-secondary"
                                    }`}
                                    onClick={() => setSelectedLayanan(layanan)}
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
                                                            __html: layanan.icon,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <CardTitle className="text-lg">
                                                {layanan.namaLayanan}
                                            </CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground line-clamp-3">
                                            {layanan.keterangan}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        {!selectedRole && (
                            <h3 className="font-semibold text-lg text-center text-muted-foreground p-4">
                                Silakan pilih Peran
                            </h3>
                        )}
                    </div>

                    {selectedLayanan && (
                        <div className="sticky bottom-0 p-4 border-t bg-background shadow-lg">
                            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="space-y-1 flex-1">
                                    <p className="text-sm text-muted-foreground">
                                        Layanan terpilih:
                                    </p>
                                    <h3 className="font-semibold text-primary truncate">
                                        {selectedLayanan.namaLayanan}
                                    </h3>
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
