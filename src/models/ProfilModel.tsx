enum JenisKelamin {
    PRIA,
    WANITA,
}

export interface KtpModelProps {
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

export const KtpModelValue: KtpModelProps = {
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

export interface MemberModelProps {
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

export const MemberModelValue: MemberModelProps = {
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

export interface UserloginModelProps {
    userloginId: string
    memberId: string
    provider: string
    providerAccountId: string | null
    username: string
    password: string | null
}

export const UserloginModelValue: UserloginModelProps = {
    userloginId: "",
    memberId: "",
    provider: "",
    providerAccountId: "",
    username: "",
    password: "",
}

export interface ProfileModelProps {
    ktp: KtpModelProps
    member: MemberModelProps
    userlogin: UserloginModelProps
}

export const ProfileModelValue: ProfileModelProps = {
    ktp: KtpModelValue,
    member: MemberModelValue,
    userlogin: UserloginModelValue,
}
