export enum StatusRole {
    PUBLIC,
    PRIVATE,
}

export interface RoleTypeProps {
    roleId: string
    namaRole: string
    keterangan: string
    aktif: boolean
    confirm: boolean
    statusRole: StatusRole
    layanan: LayananTypeProps[]
}

export const RoleTypeValue: RoleTypeProps = {
    roleId: "",
    namaRole: "",
    keterangan: "",
    aktif: false,
    confirm: false,
    statusRole: StatusRole.PUBLIC,
    layanan: [],
}

export interface LayananTypeProps {
    layananId: string
    namaLayanan: string
    keterangan: string
    icon: string
    url: string
    SubLayanan: SubLayananTypeProps[]
}

export const LayananTypeValue: LayananTypeProps = {
    layananId: "",
    namaLayanan: "",
    keterangan: "",
    icon: "",
    url: "",
    SubLayanan: [],
}

export interface SubLayananTypeProps {
    subLayananId: string
    namaSubLayanan: string
    keterangan: string
    icon: string
    url: string
    childLayanan: ChildLayananTypeProps[]
}

export const SubLayananTypeValue: SubLayananTypeProps = {
    subLayananId: "",
    namaSubLayanan: "",
    keterangan: "",
    icon: "",
    url: "",
    childLayanan: [],
}

export interface ChildLayananTypeProps {
    childLayananId: string
    namaChildLayanan: string
    keterangan: string
    icon: string
    url: string
}

export const ChildLayananTypeValue: ChildLayananTypeProps = {
    childLayananId: "",
    namaChildLayanan: "",
    keterangan: "",
    icon: "",
    url: "",
}
