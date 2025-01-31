import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/provider/api";
import { drizzle } from "drizzle-orm/node-postgres";
import { Ktp, Member, Userlogin } from "@/db/schema";
import { and, eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!);
export async function GET(req: NextRequest) {
    const session = await getSession();
    if (!session) {
        return NextResponse.redirect(new URL("/login", req.nextUrl.origin).toString());
    }

    try {
            const user = await db.select({
                userloginId: Userlogin.UserloginId,
                username: Userlogin.Username,
                provider: Userlogin.Provider,
                providerAccountId: Userlogin.ProviderAccountId,
                lastLogin: Userlogin.LastLogin,
                accessToken: Userlogin.AccessToken,
                refreshToken: Userlogin.RefreshToken,
                member: {
                    ...Member,
                    Ktp: Ktp
                },
            }).from(Userlogin)
            .innerJoin(Member, eq(Userlogin.MemberId, Member.MemberId))
            .innerJoin(Ktp, eq(Member.KtpId, Ktp.KtpId))
            .where(and(eq(Userlogin.UserloginId, session.user.id), eq(Userlogin.Username, session.user.username)))
            
            if (user.length === 0) {
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
