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
        const member = await prisma.userlogin.findFirst({
            select: {
                memberId: true,
            }
        })
        if (!member) {
            return NextResponse.json(
                {
                    data: [],
                    status: "Not Found",
                    message: "Member tidak ditemukan",
                },
                { status: 404 }
            )
        }
        
        const roleId = req.nextUrl.searchParams.get("roleId")
        if (!roleId) {
            return NextResponse.json(
                {
                    data: [],
                    status: "Bad Request",
                    message: "Role ID tidak ditemukan",
                },
                { status: 400 }
            )
        }

        const role = await prisma.role.findFirst({
            where: {
                roleId
            },
        })

        if (!role) {
            return NextResponse.json(
                {
                    data: [],
                    status: "Not Found",
                    message: "Role tidak ditemukan",
                },
                { status: 404 }
            )
        }

        await prisma.roleMember.create({
            data: {
                roleId: role.roleId,
                memberId: member.memberId!,
                confirm: false
            },
        })

        return NextResponse.json(
            {
                message: "Role berhasil disematkan",
                data: [],
                status: "success",
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
