export enum StatusRole {
    PUBLIC,
    PRIVATE,
}

export interface RoleModelProps {
    roleId: string
    namaRole: string
    keterangan: string
    aktif: boolean
    confirm: boolean
    statusRole: StatusRole
    layanan: LayananModelProps[]
}

export const RoleModelValue: RoleModelProps = {
    roleId: "",
    namaRole: "",
    keterangan: "",
    aktif: false,
    confirm: false,
    statusRole: StatusRole.PUBLIC,
    layanan: [],
}

export interface LayananModelProps {
    layananId: string
    namaLayanan: string
    keterangan: string
    icon: string
    url: string
    SubLayanan: SubLayananModelProps[]
}

export const LayananModelValue: LayananModelProps = {
    layananId: "",
    namaLayanan: "",
    keterangan: "",
    icon: "",
    url: "",
    SubLayanan: [],
}

export interface SubLayananModelProps {
    subLayananId: string
    namaSubLayanan: string
    keterangan: string
    icon: string
    url: string
    childLayanan: ChildLayananModelProps[]
}

export const SubLayananModelValue: SubLayananModelProps = {
    subLayananId: "",
    namaSubLayanan: "",
    keterangan: "",
    icon: "",
    url: "",
    childLayanan: [],
}

export interface ChildLayananModelProps {
    childLayananId: string
    namaChildLayanan: string
    keterangan: string
    icon: string
    url: string
}

export const ChildLayananModelValue: ChildLayananModelProps = {
    childLayananId: "",
    namaChildLayanan: "",
    keterangan: "",
    icon: "",
    url: "",
}
