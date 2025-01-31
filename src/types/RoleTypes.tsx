export enum StatusRole {
    PUBLIC,
    PRIVATE,
}

export interface RoleTypeProps {
    RoleId: string
    NamaRole: string
    Keterangan: string
    Aktif: boolean
    Confirm: boolean
    StatusRole: StatusRole
    Layanan: LayananTypeProps[]
}

export const RoleTypeValue: RoleTypeProps = {
    RoleId: "",
    NamaRole: "",
    Keterangan: "",
    Aktif: false,
    Confirm: false,
    StatusRole: StatusRole.PUBLIC,
    Layanan: [],
}

export interface LayananTypeProps {
    LayananId: string
    NamaLayanan: string
    Keterangan: string
    Icon: string
    Url: string
    SubLayanan: SubLayananTypeProps[]
}

export const LayananTypeValue: LayananTypeProps = {
    LayananId: "",
    NamaLayanan: "",
    Keterangan: "",
    Icon: "",
    Url: "",
    SubLayanan: [],
}

export interface SubLayananTypeProps {
    SubLayananId: string
    NamaSubLayanan: string
    Keterangan: string
    Icon: string
    Url: string
    ChildLayanan: ChildLayananTypeProps[]
}

export const SubLayananTypeValue: SubLayananTypeProps = {
    SubLayananId: "",
    NamaSubLayanan: "",
    Keterangan: "",
    Icon: "",
    Url: "",
    ChildLayanan: [],
}

export interface ChildLayananTypeProps {
    ChildLayananId: string
    NamaChildLayanan: string
    Keterangan: string
    Icon: string
    Url: string
}

export const ChildLayananTypeValue: ChildLayananTypeProps = {
    ChildLayananId: "",
    NamaChildLayanan: "",
    Keterangan: "",
    Icon: "",
    Url: "",
}
