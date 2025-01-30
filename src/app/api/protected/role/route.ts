import { PrismaClient } from "@prisma/client"
import { getSession } from "@/provider/api"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    const session = await getSession()

    if (!session) {
        return NextResponse.redirect(
            new URL("/login", req.nextUrl.origin).toString()
        )
    }
    try {
        let user = await prisma.userlogin.findFirst({
            select: {
                member: {
                    select: {
                        RoleMember: {
                            select: {
                                // confirm: true,
                                role: {
                                    include: {
                                        layanan: {
                                            include: {
                                                layanan: {
                                                    include: {
                                                        SubLayanan: {
                                                            include: {
                                                                childLayanan:
                                                                    true,
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            where: {
                userloginId: session.user.id,
                username: session.user.username,
            },
        }) as any
        
        if (user) {
            user = user.member?.RoleMember.map((rm: any) => {
                return {
                    roleId: rm.role.roleId,
                    namaRole: rm.role.namaRole,
                    keterangan: rm.role.keterangan,
                    aktif: rm.role.aktif,
                    statusRole: rm.role.statusRole,
                    layanan: rm.role.layanan.map((layanan : any) => {
                        return {
                            layananId: layanan.layananId,
                            namaLayanan: layanan.layanan.namaLayanan,
                            keterangan: layanan.layanan.keterangan,
                            icon: layanan.layanan.icon,
                            url: layanan.layanan.url,
                            SubLayanan: layanan.layanan.SubLayanan,
                        }
                    }),
                }
            })
            delete user.member
        }

        if (!user) {
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
                data: user,
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
