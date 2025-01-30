import { AuthOptions, getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Bycript from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"

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
                const prisma = new PrismaClient();
                try {
                    if (!credentials) {
                        throw new Error("No credentials provided");
                    }
                    const userLogin = await prisma.userlogin.findFirst({
                        where: { username: credentials.username },
                        include: { member: { include: { Ktp: { select: { nama: true}}}}}
                    });

                    if (!userLogin) {
                        throw new Error("User tidak ditemukan");
                    }

                    if (!userLogin.password) {
                        throw new Error("Password is null");
                    }
                    const isPasswordValid = await Bycript.compare(
                        credentials.password,
                        userLogin.password
                    );
                    if (!isPasswordValid) {
                        throw new Error("Password salah");
                    }

                    const user = {
                        id: userLogin.userloginId,
                        username: userLogin.username,
                        nama: userLogin.member?.Ktp?.nama,
                        avatar: userLogin.member?.avatar,
                        email: userLogin.member?.email,
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
