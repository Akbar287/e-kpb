import {
    ChildLayanan,
    Layanan,
    Role,
    RoleLayanan,
    SubLayanan,
} from "@/db/schema"
import { asc, eq, sql } from "drizzle-orm"
import { drizzle } from "drizzle-orm/node-postgres"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const db = drizzle(process.env.DATABASE_URL!)
    try {
        const roles = await db
            .select()
            .from(Role)
            .leftJoin(RoleLayanan, eq(Role.RoleId, RoleLayanan.RoleId))
            .leftJoin(Layanan, eq(RoleLayanan.LayananId, Layanan.LayananId))
            .leftJoin(SubLayanan, eq(Layanan.LayananId, SubLayanan.LayananId))
            .leftJoin(
                ChildLayanan,
                eq(SubLayanan.SubLayananId, ChildLayanan.SubLayananId)
            )
            .where(eq(Role.Aktif, true))
            .orderBy(asc(Role.NamaRole))

        const nestedRoles = roles.reduce(
            (acc, row) => {
                // Find or create role
                let roleEntry = acc.find((r) => r.RoleId === row.role.RoleId)
                if (!roleEntry) {
                    roleEntry = {
                        ...row.role,
                        Layanan: [],
                    }
                    acc.push(roleEntry)
                }

                // Handle Layanan
                if (row.layanan) {
                    let layananEntry = roleEntry.Layanan.find(
                        (l) => l.LayananId === row.role_layanan?.LayananId
                    )
                    if (!layananEntry) {
                        layananEntry = {
                            ...row.layanan,
                            SubLayanan: [],
                        }
                        roleEntry.Layanan.push(layananEntry)
                    }

                    // Handle SubLayanan
                    if (row.sub_layanan) {
                        let subLayananEntry = layananEntry.SubLayanan.find(
                            (s) =>
                                s.SubLayananId === row.sub_layanan?.SubLayananId
                        )
                        if (!subLayananEntry) {
                            subLayananEntry = {
                                ...row.sub_layanan,
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
                                    row.child_layanan
                                )
                            }
                        }
                    }
                }

                return acc
            },
            [] as Array<
                typeof Role.$inferSelect & {
                    Layanan: Array<
                        typeof Layanan.$inferSelect & {
                            SubLayanan: Array<
                                typeof SubLayanan.$inferSelect & {
                                    ChildLayanan: Array<
                                        typeof ChildLayanan.$inferSelect
                                    >
                                }
                            >
                        }
                    >
                }
            >
        )

        if (roles.length === 0) {
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
