enum JenisKelamin {
    PRIA,
    WANITA,
}

export interface KtpTypeProps {
    ktpId: string
    nik: string
    nama: string
    alamat: string
    jenisKelamin: JenisKelamin
    tempatLahir: string
    tanggalLahir: string
    verified: boolean
    createdAt: string
    updatedAt: string
    pekerjaan: string
}

export const KtpTypeValue: KtpTypeProps = {
    ktpId: "",
    nik: "",
    nama: "",
    alamat: "",
    jenisKelamin: JenisKelamin.PRIA,
    tempatLahir: "",
    tanggalLahir: "",
    verified: false,
    createdAt: "",
    updatedAt: "",
    pekerjaan: "",
}

export interface MemberTypeProps {
    memberId: string
    ktpId: string
    statusMemberId: string
    email: string
    nomorHp: string | null
    nomorWa: string | null
    avatar: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
}

export const MemberTypeValue: MemberTypeProps = {
    memberId: "",
    ktpId: "",
    statusMemberId: "",
    email: "",
    nomorHp: "",
    nomorWa: "",
    avatar: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
}

export interface UserloginTypeProps {
    userloginId: string
    memberId: string
    provider: string
    providerAccountId: string | null
    username: string
    password: string | null
}

export const UserloginTypeValue: UserloginTypeProps = {
    userloginId: "",
    memberId: "",
    provider: "",
    providerAccountId: "",
    username: "",
    password: "",
}

export interface ProfileTypeProps {
    ktp: KtpTypeProps
    member: MemberTypeProps
    userlogin: UserloginTypeProps
}

export const ProfileTypeValue: ProfileTypeProps = {
    ktp: KtpTypeValue,
    member: MemberTypeValue,
    userlogin: UserloginTypeValue,
}
