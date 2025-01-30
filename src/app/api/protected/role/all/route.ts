import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {

    try {
        let roles = await prisma.role.findMany({
            where: {
                aktif: true
            },
            include: {
                layanan: {
                    include: {
                        layanan: {
                            include: {
                                SubLayanan: {
                                    include: {
                                        childLayanan: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })

        if (roles) {
            roles = roles.map(
                (rm) => {
                    return {
                        roleId: rm.roleId,
                        namaRole: rm.namaRole,
                        keterangan: rm.keterangan,
                        aktif: rm.aktif,
                        statusRole: rm.statusRole,
                        layanan: rm.layanan.map((layanan) => ({
                            roleId: rm.roleId,
                            layananId: layanan.layananId,
                            layanan: {
                                layananId: layanan.layanan.layananId,
                                namaLayanan: layanan.layanan.namaLayanan,
                                keterangan: layanan.layanan.keterangan,
                                icon: layanan.layanan.icon,
                                url: layanan.layanan.url,
                                SubLayanan: layanan.layanan.SubLayanan,
                            }
                        })),
                    }
                }
            )
        }

        if (!roles) {
            return NextResponse.json(
                {
                    data: [],
                    status: "Not Found",
                    message: "Role tidak ditemukan",
                },
                { status: 404 }
            )
        }

        return NextResponse.json(
            {
                message: "Data berhasil ditemukan",
                data: roles,
                status: "found",
            },
            { status: 200 }
        )
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error"
        return NextResponse.json(
            { data: [], status: "Error", message: errorMessage },
            { status: 500 }
        )
    }
}
