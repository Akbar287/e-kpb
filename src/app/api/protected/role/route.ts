import { ChildLayanan, Layanan, Member, Role, RoleLayanan, RoleMember, SubLayanan, Userlogin } from "@/db/schema"
import { getSession } from "@/provider/api"
import { ChildLayananTypeProps, LayananTypeProps, RoleTypeProps, StatusRole, SubLayananTypeProps } from "@/types/RoleTypes"
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
        let user = await db.select().from(Userlogin)
        .leftJoin(Member, eq(Userlogin.MemberId, Member.MemberId))
        .leftJoin(RoleMember, eq(Member.MemberId, RoleMember.MemberId))
        .leftJoin(Role, eq(RoleMember.RoleId, Role.RoleId))
        .leftJoin(RoleLayanan, eq(Role.RoleId, RoleLayanan.RoleId))
        .leftJoin(Layanan, eq(RoleLayanan.LayananId, Layanan.LayananId))
        .leftJoin(SubLayanan, eq(Layanan.LayananId, SubLayanan.LayananId))
        .leftJoin(ChildLayanan, eq(SubLayanan.SubLayananId, ChildLayanan.SubLayananId))
        .where(and(eq(Userlogin.UserloginId, session.user.id), eq(Userlogin.Username, session.user.username)))
        
        const nestedRoles = user.reduce(
            (acc, row) => {
                // Find or create role
                let roleEntry = acc.find((r) => r.RoleId === row.role?.RoleId)
                if (!roleEntry) {
                    roleEntry = {
                        RoleId: row.role?.RoleId!,
                        Confirm: row.role_member?.Confirm ?? false,
                        NamaRole: row.role?.NamaRole!,
                        Keterangan: row.role?.Keterangan ?? "",
                        Aktif: row.role?.Aktif ?? false,
                        StatusRole: row.role?.StatusRole === "PUBLIC" ? StatusRole["PUBLIC"] : StatusRole["PRIVATE"],
                        Layanan: [],
                    }
                    if (roleEntry) {
                        acc.push(roleEntry)
                    }
                }

                // Handle Layanan
                if (row.layanan) {
                    let layananEntry = roleEntry?.Layanan.find(
                        (l) => l.LayananId === row.role_layanan?.LayananId
                    )
                    if (!layananEntry) {
                        layananEntry = {
                            LayananId: row.layanan?.LayananId!,
                            NamaLayanan: row.layanan?.NamaLayanan!,
                            Keterangan: row.layanan?.Keterangan ?? "",
                            Icon: row.layanan?.Icon ?? "",
                            Url: row.layanan?.Url ?? "",
                            SubLayanan: [],
                        }
                        roleEntry?.Layanan.push(layananEntry)
                    }

                    // Handle SubLayanan
                    if (row.sub_layanan) {
                        let subLayananEntry = layananEntry.SubLayanan.find(
                            (s) =>
                                s.SubLayananId === row.sub_layanan?.SubLayananId
                        )
                        if (!subLayananEntry) {
                            subLayananEntry = {
                                SubLayananId: row.sub_layanan?.SubLayananId!,
                                NamaSubLayanan: row.sub_layanan?.NamaSubLayanan!,
                                Keterangan: row.sub_layanan?.Keterangan ?? "",
                                Icon: row.sub_layanan?.Icon ?? "",
                                Url: row.sub_layanan?.Url ?? "",
                                ChildLayanan: [],
                            }
                            layananEntry.SubLayanan.push(subLayananEntry)
                        }

                        // Handle ChildLayanan
                        if (row.child_layanan) {
                            const childExists =
                                subLayananEntry.ChildLayanan.some(
                                    (c) =>
                                        c.ChildLayananId ===
                                        row.child_layanan?.ChildLayananId
                                )
                            if (!childExists) {
                                subLayananEntry.ChildLayanan.push(
                                    {
                                        ChildLayananId: row.child_layanan?.ChildLayananId!,
                                        NamaChildLayanan: row.child_layanan?.NamaChildLayanan!,
                                        Keterangan: row.child_layanan?.Keterangan ?? "",
                                        Icon: row.child_layanan?.Icon ?? "",
                                        Url: row.child_layanan?.Url ?? "",
                                    }
                                )
                            }
                        }
                    }
                }

                return acc
            },
            [] as Array<
                RoleTypeProps & {
                    Layanan: Array<
                        LayananTypeProps & {
                            SubLayanan: Array<
                                SubLayananTypeProps & {
                                    ChildLayanan: Array<
                                        ChildLayananTypeProps
                                    >
                                }
                            >
                        }
                    >
                }
            >
        )

        if (user.length === 0) {
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
                data: nestedRoles,
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
