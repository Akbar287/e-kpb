import { Member, Role, RoleMember, Userlogin } from "@/db/schema"
import { getSession } from "@/provider/api"
import { and, eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/node-postgres"
import { NextRequest, NextResponse } from "next/server"

const db = drizzle(process.env.DATABASE_URL!)

export async function GET(req: NextRequest) {
    const session = await getSession()

    if (!session) {
        return NextResponse.redirect(
            new URL("/login", req.nextUrl.origin).toString()
        )
    }

    try {
        const member = await db.select({MemberId: Member.MemberId}).from(Userlogin).innerJoin(Member, eq(Member.MemberId, Userlogin.MemberId)).where(eq(Userlogin.UserloginId, session.user.id))
        if (member.length === 0) {
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

        const role = await db.select().from(Role).where(eq(Role.RoleId, roleId))

        if (role.length === 0) {
            return NextResponse.json(
                {
                    data: [],
                    status: "Not Found",
                    message: "Role tidak ditemukan",
                },
                { status: 404 }
            )
        }

        await db.delete(RoleMember).where(and(eq(RoleMember.MemberId, member[0].MemberId), eq(RoleMember.RoleId, role[0].RoleId)))

        return NextResponse.json(
            {
                message: "Relasi Peran Pengguna berhasil dihapus",
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
