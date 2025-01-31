import {
    pgTable,
    uuid,
    text,
    integer,
    timestamp,
    boolean,
    primaryKey,
    numeric,
    pgEnum,
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"; 

// Enums
const JenisBiayaEnum = pgEnum("jenis_biaya", ["PAJAK", "LAYANAN"])
const JenisKelaminEnum = pgEnum("jenis_kelamin", ["PRIA", "WANITA"])
const JenisPetaniEnum = pgEnum("jenis_petani", [
    "PETANI_PEMILIK",
    "PETANI_PENGGARAP",
    "BURUH_TANI",
])
const MetodeDepositEnum = pgEnum("metode_deposit", [
    "TRANSFER",
    "VIRTUAL_ACCOUNT",
    "E_MONEY",
])
const PrioritasNotifikasiEnum = pgEnum("prioritas_notifikasi", [
    "RENDAH",
    "SEDANG",
    "TINGGI",
])
const ProviderEnum = pgEnum("provider", [
    "CREDENTIALS",
    "GOOGLE",
    "APPLE",
    "GITHUB",
    "FACEBOOK",
    "TWITTER",
])
const StatusNotifikasiEnum = pgEnum("status_notifikasi", [
    "BELUM_DIBACA",
    "SUDAH_DIBACA",
    "DIHAPUS",
])
const StatusPencairanEnum = pgEnum("status_pencairan", [
    "DIPROSES",
    "SELESAI",
    "GAGAL",
])
const StatusPetaniEnum = pgEnum("status_petani", [
    "AKTIF",
    "NON_AKTIF",
    "DALAM_VERIFIKASI",
])
const StatusRoleEnum = pgEnum("status_role", ["PUBLIC", "PRIVATE"])
const StatusVerifikasiDepositEnum = pgEnum("status_verifikasi_deposit", [
    "MENUNGGU",
    "DISETUJUI",
    "DITOLAK",
])

// Tables
export const Alamat = pgTable("alamat", {
    AlamatId: uuid("alamat_id").primaryKey().default(sql`gen_random_uuid()`),
    NamaAlamat: text("nama_alamat"),
    DesaId: uuid("desa_id").references(() => Desa.DesaId),
    Urutan: integer("urutan"),
    Alamat: text("alamat"),
    CreatedAt: timestamp("created_at"),
    UpdatedAt: timestamp("updated_at"),
    KodePos: text("kode_pos"),
    DeletedAt: timestamp("deleted_at"),
})

export const AlamatBpp = pgTable("alamat_bpp", {
    AlamatId: uuid("alamat_id").references(() => Alamat.AlamatId),
    BppId: uuid("bpp_id").references(() => Bpp.BppId),
})

export const AlamatGudang = pgTable("alamat_gudang", {
    GudangId: uuid("gudang_id").references(() => Gudang.GudangId),
    AlamatId: uuid("alamat_id").references(() => Alamat.AlamatId),
})

export const AlamatKelompokTani = pgTable("alamat_kelompok_tani", {
    AlamatId: uuid("alamat_id").references(() => Alamat.AlamatId),
    KelompokTaniId: uuid("kelompok_tani_id").references(
        () => KelompokTani.KelompokTaniId
    ),
})

export const AlamatMember = pgTable("alamat_member", {
    MemberId: uuid("member_id").references(() => Member.MemberId),
    AlamatId: uuid("alamat_id").references(() => Alamat.AlamatId),
})

export const AlamatPenyedia = pgTable("alamat_penyedia", {
    AlamatId: uuid("alamat_id").references(() => Alamat.AlamatId),
    MasterPenyediaId: uuid("master_penyedia_id").references(
        () => MasterPenyedia.MasterPenyediaId
    ),
})

export const Bank = pgTable("bank", {
    BankId: uuid("bank_id").primaryKey().default(sql`gen_random_uuid()`),
    KodeBank: text("kode_bank"),
    NamaBank: text("nama_bank"),
    Icon: text("icon"),
})

export const BiayaSaprotanPupuk = pgTable("biaya_saprotan_pupuk", {
    BiayaSaprotanId: uuid("biaya_saprotan_id").primaryKey().default(sql`gen_random_uuid()`),
    JenisPupukId: uuid("jenis_pupuk_id").references(
        () => JenisPupuk.JenisPupukId
    ),
    RencanaUsahaTaniId: uuid("rencana_usaha_tani_id").references(
        () => RencanaUsahaTani.RencanaUsahaTaniId
    ),
    Jumlah: numeric("jumlah"),
    SatuanJumlah: text("satuan_jumlah"),
    Harga: numeric("harga"),
    Deskripsi: text("deskripsi"),
})

export const BiayaUsahaTani = pgTable("biaya_usaha_tani", {
    BiayaUsahaTaniId: uuid("biaya_usaha_tani_id").primaryKey().default(sql`gen_random_uuid()`),
    NamaBiaya: text("nama_biaya"),
    Jumlah: numeric("jumlah"),
    SatuanJumlah: text("satuan_jumlah"),
    Harga: numeric("harga"),
    Keterangan: text("keterangan"),
    RencanaUsahaTaniId: uuid("rencana_usaha_tani_id").references(
        () => RencanaUsahaTani.RencanaUsahaTaniId
    ),
})

export const Bpp = pgTable("bpp", {
    BppId: uuid("bpp_id").primaryKey().default(sql`gen_random_uuid()`),
    NamaBpp: text("nama_bpp"),
    WilayahKerja: text("wilayah_kerja"),
    CreatedAt: timestamp("created_at"),
    UpdatedAt: timestamp("updated_at"),
    KodeBpp: text("kode_bpp"),
    TanggalBerdiri: timestamp("tanggal_berdiri"),
    NomorHp: text("nomor_hp"),
    Deskripsi: text("deskripsi"),
})

export const ChildKategori = pgTable("child_kategori", {
    ChildKategoriId: uuid("child_kategori_id").primaryKey().default(sql`gen_random_uuid()`),
    SubKategoriId: uuid("sub_kategori_id")
        .notNull()
        .references(() => SubKategori.SubKategoriId),
    NamaChildKategori: text("nama_child_kategori").notNull(),
    Deskripsi: text("deskripsi"),
    Status: boolean("status").notNull(),
})

export const ChildLayanan = pgTable("child_layanan", {
    ChildLayananId: uuid("child_layanan_id").primaryKey().default(sql`gen_random_uuid()`),
    NamaChildLayanan: text("nama_child_layanan"),
    Keterangan: text("keterangan"),
    Icon: text("icon"),
    Url: text("url"),
    SubLayananId: uuid("sub_layanan_id").references(
        () => SubLayanan.SubLayananId
    ),
})

export const Deposit = pgTable("deposit", {
    DepositId: uuid("deposit_id").primaryKey().default(sql`gen_random_uuid()`),
    TransaksiId: uuid("transaksi_id")
        .notNull()
        .references(() => Transaksi.TransaksiId),
    WalletId: uuid("wallet_id")
        .notNull()
        .references(() => Wallet.WalletId),
    MetodeDeposit: MetodeDepositEnum("metode_deposit").notNull(),
    BuktiTransfer: text("bukti_transfer").notNull(),
    StatusVerifikasi:
        StatusVerifikasiDepositEnum("status_verifikasi").notNull(),
    CreatedAt: timestamp("created_at", {
        precision: 3,
        withTimezone: false,
    }).notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at", {
        precision: 3,
        withTimezone: false,
    }).notNull().$defaultFn(() => new Date()),
    RekeningBankId: uuid("rekening_bank_id")
        .notNull()
        .references(() => RekeningBank.RekeningBankId),
})

export const Desa = pgTable("desa", {
    DesaId: uuid("desa_id").primaryKey().default(sql`gen_random_uuid()`),
    KodeKemendagri: text("kode_kemendagri"),
    NamaDesa: text("nama_desa"),
    KecamatanId: uuid("kecamatan_id").references(() => Kecamatan.KecamatanId),
})

export const DimensiMaterialMaster = pgTable("dimensi_material_master", {
    DimensiMaterialMasterId: uuid("dimensi_material_master_id").primaryKey().default(sql`gen_random_uuid()`),
    MaterialMasterId: uuid("material_master_id")
        .notNull()
        .references(() => MaterialMaster.MaterialMasterId),
    Panjang: numeric("panjang").notNull(),
    Lebar: numeric("lebar").notNull(),
    Tinggi: numeric("tinggi").notNull(),
    SatuanDimensi: text("satuan_dimensi").notNull().default("cm"),
    BeratKotor: numeric("berat_kotor").notNull().default("0"),
    BeratBersih: numeric("berat_bersih").notNull().default("0"),
    SatunBerat: text("satun_berat").notNull().default("gram"),
})

export const Ealokasi = pgTable("ealokasi", {
    EalokasiId: uuid("ealokasi_id").primaryKey().default(sql`gen_random_uuid()`),
    PenyuluhId: uuid("penyuluh_id")
        .notNull()
        .references(() => Penyuluh.PenyuluhId),
    KomoditasId: uuid("komoditas_id")
        .notNull()
        .references(() => Komoditas.KomoditasId),
    KelompokTaniId: uuid("kelompok_tani_id")
        .notNull()
        .references(() => KelompokTani.KelompokTaniId),
    MasterPenyediaId: uuid("master_penyedia_id")
        .notNull()
        .references(() => MasterPenyedia.MasterPenyediaId),
    MasaTanamId: uuid("masa_tanam_id")
        .notNull()
        .references(() => MasaTanam.MasaTanamId),
    PetaniId: uuid("petani_id")
        .notNull()
        .references(() => Petani.PetaniId),
    LuasLahan: numeric("luas_lahan"),
    Tahun: text("tahun"),
})

export const EalokasiPupukSubsidi = pgTable("ealokasi_pupuk_subsidi", {
    EalokasiPupukSubsidiId: uuid("ealokasi_pupuk_subsidi_id").primaryKey().default(sql`gen_random_uuid()`),
    JenisPupukId: uuid("jenis_pupuk_id")
        .notNull()
        .references(() => JenisPupuk.JenisPupukId),
    Jumlah: numeric("jumlah").notNull(),
    EalokasiId: uuid("ealokasi_id")
        .notNull()
        .references(() => Ealokasi.EalokasiId),
    JumlahDitebus: numeric("jumlah_ditebus").notNull(),
})

export const EalokasiPupukSubsidiTransaksi = pgTable(
    "ealokasi_pupuk_subsidi_transaksi",
    {
        EalokasiPupukSubsidiId: uuid("ealokasi_pupuk_subsidi_id")
            .notNull()
            .references(() => EalokasiPupukSubsidi.EalokasiPupukSubsidiId),
        OrderId: uuid("order_id")
            .notNull()
            .references(() => Order.OrderId),
    }
)

export const FaqProdukKur = pgTable("faq_produk_kur", {
    FaqProdukKurId: uuid("faq_produk_kur_id").primaryKey().default(sql`gen_random_uuid()`),
    Question: text("question"),
    Answer: text("answer"),
    ProdukKurId: uuid("produk_kur_id").references(() => ProdukKur.ProdukKurId),
})

export const FileKur = pgTable("file_kur", {
    FileKurId: uuid("file_kur_id").primaryKey().default(sql`gen_random_uuid()`),
    NamaFile: text("nama_file").notNull(),
    NamaDokumen: text("nama_dokumen").notNull(),
    CreatedAt: timestamp("created_at").notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at").notNull().$defaultFn(() => new Date()),
    KreditUsahaRakyatId: uuid("kredit_usaha_rakyat_id")
        .notNull()
        .references(() => KreditUsahaRakyat.KreditUsahaRakyatId),
    FileKurSyaratId: uuid("file_kur_syarat_id")
        .notNull()
        .references(() => FileKurSyarat.FileKurSyaratId),
})

export const FileKurSyarat = pgTable("file_kur_syarat", {
    FileKurSyaratId: uuid("file_kur_syarat_id").primaryKey().default(sql`gen_random_uuid()`),
    NamaFileSyarat: text("nama_file_syarat").notNull(),
    Deskripsi: text("deskripsi").notNull(),
    Verified: boolean("verified").notNull(),
    StatusBank: boolean("status_bank").notNull(),
    Catatan: text("catatan"),
    ProdukKurId: uuid("produk_kur_id")
        .notNull()
        .references(() => ProdukKur.ProdukKurId),
})

export const Gudang = pgTable("gudang", {
    GudangId: uuid("gudang_id").primaryKey().default(sql`gen_random_uuid()`),
    NamaGudang: text("nama_gudang").notNull(),
    Kapasitas: integer("kapasitas").notNull(),
    Status: boolean("status").notNull(),
    MemberId: uuid("member_id").references(() => Member.MemberId),
    JenisGudang: text("jenis_gudang"),
    CreatedAt: timestamp("created_at").notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at").notNull().$defaultFn(() => new Date()),
})

export const HasilPanen = pgTable("hasil_panen", {
    HasilPanenId: uuid("hasil_panen_id").primaryKey().default(sql`gen_random_uuid()`),
    NamaHasil: text("nama_hasil").notNull(),
    PendapatanKotor: numeric("pendapatan_kotor").notNull(),
    Jumlah: numeric("jumlah").notNull(),
    SatuanJumlah: text("satuan_jumlah").notNull(),
    RencanaUsahaTaniId: uuid("rencana_usaha_tani_id")
        .notNull()
        .references(() => RencanaUsahaTani.RencanaUsahaTaniId),
    Deskripsi: text("deskripsi"),
})

export const JenisInventory = pgTable("jenis_inventory", {
    JenisInventoryId: uuid("jenis_inventory_id").primaryKey().default(sql`gen_random_uuid()`),
    NamaJenisInventory: text("nama_jenis_inventory").notNull(),
})

export const JenisPupuk = pgTable("jenis_pupuk", {
    JenisPupukId: uuid("jenis_pupuk_id").primaryKey().default(sql`gen_random_uuid()`),
    NamaPupuk: text("nama_pupuk"),
    Deskripsi: text("deskripsi"),
})

export const JenisTransaksi = pgTable("jenis_transaksi", {
    JenisTransaksiId: uuid("jenis_transaksi_id").primaryKey().default(sql`gen_random_uuid()`),
    NamaJenisTransaksi: text("nama_jenis_transaksi"),
})

export const Kabupaten = pgTable("kabupaten", {
    KabupatenId: uuid("kabupaten_id").primaryKey().default(sql`gen_random_uuid()`),
    KodeKemendagri: text("kode_kemendagri"),
    NamaKabupaten: text("nama_kabupaten"),
    ProvinsiId: uuid("provinsi_id").references(() => Provinsi.ProvinsiId),
})

export const Kategori = pgTable("kategori", {
    KategoriId: uuid("kategori_id").primaryKey().default(sql`gen_random_uuid()`),
    KomoditasId: uuid("komoditas_id")
        .notNull()
        .references(() => Komoditas.KomoditasId),
    NamaKategori: text("nama_kategori").notNull(),
    Deskripsi: text("deskripsi"),
    Status: boolean("status").notNull(),
})

export const Kecamatan = pgTable("kecamatan", {
    KecamatanId: uuid("kecamatan_id").primaryKey().default(sql`gen_random_uuid()`),
    KodeKemendagri: text("kode_kemendagri"),
    NamaKecamatan: text("nama_kecamatan"),
    KabupatenId: uuid("kabupaten_id").references(() => Kabupaten.KabupatenId),
})

export const KegiatanPenyuluhan = pgTable("kegiatan_penyuluhan", {
    KegiatanPenyuluhanId: uuid("kegiatan_penyuluhan_id").primaryKey().default(sql`gen_random_uuid()`),
    PenyuluhId: uuid("penyuluh_id")
        .notNull()
        .references(() => Penyuluh.PenyuluhId),
    KelompokTaniId: uuid("kelompok_tani_id")
        .notNull()
        .references(() => KelompokTani.KelompokTaniId),
    Tanggal: timestamp("tanggal", {
        precision: 3,
        withTimezone: false,
    }).notNull(),
    WaktuMulai: timestamp("waktu_mulai", {
        precision: 3,
        withTimezone: false,
    }).notNull(),
    WaktuSelesai: timestamp("waktu_selesai", {
        precision: 3,
        withTimezone: false,
    }).notNull(),
    Lokasi: text("lokasi").notNull(),
    Topik: text("topik").notNull(),
    MetodePenyuluhanId: uuid("metode_penyuluhan_id")
        .notNull()
        .references(() => MetodePenyuluhan.MetodePenyuluhanId),
    JumlahPeserta: integer("jumlah_peserta").notNull(),
    Hasil: text("hasil"),
    TindakLanjut: text("tindak_lanjut"),
    CreatedAt: timestamp("created_at", {
        precision: 3,
        withTimezone: false,
    }).notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at", {
        precision: 3,
        withTimezone: false,
    }).notNull().$defaultFn(() => new Date()),
    StatusKegiatanPenyuluhanId: uuid("status_kegiatan_penyuluhan_id")
        .notNull()
        .references(() => StatusKegiatanPenyuluhan.StatusKegiatanPenyuluhanId),
})

export const KelompokTani = pgTable("kelompok_tani", {
    KelompokTaniId: uuid("kelompok_tani_id").primaryKey().default(sql`gen_random_uuid()`),
    NamaKelompok: text("nama_kelompok").notNull(),
    NamaKetuaKelompok: text("nama_ketua_kelompok").notNull(),
    LuasLahanKelompok: numeric("luas_lahan_kelompok", {
        precision: 65,
        scale: 30,
    }),
    JumlahAnggota: integer("jumlah_anggota").notNull().default(0),
    SatuanLuasLahan: text("satuan_luas_lahan").default("Ha"),
    TanggalBerdiri: timestamp("tanggal_berdiri", {
        precision: 3,
        withTimezone: false,
    }).notNull(),
    Deskripsi: text("deskripsi"),
    CreatedAt: timestamp("created_at", {
        precision: 3,
        withTimezone: false,
    }).notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at", {
        precision: 3,
        withTimezone: false,
    }).notNull().$defaultFn(() => new Date()),
    DeletedAt: timestamp("deleted_at", { precision: 3, withTimezone: false }),
})

export const KelompokTaniKomoditas = pgTable("kelompok_tani_komoditas", {
    KomoditasId: uuid("komoditas_id")
        .notNull()
        .references(() => Komoditas.KomoditasId),
    KelompokTaniId: uuid("kelompok_tani_id")
        .notNull()
        .references(() => KelompokTani.KelompokTaniId),
})

export const Keranjang = pgTable("keranjang", {
    KeranjangId: uuid("keranjang_id").primaryKey().default(sql`gen_random_uuid()`),
    PenyediaMaterialId: uuid("penyedia_material_id").references(() => PenyediaMaterial.PenyediaMaterialId),
    MemberId: uuid("member_id").references(() => Member.MemberId),
    RoleId: uuid("role_id").references(() => Role.RoleId),
    Jumlah: integer("jumlah").notNull(),
    CreatedAt: timestamp("created_at").notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at").notNull().$defaultFn(() => new Date()),
})

export const Komoditas = pgTable("komoditas", {
    KomoditasId: uuid("komoditas_id").primaryKey().default(sql`gen_random_uuid()`),
    SubsektorId: uuid("subsektor_id")
        .notNull()
        .references(() => Subsektor.SubsektorId),
    NamaKomoditas: text("nama_komoditas").notNull(),
    Deskripsi: text("deskripsi"),
    Status: boolean("status").notNull(),
})

export const Koordinat = pgTable("koordinat", {
    KoordinatId: uuid("koordinat_id").primaryKey().default(sql`gen_random_uuid()`),
    Lat: text("lat"),
    Lng: text("lng"),
    AlamatId: uuid("alamat_id").references(() => Alamat.AlamatId),
})

export const KreditUsahaRakyat = pgTable("kredit_usaha_rakyat", {
    KreditUsahaRakyatId: uuid("kredit_usaha_rakyat_id").primaryKey().default(sql`gen_random_uuid()`),
    KeperluanKur: text("keperluan_kur").notNull(),
    NamaPasangan: text("nama_pasangan").notNull(),
    Jumlah: numeric("jumlah", { precision: 65, scale: 30 }).notNull(),
    JangkaWaktu: integer("jangka_waktu").notNull(),
    Deskripsi: text("deskripsi"),
    ProdukKurId: uuid("produk_kur_id")
        .notNull()
        .references(() => ProdukKur.ProdukKurId),
    MemberId: uuid("member_id")
        .notNull()
        .references(() => Member.MemberId),
    LamaUsaha: text("lama_usaha"),
    CreatedAt: timestamp("created_at", {
        precision: 3,
        withTimezone: false,
    }).notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at", {
        precision: 3,
        withTimezone: false,
    }).notNull().$defaultFn(() => new Date()),
    RoleId: uuid("role_id").references(() => Role.RoleId),
})

export const Ktp = pgTable("ktp", {
    KtpId: uuid("ktp_id").primaryKey().default(sql`gen_random_uuid()`),
    Nik: text("nik").notNull(),
    Nama: text("nama").notNull(),
    Alamat: text("alamat").notNull(),
    JenisKelamin: JenisKelaminEnum("jenis_kelamin"),
    TempatLahir: text("tempat_lahir").notNull(),
    TanggalLahir: timestamp("tanggal_lahir", {
        precision: 3,
        withTimezone: false,
    }).notNull(),
    Verified: boolean("verified").notNull(),
    CreatedAt: timestamp("created_at", {
        precision: 3,
        withTimezone: false,
    }).notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at", {
        precision: 3,
        withTimezone: false,
    }).notNull().$defaultFn(() => new Date()),
    Pekerjaan: text("pekerjaan"),
})

export const KtpKonfirmasi = pgTable("ktp_konfirmasi", {
    KtpKonfirmasiId: uuid("ktp_konfirmasi_id").primaryKey().default(sql`gen_random_uuid()`),
    KtpId: uuid("ktp_id")
        .notNull()
        .references(() => Ktp.KtpId),
    Konfirmasi: boolean("konfirmasi"),
    Alasan: text("alasan"),
    CreatedAt: timestamp("created_at", { precision: 3, withTimezone: false }).$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at", { precision: 3, withTimezone: false }).$defaultFn(() => new Date()),
})

export const KurHistory = pgTable("kur_history", {
    KurHistoryId: uuid("kur_history_id").primaryKey().default(sql`gen_random_uuid()`),
    KreditUsahaRakyatId: uuid("kredit_usaha_rakyat_id")
        .notNull()
        .references(() => KreditUsahaRakyat.KreditUsahaRakyatId),
    StatusKurId: uuid("status_kur_id")
        .notNull()
        .references(() => StatusKur.StatusKurId),
    Deskripsi: text("deskripsi"),
    CreatedAt: timestamp("created_at", {
        precision: 3,
        withTimezone: false,
    }).notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at", {
        precision: 3,
        withTimezone: false,
    }).notNull().$defaultFn(() => new Date()),
})

export const LahanUsaha = pgTable("lahan_usaha", {
    LahanUsahaId: uuid("lahan_usaha_id").primaryKey().default(sql`gen_random_uuid()`),
    Luas: numeric("luas", { precision: 65, scale: 30 }).notNull(),
    SatuanLuas: text("satuan_luas").notNull().default("Ha"),
    AlamatId: uuid("alamat_id")
        .notNull()
        .references(() => Alamat.AlamatId),
    StatusKepemilikan: text("status_kepemilikan").notNull(),
})

export const Layanan = pgTable("layanan", {
    LayananId: uuid("layanan_id").primaryKey().default(sql`gen_random_uuid()`),
    NamaLayanan: text("nama_layanan"),
    Keterangan: text("keterangan"),
    Icon: text("icon"),
    Url: text("url"),
})

export const LimitTransaksi = pgTable("limit_transaksi", {
    LimitTransaksiId: uuid("limit_transaksi_id").primaryKey().default(sql`gen_random_uuid()`),
    LimitHarian: numeric("limit_harian", { precision: 65, scale: 30 }).default(
        "0"
    ),
    LimitBulanan: numeric("limit_bulanan", {
        precision: 65,
        scale: 30,
    }).default("0"),
    WalletId: uuid("wallet_id").references(() => Wallet.WalletId),
})

export const ManajemenInventory = pgTable("manajemen_inventory", {
    ManajemenInventoryId: uuid("manajemen_inventory_id").primaryKey().default(sql`gen_random_uuid()`),
    NomorDokumen: text("nomor_dokumen"),
    ReferensiDokumen: text("referensi_dokumen"),
    GudangIdAwal: uuid("gudang_id_awal")
        .notNull()
        .references(() => Gudang.GudangId),
    GudangIdAkhir: uuid("gudang_id_akhir")
        .notNull()
        .references(() => Gudang.GudangId),
    MaterialMasterId: uuid("material_master_id")
        .notNull()
        .references(() => MaterialMaster.MaterialMasterId),
    Jumlah: integer("jumlah").notNull(),
    Tanggal: timestamp("tanggal", {
        precision: 3,
        withTimezone: false,
    }).notNull(),
    SerialNumberId: uuid("serial_number_id")
        .notNull()
        .references(() => SerialNumber.SerialNumberId),
    JenisInventoryId: uuid("jenis_inventory_id").references(
        () => JenisInventory.JenisInventoryId
    ),
    CreatedAt: timestamp("created_at", {
        precision: 3,
        withTimezone: false,
    }).notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at", {
        precision: 3,
        withTimezone: false,
    }).notNull().$defaultFn(() => new Date()),
})

export const MasaTanam = pgTable("masa_tanam", {
    MasaTanamId: uuid("masa_tanam_id").primaryKey().default(sql`gen_random_uuid()`),
    Nama: integer("nama").notNull(),
})

export const MasterPenyedia = pgTable("master_penyedia", {
    MasterPenyediaId: uuid("master_penyedia_id").primaryKey().default(sql`gen_random_uuid()`),
    PenyediaLevelId: uuid("penyedia_level_id")
        .notNull()
        .references(() => PenyediaLevel.PenyediaLevelId),
    KodeUsaha: text("kode_usaha"),
    NamaPenyedia: text("nama_penyedia").notNull(),
    AlamatWeb: text("alamat_web"),
    NoKontak: text("no_kontak"),
    EmailPenyedia: text("email_penyedia"),
    Icon: text("icon").notNull(),
    Status: boolean("status").notNull(),
    VerifikasiAdmin: boolean("verifikasi_admin").notNull(),
    CreatedAt: timestamp("created_at", {
        precision: 3,
        withTimezone: false,
    }).notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at", {
        precision: 3,
        withTimezone: false,
    }).notNull().$defaultFn(() => new Date()),
    DeletedAt: timestamp("deleted_at", { precision: 3, withTimezone: false }),
    MemberId: uuid("member_id").references(() => Member.MemberId),
})

export const MasterPenyediaRekeningBank = pgTable(
    "master_penyedia_rekening_bank",
    {
        MasterPenyediaId: uuid("master_penyedia_id")
            .notNull()
            .references(() => MasterPenyedia.MasterPenyediaId),
        RekeningBankId: uuid("rekening_bank_id")
            .notNull()
            .references(() => RekeningBank.RekeningBankId),
    }
)

export const MasterPenyediaWallet = pgTable("master_penyedia_wallet", {
    MasterPenyediaId: uuid("master_penyedia_id")
        .notNull()
        .references(() => MasterPenyedia.MasterPenyediaId),
    WalletId: uuid("wallet_id")
        .notNull()
        .references(() => Wallet.WalletId),
})

export const MataUang = pgTable("mata_uang", {
    MataUangId: uuid("mata_uang_id").primaryKey().default(sql`gen_random_uuid()`),
    NamaMataUang: text("nama_mata_uang"),
})

export const MateriKegiatan = pgTable("materi_kegiatan", {
    MateriKegiatanId: uuid("materi_kegiatan_id").primaryKey().default(sql`gen_random_uuid()`),
    NamaFile: text("nama_file").notNull(),
    KegiatanPenyuluhanId: uuid("kegiatan_penyuluhan_id")
        .notNull()
        .references(() => KegiatanPenyuluhan.KegiatanPenyuluhanId),
})

export const MaterialMaster = pgTable("material_master", {
    MaterialMasterId: uuid("material_master_id").primaryKey().default(sql`gen_random_uuid()`),
    ChildKategoriId: uuid("child_kategori_id")
        .notNull()
        .references(() => ChildKategori.ChildKategoriId),
    KodeMaterial: text("kode_material").notNull(),
    NamaMaterial: text("nama_material").notNull(),
    Deskripsi: text("deskripsi"),
    UnitOfMeasure: text("unit_of_measure").notNull(),
    HargaStandar: numeric("harga_standar", {
        precision: 65,
        scale: 30,
    }).notNull(),
    MinimumStok: integer("minimum_stok").default(0),
    MaksimumStok: integer("maksimum_stok").default(0),
    LeadTime: integer("lead_time").default(0),
    GambarUrl: text("gambar_url"),
    Status: boolean("status").notNull(),
    CreatedAt: timestamp("created_at", {
        precision: 3,
        withTimezone: false,
    }).notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at", {
        precision: 3,
        withTimezone: false,
    }).notNull().$defaultFn(() => new Date()),
    Subsidi: boolean("subsidi").notNull().default(false),
})

export const MaterialStok = pgTable("material_stok", {
    MaterialStokId: uuid("material_stok_id").primaryKey().default(sql`gen_random_uuid()`),
    GudangId: uuid("gudang_id")
        .notNull()
        .references(() => Gudang.GudangId),
    MaterialMasterId: uuid("material_master_id")
        .notNull()
        .references(() => MaterialMaster.MaterialMasterId),
    JumlahStok: integer("jumlah_stok").notNull(),
    CreatedAt: timestamp("created_at", {
        precision: 3,
        withTimezone: false,
    }).notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at", {
        precision: 3,
        withTimezone: false,
    }).notNull().$defaultFn(() => new Date()),
})

export const Member = pgTable("member", {
    MemberId: uuid("member_id").primaryKey().default(sql`gen_random_uuid()`),
    KtpId: uuid("ktp_id").references(() => Ktp.KtpId),
    StatusMemberId: uuid("status_member_id").references(
        () => StatusMember.StatusMemberId
    ),
    Email: text("email"),
    NomorHp: text("nomor_hp"),
    NomorWa: text("nomor_wa"),
    Avatar: text("avatar").default("default.png"),
    CreatedAt: timestamp("created_at", { withTimezone: true }).$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at", { withTimezone: true }).$defaultFn(() => new Date()),
    DeletedAt: timestamp("deleted_at", { withTimezone: true }),
})

export const MetodePenyuluhan = pgTable("metode_penyuluhan", {
    MetodePenyuluhanId: uuid("metode_penyuluhan_id").primaryKey().default(sql`gen_random_uuid()`),
    Metode: text("metode").notNull(),
})

export const NotifikasiGrup = pgTable("notifikasi_grup", {
    NotifikasiGrupId: uuid("notifikasi_grup_id").primaryKey().default(sql`gen_random_uuid()`),
    NamaNotifikasiGrup: text("nama_notifikasi_grup").notNull(),
    Deskripsi: text("deskripsi"),
})

export const Notifikasi = pgTable("notifikasi", {
    NotifikasiId: uuid("notifikasi_id").primaryKey().default(sql`gen_random_uuid()`),
    NotifikasiGrupId: uuid("notifikasi_grup_id")
        .notNull()
        .references(() => NotifikasiGrup.NotifikasiGrupId),
    MemberId: uuid("member_id")
        .notNull()
        .references(() => Member.MemberId),
    JenisLayanan: text("jenis_layanan").notNull(),
    Judul: text("judul").notNull(),
    Pesan: text("pesan").notNull(),
    WaktuKirim: timestamp("waktu_kirim", { withTimezone: true }).notNull(),
    StatusNotifikasi: StatusNotifikasiEnum("status_notifikasi"),
    Prioritas: PrioritasNotifikasiEnum("prioritas"),
    DataTambahan: text("data_tambahan"),
    LinkAksi: text("link_aksi"),
    CreatedAt: timestamp("created_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
    DeletedAt: timestamp("deleted_at", { withTimezone: true }),
})

export const Order = pgTable("order", {
    OrderId: uuid("order_id").primaryKey().default(sql`gen_random_uuid()`),
    MemberId: uuid("member_id")
        .notNull()
        .references(() => Member.MemberId),
    KodeInvoice: text("kode_invoice").notNull(),
    GrandTotal: text("grand_total").notNull().default("0"),
    TotalBiayaKirim: text("total_biaya_kirim").notNull().default("0"),
    TotalBiayaTambahan: text("total_biaya_tambahan").notNull().default("0"),
    TotalKupon: text("total_kupon").notNull().default("0"),
    Deskripsi: text("deskripsi"),
    CreatedAt: timestamp("created_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
    RoleId: uuid("role_id").references(() => Role.RoleId),
})

export const OrderBiayaTambahan = pgTable("order_biaya_tambahan", {
    OrderBiayaTambahanId: uuid("order_biaya_tambahan_id").primaryKey().default(sql`gen_random_uuid()`),
    OrderId: uuid("order_id")
        .notNull()
        .references(() => Order.OrderId),
    NamaBiaya: text("nama_biaya").notNull(),
    JenisBiaya: JenisBiayaEnum("jenis_biaya"),
    Nominal: text("nominal").notNull(),
})

export const OrderMaterialMaterial = pgTable("order_material_material", {
    OrderMaterialMasterId: uuid("order_material_master_id").primaryKey().default(sql`gen_random_uuid()`),
    Jumlah: integer("jumlah").notNull(),
    Harga: text("harga").notNull(),
    Catatan: text("catatan"),
    PenyediaMaterialId: uuid("penyedia_material_id")
        .notNull()
        .references(() => PenyediaMaterial.PenyediaMaterialId),
    CreatedAt: timestamp("created_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
    OrderId: uuid("order_id")
        .notNull()
        .references(() => Order.OrderId),
})

export const OrderPembayaran = pgTable("order_pembayaran", {
    OrderPembayaranId: uuid("order_pembayaran_id").primaryKey().default(sql`gen_random_uuid()`),
    Status: boolean("status").notNull(),
    MetodePembayaran: text("metode_pembayaran").notNull(),
    Deskripsi: text("deskripsi"),
    CreatedAt: timestamp("created_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
    OrderId: uuid("order_id")
        .notNull()
        .references(() => Order.OrderId),
})

export const OrderPengiriman = pgTable("order_pengiriman", {
    OrderPengirimanId: uuid("order_pengiriman_id").primaryKey().default(sql`gen_random_uuid()`),
    NoResi: text("no_resi"),
    Kurir: text("kurir"),
    BiayaKirim: text("biaya_kirim").notNull(),
    AlamatId: uuid("alamat_id")
        .notNull()
        .references(() => Alamat.AlamatId),
    OrderId: uuid("order_id")
        .notNull()
        .references(() => Order.OrderId),
})

export const OrderPengirimanDetail = pgTable("order_pengiriman_detail", {
    OrderPengirimanDetailId: uuid("order_pengiriman_detail_id").primaryKey().default(sql`gen_random_uuid()`),
    Tanggal: timestamp("tanggal", { withTimezone: true }).notNull(),
    Judul: text("judul").notNull(),
    Pesan: text("pesan").notNull(),
    OrderPengirimanId: uuid("order_pengiriman_id")
        .notNull()
        .references(() => OrderPengiriman.OrderPengirimanId),
})

export const OrderStatus = pgTable("order_status", {
    OrderStatusId: uuid("order_status_id").primaryKey().default(sql`gen_random_uuid()`),
    NamaStatus: text("nama_status").notNull(),
    Deskripsi: text("deskripsi"),
    CreatedAt: timestamp("created_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
})

export const OrderStatusPivot = pgTable("order_status_pivot", {
    OrderStatusPivotId: uuid("order_status_pivot_id").primaryKey().default(sql`gen_random_uuid()`),
    OrderStatusId: uuid("order_status_id")
        .notNull()
        .references(() => OrderStatus.OrderStatusId),
    OrderId: uuid("order_id")
        .notNull()
        .references(() => Order.OrderId),
    CreatedAt: timestamp("created_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
})

export const PenyediaLevel = pgTable("penyedia_level", {
    PenyediaLevelId: uuid("penyedia_level_id").primaryKey().default(sql`gen_random_uuid()`),
    NamaPenyediaLevel: text("nama_penyedia_level").notNull(),
    Status: boolean("status"),
    CreatedAt: timestamp("created_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
    DeletedAt: timestamp("deleted_at", { withTimezone: true }),
    Deskripsi: text("deskripsi"),
})

export const PenyediaMaterial = pgTable("penyedia_material", {
    PenyediaMaterialId: uuid("penyedia_material_id").primaryKey().default(sql`gen_random_uuid()`),
    MaterialMasterId: uuid("material_master_id")
        .notNull()
        .references(() => MaterialMaster.MaterialMasterId),
    MasterPenyediaId: uuid("master_penyedia_id")
        .notNull()
        .references(() => MasterPenyedia.MasterPenyediaId),
    CreatedAt: timestamp("created_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
})

export const PenyediaMaterialHarga = pgTable("penyedia_material_harga", {
    PenyediaMaterialHargaId: uuid("penyedia_material_harga_id").primaryKey().default(sql`gen_random_uuid()`),
    PenyediaMaterialId: uuid("penyedia_material_id")
        .notNull()
        .references(() => PenyediaMaterial.PenyediaMaterialId),
    Harga: text("harga").notNull(),
    CreatedAt: timestamp("created_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
})

export const PenyediaMaterialRiwayatHarga = pgTable(
    "penyedia_material_riwayat_harga",
    {
        PenyediaMaterialRiwayatHargaId: uuid(
            "penyedia_material_riwayat_harga_id"
        ).primaryKey(),
        PenyediaMaterialHargaId: uuid("penyedia_material_harga_id")
            .notNull()
            .references(() => PenyediaMaterialHarga.PenyediaMaterialHargaId),
        Harga: text("harga").notNull(),
        CreatedAt: timestamp("created_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
        UpdatedAt: timestamp("updated_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
    }
)

export const Penyuluh = pgTable("penyuluh", {
    PenyuluhId: uuid("penyuluh_id").primaryKey().default(sql`gen_random_uuid()`),
    MemberId: uuid("member_id")
        .notNull()
        .references(() => Member.MemberId),
    Nip: text("nip"),
    Jabatan: text("jabatan"),
    PendidikanTerakhir: text("pendidikan_terakhir"),
    BidangKeahlian: text("bidang_keahlian").notNull(),
    TahunBertugas: text("tahun_bertugas").notNull(),
    Status: boolean("status").notNull(),
    BppId: uuid("bpp_id")
        .notNull()
        .references(() => Bpp.BppId),
    CreatedAt: timestamp("created_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
})

export const Petani = pgTable("petani", {
    PetaniId: uuid("petani_id").primaryKey().default(sql`gen_random_uuid()`),
    MemberId: uuid("member_id")
        .notNull()
        .references(() => Member.MemberId),
    NomorKartuTani: text("nomor_kartu_tani"),
    JenisPetani: JenisPetaniEnum("jenis_petani"),
    StatusPetani: StatusPetaniEnum("status_petani"),
    CreatedAt: timestamp("created_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
})

export const PetaniKelompokTani = pgTable("petani_kelompok_tani", {
    KelompokTaniId: uuid("kelompok_tani_id")
        .notNull()
        .references(() => KelompokTani.KelompokTaniId),
    PetaniId: uuid("petani_id")
        .notNull()
        .references(() => Petani.PetaniId),
    TanggalMasuk: timestamp("tanggal_masuk", { withTimezone: true }).notNull(),
    Ketua: boolean("ketua").notNull().default(false),
})

export const ProdukKur = pgTable("produk_kur", {
    ProdukKurId: uuid("produk_kur_id").primaryKey().default(sql`gen_random_uuid()`),
    NamaProduk: text("nama_produk").notNull(),
    BankId: uuid("bank_id").references(() => Bank.BankId),
    Deskripsi: text("deskripsi"),
    Tujuan: text("tujuan"),
    Sasaran: text("sasaran"),
    Kontak: text("kontak"),
    AlamatWeb: text("alamat_web"),
    CreatedAt: timestamp("created_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
})

export const Provinsi = pgTable("provinsi", {
    ProvinsiId: uuid("provinsi_id").primaryKey().default(sql`gen_random_uuid()`),
    KodeKemendagri: text("kode_kemendagri"),
    NamaProvinsi: text("nama_provinsi").notNull(),
})

export const RekeningBank = pgTable("rekening_bank", {
    RekeningBankId: uuid("rekening_bank_id").primaryKey().default(sql`gen_random_uuid()`),
    NomorRekening: text("nomor_rekening").notNull(),
    NamaPemilik: text("nama_pemilik").notNull(),
    Cabang: text("cabang"),
    CreatedAt: timestamp("created_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
    BankId: uuid("bank_id").references(() => Bank.BankId),
    MataUangId: uuid("mata_uang_id").references(() => MataUang.MataUangId),
    MemberId: uuid("member_id").references(() => Member.MemberId),
    DeletedAt: timestamp("deleted_at", { withTimezone: true }),
})

export const RencanaUsahaTani = pgTable("rencana_usaha_tani", {
    RencanaUsahaTaniId: uuid("rencana_usaha_tani_id").primaryKey().default(sql`gen_random_uuid()`),
    Tahun: text("tahun").notNull(),
    MasaTanamId: uuid("masa_tanam_id")
        .notNull()
        .references(() => MasaTanam.MasaTanamId),
    TotalPerkiraanBiaya: text("total_perkiraan_biaya").notNull(),
    TotalPerkiraanPendapatan: text("total_perkiraan_pendapatan").notNull(),
    WaktuTanam: timestamp("waktu_tanam", { withTimezone: true }).notNull(),
    CreatedAt: timestamp("created_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at", { withTimezone: true }).notNull().$defaultFn(() => new Date()),
    PetaniId: uuid("petani_id")
        .notNull()
        .references(() => Petani.PetaniId),
})

export const RencanaUsahaTaniKomoditas = pgTable(
    "rencana_usaha_tani_komoditas",
    {
        KomoditasId: uuid("komoditas_id")
            .notNull()
            .references(() => Komoditas.KomoditasId),
        RencanaUsahaTaniId: uuid("rencana_usaha_tani_id")
            .notNull()
            .references(() => RencanaUsahaTani.RencanaUsahaTaniId),
    }
)

export const Role = pgTable("role", {
    RoleId: uuid("role_id").primaryKey().default(sql`gen_random_uuid()`),
    NamaRole: text("nama_role").notNull(),
    Keterangan: text("keterangan"),
    Aktif: boolean("aktif"),
    StatusRole: StatusRoleEnum("status_role"),
})

export const RoleLayanan = pgTable(
    "role_layanan",
    {
        RoleId: uuid("role_id")
            .notNull()
            .references(() => Role.RoleId),
        LayananId: uuid("layanan_id")
            .notNull()
            .references(() => Layanan.LayananId),
    },
    (table) => ({
        PrimaryKey: primaryKey(table.RoleId, table.LayananId),
    })
)

export const RoleMember = pgTable(
    "role_member",
    {
        RoleId: uuid("role_id")
            .notNull()
            .references(() => Role.RoleId),
        MemberId: uuid("member_id")
            .notNull()
            .references(() => Member.MemberId),
        Confirm: boolean("confirm").notNull().default(false),
    },
    (table) => ({
        PrimaryKey: primaryKey(table.RoleId, table.MemberId),
    })
)

export const Sektor = pgTable("sektor", {
    SektorId: uuid("sektor_id").primaryKey().default(sql`gen_random_uuid()`),
    NamaSektor: text("nama_sektor").notNull(),
    Deskripsi: text("deskripsi"),
    Status: boolean("status").notNull(),
})

export const SerialNumber = pgTable("serial_number", {
    SerialNumberId: uuid("serial_number_id").primaryKey().default(sql`gen_random_uuid()`),
    SerialNumber: text("serial_number").notNull(),
    CreatedAt: timestamp("created_at").notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at").notNull().$defaultFn(() => new Date()),
    MaterialMasterId: uuid("material_master_id")
        .notNull()
        .references(() => MaterialMaster.MaterialMasterId),
})

export const StatusKegiatanPenyuluhan = pgTable("status_kegiatan_penyuluhan", {
    StatusKegiatanPenyuluhanId: uuid(
        "status_kegiatan_penyuluhan_id"
    ).primaryKey(),
    NamaStatus: text("nama_status").notNull(),
})

export const StatusKur = pgTable("status_kur", {
    StatusKurId: uuid("status_kur_id").primaryKey().default(sql`gen_random_uuid()`),
    NamaStatus: text("nama_status").notNull(),
    Deskripsi: text("deskripsi"),
    Aktif: boolean("aktif").notNull(),
})

export const StatusMember = pgTable("status_member", {
    StatusMemberId: uuid("status_member_id").primaryKey().default(sql`gen_random_uuid()`),
    NamaStatus: text("nama_status"),
})

export const StatusWallet = pgTable("status_wallet", {
    StatusWalletId: uuid("status_wallet_id").primaryKey().default(sql`gen_random_uuid()`),
    NamaStatusWallet: text("nama_status_wallet"),
})

export const SubKategori = pgTable("sub_kategori", {
    SubKategoriId: uuid("sub_kategori_id").primaryKey().default(sql`gen_random_uuid()`),
    KategoriId: uuid("kategori_id")
        .notNull()
        .references(() => Kategori.KategoriId),
    NamaSubkategori: text("nama_subkategori").notNull(),
    Deskripsi: text("deskripsi"),
    Status: boolean("status").notNull(),
})

export const SubLayanan = pgTable("sub_layanan", {
    SubLayananId: uuid("sub_layanan_id").primaryKey().default(sql`gen_random_uuid()`),
    NamaSubLayanan: text("nama_sub_layanan"),
    Keterangan: text("keterangan"),
    Icon: text("icon"),
    Url: text("url"),
    LayananId: uuid("layanan_id").references(() => Layanan.LayananId),
})

export const Subsektor = pgTable("subsektor", {
    SubsektorId: uuid("subsektor_id").primaryKey().default(sql`gen_random_uuid()`),
    SektorId: uuid("sektor_id").references(() => Sektor.SektorId),
    NamaSubsektor: text("nama_subsektor"),
    Deskripsi: text("deskripsi"),
    Status: boolean("status"),
})

export const Transaksi = pgTable("transaksi", {
    TransaksiId: uuid("transaksi_id").primaryKey().default(sql`gen_random_uuid()`),
    WalletId: uuid("wallet_id").references(() => Wallet.WalletId),
    JenisTransaksiId: uuid("jenis_transaksi_id").references(
        () => JenisTransaksi.JenisTransaksiId
    ),
    Jumlah: numeric("jumlah"),
    SaldoSebelum: numeric("saldo_sebelum"),
    SaldoSesudah: numeric("saldo_sesudah"),
    WaktuTransaksi: timestamp("waktu_transaksi"),
    Keterangan: text("keterangan"),
})

export const Userlogin = pgTable("userlogin", {
    UserloginId: uuid("userlogin_id").primaryKey().default(sql`gen_random_uuid()`),
    MemberId: uuid("member_id").references(() => Member.MemberId),
    Provider: ProviderEnum("provider"),
    ProviderAccountId: text("provider_account_id"),
    Username: text("username"),
    Password: text("password"),
    AccessToken: text("access_token"),
    RefreshToken: text("refresh_token"),
    LastLogin: timestamp("last_login"),
})

export const Wallet = pgTable("wallet", {
    WalletId: uuid("wallet_id").primaryKey().default(sql`gen_random_uuid()`),
    Saldo: numeric("saldo").notNull().default('0'),
    StatusWalletId: uuid("status_wallet_id").references(
        () => StatusWallet.StatusWalletId
    ),
    CreatedAt: timestamp("created_at").$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
    MemberId: uuid("member_id").references(() => Member.MemberId),
})

export const Whitelist = pgTable("whitelist", {
    WhitelistId: uuid("whitelist_id").primaryKey().default(sql`gen_random_uuid()`),
    PenyediaMaterialId: uuid("penyedia_material_id")
        .notNull()
        .references(() => PenyediaMaterial.PenyediaMaterialId),
    MemberId: uuid("member_id")
        .notNull()
        .references(() => Member.MemberId),
    CreatedAt: timestamp("created_at").notNull().$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at").notNull().$defaultFn(() => new Date()),
    RoleId: uuid("role_id")
        .notNull()
        .references(() => Role.RoleId),
})

export const Withdraw = pgTable("withdraw", {
    WithdrawId: uuid("withdraw_id").primaryKey().default(sql`gen_random_uuid()`),
    TransaksiId: uuid("transaksi_id").references(() => Transaksi.TransaksiId),
    WalletId: uuid("wallet_id").references(() => Wallet.WalletId),
    StatusPencairan: StatusPencairanEnum("StatusPencairan"),
    CreatedAt: timestamp("created_at").$defaultFn(() => new Date()),
    UpdatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
    RekeningBankId: uuid("rekening_bank_id").references(
        () => RekeningBank.RekeningBankId
    ),
})
