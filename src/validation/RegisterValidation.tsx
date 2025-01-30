import { z } from "zod"
const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/
export const RegisterSkemaValidation = z.object({
    username: z
        .string()
        .nonempty("Nama Pengguna diperlukan")
        .min(8, "Nama Pengguna harus memiliki minimal 8 karakter")
        .max(16, "Nama Pengguna harus memiliki maksimal 16 karakter"),
    password: z
        .string()
        .nonempty("Kata Sandi diperlukan")
        .min(8, "Kata Sandi harus memiliki minimal 8 karakter"),
    nik: z
        .string()
        .nonempty("nik tidak boleh kosong")
        .length(16, { message: "NIK harus memiliki 16 digit" }),
    nama: z
        .string()
        .nonempty("nama tidak boleh kosong")
        .min(1, { message: "Nama tidak boleh kosong" }),
    alamat: z
        .string()
        .nonempty("alamat tidak boleh kosong")
        .min(1, { message: "Alamat tidak boleh kosong" }),
    jenisKelamin: z.enum(["PRIA", "WANITA"], {
        errorMap: () => ({ message: "Pilih jenis kelamin" }),
    }),
    tempatLahir: z
        .string()
        .nonempty("tempatLahir tidak boleh kosong")
        .min(1, { message: "Tempat Lahir tidak boleh kosong" }),
    tanggalLahir: z.coerce.date({ message: "Format Tanggal Salah" }),
    verified: z.boolean().default(false),
    email: z
        .string()
        .nonempty("email tidak boleh kosong")
        .email({ message: "Format email salah" }),
    pekerjaan: z.string().nonempty("pekerjaan tidak boleh kosong").optional(),
    nomorHp: z
        .string()
        .min(10, "Nomor HP harus memiliki minimal 10 digit")
        .max(15, "Nomor HP tidak boleh lebih dari 15 digit")
        .regex(phoneRegex, "Format nomor HP tidak valid"),
    nomorWa: z
        .string()
        .min(10, "Nomor WA harus memiliki minimal 10 digit")
        .max(15, "Nomor WA tidak boleh lebih dari 15 digit")
        .regex(phoneRegex, "Format nomor WA tidak valid"),
})

export type RegisterFormValidation = z.infer<typeof RegisterSkemaValidation>
