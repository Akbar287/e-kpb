import {
    Ktp,
    Member,
    Notifikasi,
    NotifikasiGrup,
    StatusMember,
    StatusWallet,
    Userlogin,
    Wallet,
} from "@/db/schema"
import bcrypt from "bcrypt"
import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/node-postgres"
import { NextRequest, NextResponse } from "next/server"

const db = drizzle(process.env.DATABASE_URL!)

export async function POST(req: NextRequest) {
    const data = await req.json()

    const userlogin = await db
        .select()
        .from(Userlogin)
        .where(eq(Userlogin.Username, data.username))

    if (userlogin.length > 0) {
        return NextResponse.json(
            {
                message: "Username sudah terdaftar",
                data: [],
                status: 400,
            },
            {
                status: 400,
                statusText: "Bad Request",
                headers: { "Content-Type": "application/json" },
            }
        )
    }

    try {
        const hashedPassword = await bcrypt.hash(data.password, 10)

        const statusMember = await db
            .select({ StatusMemberId: StatusMember.StatusMemberId })
            .from(StatusMember)
            .where(eq(StatusMember.NamaStatus, "ACTIVE"))
        const statusWallet = await db
            .select({ StatusWalletId: StatusWallet.StatusWalletId })
            .from(StatusWallet)
            .where(eq(StatusWallet.NamaStatusWallet, "ACTIVE"))
        const notifikasiGrup = await db
            .select({ NotifikasiGrupId: NotifikasiGrup.NotifikasiGrupId })
            .from(NotifikasiGrup)
            .where(eq(NotifikasiGrup.NamaNotifikasiGrup, "UMUM"))

        const ktp = await db
            .insert(Ktp)
            .values({
                Nik: data.nik,
                Nama: data.nama,
                Alamat: data.alamat,
                JenisKelamin: data.jenisKelamin,
                TempatLahir: data.tempatLahir,
                TanggalLahir: new Date(data.tanggalLahir),
                Verified: data.verified,
                Pekerjaan: data.pekerjaan,
            })
            .returning()

        const member = await db
            .insert(Member)
            .values({
                StatusMemberId: statusMember[0].StatusMemberId,
                KtpId: ktp[0].KtpId,
                Email: data.email,
                NomorHp: data.nomorHp,
                NomorWa: data.nomorWa,
                Avatar: "default.png",
            })
            .returning()

        await db.insert(Userlogin).values({
            MemberId: member[0].MemberId,
            Username: data.username,
            Password: hashedPassword,
            Provider: "CREDENTIALS",
            ProviderAccountId: null,
            AccessToken: null,
            RefreshToken: null,
            LastLogin: new Date(),
        })

        await db.insert(Wallet).values({
            MemberId: member[0].MemberId,
            StatusWalletId: statusWallet[0].StatusWalletId,
            Saldo: "0",
        })

        if (notifikasiGrup !== null) {
            await db.insert(Notifikasi).values({
                NotifikasiGrupId: notifikasiGrup[0].NotifikasiGrupId,
                MemberId: member[0].MemberId,
                Judul: "Selamat Datang",
                Pesan: "Selamat datang di aplikasi e-KPB",
                JenisLayanan: "e-KPB",
                StatusNotifikasi: "BELUM_DIBACA",
                Prioritas: "RENDAH",
                WaktuKirim: new Date(),
                DataTambahan: JSON.stringify({}),
                LinkAksi: null,
            })
        }

        return NextResponse.json(
            {
                message: "Pengguna berhasil terdaftar",
                data: [],
                status: 201,
            },
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            { status: 500, message: "Internal Server Error", data: [] },
            { status: 500 }
        )
    }
}
