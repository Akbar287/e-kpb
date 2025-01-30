import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()
export async function POST(req: NextRequest) {
    const data = await req.json()

    const userlogin = await prisma.userlogin.findFirst({
        where: {
            username: data.username,
        },
    })

    if (userlogin) {
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

        const statusMember = await prisma.statusMember.findFirst({
            where: { namaStatus: "ACTIVE" },
        })
        const statusWallet = await prisma.statusWallet.findFirst({
            where: { namaStatusWallet: "ACTIVE" },
        })
        const notifikasiGrup = await prisma.notifikasiGrup.findFirst({
            where: { namaNotifikasiGrup: "UMUM" },
        })

        console.log(statusMember, statusWallet, notifikasiGrup)

        const ktp = await prisma.ktp.create({
            data: {
                nik: data.nik,
                nama: data.nama,
                alamat: data.alamat,
                jenisKelamin: data.jenisKelamin,
                tempatLahir: data.tempatLahir,
                tanggalLahir: new Date(data.tanggalLahir),
                verified: data.verified,
                pekerjaan: data.pekerjaan,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        })

        const member = await prisma.member.create({
            data: {
                statusMemberId: statusMember?.statusMemberId,
                ktpId: ktp.ktpId,
                email: data.email,
                nomorHp: data.nomorHp,
                nomorWa: data.nomorWa,
                avatar: "default.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        })

        const userlogin = await prisma.userlogin.create({
            data: {
                memberId: member.memberId,
                username: data.username,
                password: hashedPassword,
                provider: "CREDENTIALS",
                providerAccountId: null,
                accessToken: null,
                refreshToken: null,
                lastLogin: new Date(),
            },
        })

        const wallet = await prisma.wallet.create({
            data: {
                memberId: member.memberId,
                statusWalletId: statusWallet?.statusWalletId,
                saldo: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        })

        if (notifikasiGrup !== null) {
            const notifikasi = await prisma.notifikasi.create({
                data: {
                    notifikasiGrupId: notifikasiGrup.notifikasiGrupId,
                    memberId: member.memberId,
                    judul: "Selamat Datang",
                    pesan: "Selamat datang di aplikasi e-KPB",
                    jenisLayanan: "e-KPB",
                    statusNotifikasi: "BELUM_DIBACA",
                    prioritas: "RENDAH",
                    waktuKirim: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    dataTambahan: JSON.stringify({}),
                    linkAksi: null,
                },
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
