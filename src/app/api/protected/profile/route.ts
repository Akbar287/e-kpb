import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/provider/api";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(req: NextRequest) {

    const session = await getSession();

    if (!session) {
        return NextResponse.redirect(new URL("/login", req.nextUrl.origin).toString());
    }

    try {
            const user = await prisma.userlogin.findFirst({
                where: {
                    userloginId: session.user.id,
                    username: session.user.username
                }, 
                select: {
                    userloginId: true,
                    username: true,
                    provider: true,
                    providerAccountId: true,
                    lastLogin: true,
                    accessToken: true,
                    refreshToken: true,
                    member: {
                        include: {
                            Ktp: true
                        }
                    }
                }
            })
        
            if (!user) {
                return NextResponse.json({ data: [], status: 'Not Found', message: "User tidak ditemukan"}, {status: 404});
            }
        
            return NextResponse.json({
                message: "Data berhasil ditemukan",
                data: user, 
                status: 'found'
            }, {status: 200});
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ data: [], status: 'Error', message: errorMessage}, {status: 500});
    }
}
