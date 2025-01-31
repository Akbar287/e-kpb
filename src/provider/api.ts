import { AuthOptions, getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Bycript from "bcrypt";
import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import { Ktp, Member, Userlogin } from "@/db/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!)
const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "credentials",
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials, req) {
                try {
                    if (!credentials) {
                        throw new Error("No credentials provided");
                    }
                    
                    const userLogin = await db.select({
                        username: Userlogin.Username,
                        password: Userlogin.Password,
                        userloginId: Userlogin.UserloginId,
                        nama: Ktp.Nama,
                        email: Member.Email,
                        avatar: Member.Avatar,
                    }).from(Userlogin).innerJoin(Member, eq(Userlogin.MemberId, Member.MemberId)).innerJoin(Ktp, eq(Member.KtpId, Ktp.KtpId)).where(eq(Userlogin.Username, credentials.username));

                    if (userLogin.length === 0) {
                        throw new Error("User tidak ditemukan");
                    }

                    const userLoginData = userLogin[0];

                    if (!userLoginData.password) {
                        throw new Error("Password is null");
                    }
                    const isPasswordValid = await Bycript.compare(
                        credentials.password,
                        userLoginData.password
                    );
                    if (!isPasswordValid) {
                        throw new Error("Password salah");
                    }

                    const user = {
                        id: userLoginData.userloginId,
                        username: userLoginData.username,
                        nama: userLoginData.nama,
                        avatar: userLoginData.avatar,
                        email: userLoginData.email,
                    };

                    return user;

                } catch (error) {
                    if (error instanceof Error) {
                        return Promise.reject(error);
                    }
                    return Promise.reject("An unknown error occurred");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: any; user?: any }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.email = user.email;
                token.nama = user.nama;
                token.avatar = user.avatar;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if('id' in token) {
                session.user.id = token.id as string;
            }
            if('username' in token) {
                session.user.username = token.username as string;
            }
            if('email' in token) {
                session.user.email = token.email as string;
            }
            if('nama' in token) {
                session.user.nama = token.nama as string;
            }
            if('avatar' in token) {
                session.user.avatar = token.avatar as string;
            }

            return session;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const getSession = () => getServerSession(authOptions)

export { authOptions, getSession }
