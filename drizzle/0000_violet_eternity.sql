CREATE TABLE "alamat" (
	"alamat_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_alamat" text,
	"desa_id" uuid,
	"urutan" integer,
	"alamat" text,
	"created_at" timestamp,
	"updated_at" timestamp,
	"kode_pos" text,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "alamat_bpp" (
	"alamat_id" uuid,
	"bpp_id" uuid
);
--> statement-breakpoint
CREATE TABLE "alamat_gudang" (
	"gudang_id" uuid,
	"alamat_id" uuid
);
--> statement-breakpoint
CREATE TABLE "alamat_kelompok_tani" (
	"alamat_id" uuid,
	"kelompok_tani_id" uuid
);
--> statement-breakpoint
CREATE TABLE "alamat_member" (
	"member_id" uuid,
	"alamat_id" uuid
);
--> statement-breakpoint
CREATE TABLE "alamat_penyedia" (
	"alamat_id" uuid,
	"master_penyedia_id" uuid
);
--> statement-breakpoint
CREATE TABLE "bank" (
	"bank_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"kode_bank" text,
	"nama_bank" text,
	"icon" text
);
--> statement-breakpoint
CREATE TABLE "biaya_saprotan_pupuk" (
	"biaya_saprotan_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"jenis_pupuk_id" uuid,
	"rencana_usaha_tani_id" uuid,
	"jumlah" numeric,
	"satuan_jumlah" text,
	"harga" numeric,
	"deskripsi" text
);
--> statement-breakpoint
CREATE TABLE "biaya_usaha_tani" (
	"biaya_usaha_tani_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_biaya" text,
	"jumlah" numeric,
	"satuan_jumlah" text,
	"harga" numeric,
	"keterangan" text,
	"rencana_usaha_tani_id" uuid
);
--> statement-breakpoint
CREATE TABLE "bpp" (
	"bpp_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_bpp" text,
	"wilayah_kerja" text,
	"created_at" timestamp,
	"updated_at" timestamp,
	"kode_bpp" text,
	"tanggal_berdiri" timestamp,
	"nomor_hp" text,
	"deskripsi" text
);
--> statement-breakpoint
CREATE TABLE "child_kategori" (
	"child_kategori_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sub_kategori_id" uuid NOT NULL,
	"nama_child_kategori" text NOT NULL,
	"deskripsi" text,
	"status" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "child_layanan" (
	"child_layanan_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_child_layanan" text,
	"keterangan" text,
	"icon" text,
	"url" text,
	"sub_layanan_id" uuid
);
--> statement-breakpoint
CREATE TABLE "deposit" (
	"deposit_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"transaksi_id" uuid NOT NULL,
	"wallet_id" uuid NOT NULL,
	"metode_deposit" "metode_deposit" NOT NULL,
	"bukti_transfer" text NOT NULL,
	"status_verifikasi" "status_verifikasi_deposit" NOT NULL,
	"created_at" timestamp (3) NOT NULL,
	"updated_at" timestamp (3) NOT NULL,
	"rekening_bank_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "desa" (
	"desa_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"kode_kemendagri" text,
	"nama_desa" text,
	"kecamatan_id" uuid
);
--> statement-breakpoint
CREATE TABLE "dimensi_material_master" (
	"dimensi_material_master_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"material_master_id" uuid NOT NULL,
	"panjang" numeric NOT NULL,
	"lebar" numeric NOT NULL,
	"tinggi" numeric NOT NULL,
	"satuan_dimensi" text DEFAULT 'cm' NOT NULL,
	"berat_kotor" numeric DEFAULT '0' NOT NULL,
	"berat_bersih" numeric DEFAULT '0' NOT NULL,
	"satun_berat" text DEFAULT 'gram' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ealokasi" (
	"ealokasi_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"penyuluh_id" uuid NOT NULL,
	"komoditas_id" uuid NOT NULL,
	"kelompok_tani_id" uuid NOT NULL,
	"master_penyedia_id" uuid NOT NULL,
	"masa_tanam_id" uuid NOT NULL,
	"petani_id" uuid NOT NULL,
	"luas_lahan" numeric,
	"tahun" text
);
--> statement-breakpoint
CREATE TABLE "ealokasi_pupuk_subsidi" (
	"ealokasi_pupuk_subsidi_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"jenis_pupuk_id" uuid NOT NULL,
	"jumlah" numeric NOT NULL,
	"ealokasi_id" uuid NOT NULL,
	"jumlah_ditebus" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ealokasi_pupuk_subsidi_transaksi" (
	"ealokasi_pupuk_subsidi_id" uuid NOT NULL,
	"order_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "faq_produk_kur" (
	"faq_produk_kur_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question" text,
	"answer" text,
	"produk_kur_id" uuid
);
--> statement-breakpoint
CREATE TABLE "file_kur" (
	"file_kur_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_file" text NOT NULL,
	"nama_dokumen" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"kredit_usaha_rakyat_id" uuid NOT NULL,
	"file_kur_syarat_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "file_kur_syarat" (
	"file_kur_syarat_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_file_syarat" text NOT NULL,
	"deskripsi" text NOT NULL,
	"verified" boolean NOT NULL,
	"status_bank" boolean NOT NULL,
	"catatan" text,
	"produk_kur_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gudang" (
	"gudang_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_gudang" text NOT NULL,
	"kapasitas" integer NOT NULL,
	"status" boolean NOT NULL,
	"member_id" uuid,
	"jenis_gudang" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hasil_panen" (
	"hasil_panen_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_hasil" text NOT NULL,
	"pendapatan_kotor" numeric NOT NULL,
	"jumlah" numeric NOT NULL,
	"satuan_jumlah" text NOT NULL,
	"rencana_usaha_tani_id" uuid NOT NULL,
	"deskripsi" text
);
--> statement-breakpoint
CREATE TABLE "jenis_inventory" (
	"jenis_inventory_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_jenis_inventory" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jenis_pupuk" (
	"jenis_pupuk_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_pupuk" text,
	"deskripsi" text
);
--> statement-breakpoint
CREATE TABLE "jenis_transaksi" (
	"jenis_transaksi_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_jenis_transaksi" text
);
--> statement-breakpoint
CREATE TABLE "kabupaten" (
	"kabupaten_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"kode_kemendagri" text,
	"nama_kabupaten" text,
	"provinsi_id" uuid
);
--> statement-breakpoint
CREATE TABLE "kategori" (
	"kategori_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"komoditas_id" uuid NOT NULL,
	"nama_kategori" text NOT NULL,
	"deskripsi" text,
	"status" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "kecamatan" (
	"kecamatan_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"kode_kemendagri" text,
	"nama_kecamatan" text,
	"kabupaten_id" uuid
);
--> statement-breakpoint
CREATE TABLE "kegiatan_penyuluhan" (
	"kegiatan_penyuluhan_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"penyuluh_id" uuid NOT NULL,
	"kelompok_tani_id" uuid NOT NULL,
	"tanggal" timestamp (3) NOT NULL,
	"waktu_mulai" timestamp (3) NOT NULL,
	"waktu_selesai" timestamp (3) NOT NULL,
	"lokasi" text NOT NULL,
	"topik" text NOT NULL,
	"metode_penyuluhan_id" uuid NOT NULL,
	"jumlah_peserta" integer NOT NULL,
	"hasil" text,
	"tindak_lanjut" text,
	"created_at" timestamp (3) NOT NULL,
	"updated_at" timestamp (3) NOT NULL,
	"status_kegiatan_penyuluhan_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "kelompok_tani" (
	"kelompok_tani_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_kelompok" text NOT NULL,
	"nama_ketua_kelompok" text NOT NULL,
	"luas_lahan_kelompok" numeric(65, 30),
	"jumlah_anggota" integer DEFAULT 0 NOT NULL,
	"satuan_luas_lahan" text DEFAULT 'Ha',
	"tanggal_berdiri" timestamp (3) NOT NULL,
	"deskripsi" text,
	"created_at" timestamp (3) NOT NULL,
	"updated_at" timestamp (3) NOT NULL,
	"deleted_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE "kelompok_tani_komoditas" (
	"komoditas_id" uuid NOT NULL,
	"kelompok_tani_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "komoditas" (
	"komoditas_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"subsektor_id" uuid NOT NULL,
	"nama_komoditas" text NOT NULL,
	"deskripsi" text,
	"status" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "koordinat" (
	"koordinat_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lat" text,
	"lng" text,
	"alamat_id" uuid
);
--> statement-breakpoint
CREATE TABLE "kredit_usaha_rakyat" (
	"kredit_usaha_rakyat_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"keperluan_kur" text NOT NULL,
	"nama_pasangan" text NOT NULL,
	"jumlah" numeric(65, 30) NOT NULL,
	"jangka_waktu" integer NOT NULL,
	"deskripsi" text,
	"produk_kur_id" uuid NOT NULL,
	"member_id" uuid NOT NULL,
	"lama_usaha" text,
	"created_at" timestamp (3) NOT NULL,
	"updated_at" timestamp (3) NOT NULL,
	"role_id" uuid
);
--> statement-breakpoint
CREATE TABLE "ktp" (
	"ktp_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nik" text NOT NULL,
	"nama" text NOT NULL,
	"alamat" text NOT NULL,
	"jenis_kelamin" "jenis_kelamin",
	"tempat_lahir" text NOT NULL,
	"tanggal_lahir" timestamp (3) NOT NULL,
	"verified" boolean NOT NULL,
	"created_at" timestamp (3) NOT NULL,
	"updated_at" timestamp (3) NOT NULL,
	"pekerjaan" text
);
--> statement-breakpoint
CREATE TABLE "ktp_konfirmasi" (
	"ktp_konfirmasi_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ktp_id" uuid NOT NULL,
	"konfirmasi" boolean,
	"alasan" text,
	"created_at" timestamp (3),
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE "kur_history" (
	"kur_history_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"kredit_usaha_rakyat_id" uuid NOT NULL,
	"status_kur_id" uuid NOT NULL,
	"deskripsi" text,
	"created_at" timestamp (3) NOT NULL,
	"updated_at" timestamp (3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lahan_usaha" (
	"lahan_usaha_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"luas" numeric(65, 30) NOT NULL,
	"satuan_luas" text DEFAULT 'Ha' NOT NULL,
	"alamat_id" uuid NOT NULL,
	"status_kepemilikan" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "layanan" (
	"layanan_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_layanan" text,
	"keterangan" text,
	"icon" text,
	"url" text
);
--> statement-breakpoint
CREATE TABLE "limit_transaksi" (
	"limit_transaksi_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"limit_harian" numeric(65, 30) DEFAULT '0',
	"limit_bulanan" numeric(65, 30) DEFAULT '0',
	"wallet_id" uuid
);
--> statement-breakpoint
CREATE TABLE "manajemen_inventory" (
	"manajemen_inventory_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nomor_dokumen" text,
	"referensi_dokumen" text,
	"gudang_id_awal" uuid NOT NULL,
	"gudang_id_akhir" uuid NOT NULL,
	"material_master_id" uuid NOT NULL,
	"jumlah" integer NOT NULL,
	"tanggal" timestamp (3) NOT NULL,
	"serial_number_id" uuid NOT NULL,
	"jenis_inventory_id" uuid,
	"created_at" timestamp (3) NOT NULL,
	"updated_at" timestamp (3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "masa_tanam" (
	"masa_tanam_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "master_penyedia" (
	"master_penyedia_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"penyedia_level_id" uuid NOT NULL,
	"kode_usaha" text,
	"nama_penyedia" text NOT NULL,
	"alamat_web" text,
	"no_kontak" text,
	"email_penyedia" text,
	"icon" text NOT NULL,
	"status" boolean NOT NULL,
	"verifikasi_admin" boolean NOT NULL,
	"created_at" timestamp (3) NOT NULL,
	"updated_at" timestamp (3) NOT NULL,
	"deleted_at" timestamp (3),
	"member_id" uuid
);
--> statement-breakpoint
CREATE TABLE "master_penyedia_rekening_bank" (
	"master_penyedia_id" uuid NOT NULL,
	"rekening_bank_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "master_penyedia_wallet" (
	"master_penyedia_id" uuid NOT NULL,
	"wallet_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mata_uang" (
	"mata_uang_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_mata_uang" text
);
--> statement-breakpoint
CREATE TABLE "materi_kegiatan" (
	"materi_kegiatan_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_file" text NOT NULL,
	"kegiatan_penyuluhan_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "material_master" (
	"material_master_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"child_kategori_id" uuid NOT NULL,
	"kode_material" text NOT NULL,
	"nama_material" text NOT NULL,
	"deskripsi" text,
	"unit_of_measure" text NOT NULL,
	"harga_standar" numeric(65, 30) NOT NULL,
	"minimum_stok" integer DEFAULT 0,
	"maksimum_stok" integer DEFAULT 0,
	"lead_time" integer DEFAULT 0,
	"gambar_url" text,
	"status" boolean NOT NULL,
	"created_at" timestamp (3) NOT NULL,
	"updated_at" timestamp (3) NOT NULL,
	"subsidi" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "material_stok" (
	"material_stok_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"gudang_id" uuid NOT NULL,
	"material_master_id" uuid NOT NULL,
	"jumlah_stok" integer NOT NULL,
	"created_at" timestamp (3) NOT NULL,
	"updated_at" timestamp (3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "member" (
	"member_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ktp_id" uuid,
	"status_member_id" uuid,
	"email" text,
	"nomor_hp" text,
	"nomor_wa" text,
	"avatar" text DEFAULT 'default.png',
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "metode_penyuluhan" (
	"metode_penyuluhan_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"metode" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifikasi" (
	"notifikasi_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"notifikasi_grup_id" uuid NOT NULL,
	"member_id" uuid NOT NULL,
	"jenis_layanan" text NOT NULL,
	"judul" text NOT NULL,
	"pesan" text NOT NULL,
	"waktu_kirim" timestamp with time zone NOT NULL,
	"status_notifikasi" "status_notifikasi",
	"prioritas" "prioritas_notifikasi",
	"data_tambahan" text,
	"link_aksi" text,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "notifikasi_grup" (
	"notifikasi_grup_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_notifikasi_grup" text NOT NULL,
	"deskripsi" text
);
--> statement-breakpoint
CREATE TABLE "order" (
	"order_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"member_id" uuid NOT NULL,
	"kode_invoice" text NOT NULL,
	"grand_total" text DEFAULT '0' NOT NULL,
	"total_biaya_kirim" text DEFAULT '0' NOT NULL,
	"total_biaya_tambahan" text DEFAULT '0' NOT NULL,
	"total_kupon" text DEFAULT '0' NOT NULL,
	"deskripsi" text,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"role_id" uuid
);
--> statement-breakpoint
CREATE TABLE "order_biaya_tambahan" (
	"order_biaya_tambahan_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"nama_biaya" text NOT NULL,
	"jenis_biaya" "jenis_biaya",
	"nominal" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_material_material" (
	"order_material_master_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"jumlah" integer NOT NULL,
	"harga" text NOT NULL,
	"catatan" text,
	"penyedia_material_id" uuid NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"order_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_pembayaran" (
	"order_pembayaran_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"status" boolean NOT NULL,
	"metode_pembayaran" text NOT NULL,
	"deskripsi" text,
	"created_at" timestamp with time zone NOT NULL,
	"order_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_pengiriman" (
	"order_pengiriman_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"no_resi" text,
	"kurir" text,
	"biaya_kirim" text NOT NULL,
	"alamat_id" uuid NOT NULL,
	"order_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_pengiriman_detail" (
	"order_pengiriman_detail_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tanggal" timestamp with time zone NOT NULL,
	"judul" text NOT NULL,
	"pesan" text NOT NULL,
	"order_pengiriman_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_status" (
	"order_status_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_status" text NOT NULL,
	"deskripsi" text,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_status_pivot" (
	"order_status_pivot_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_status_id" uuid NOT NULL,
	"order_id" uuid NOT NULL,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "penyedia_level" (
	"penyedia_level_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_penyedia_level" text NOT NULL,
	"status" boolean,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"deleted_at" timestamp with time zone,
	"deskripsi" text
);
--> statement-breakpoint
CREATE TABLE "penyedia_material" (
	"penyedia_material_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"material_master_id" uuid NOT NULL,
	"master_penyedia_id" uuid NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "penyedia_material_harga" (
	"penyedia_material_harga_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"penyedia_material_id" uuid NOT NULL,
	"harga" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "penyedia_material_riwayat_harga" (
	"penyedia_material_riwayat_harga_id" uuid PRIMARY KEY NOT NULL,
	"penyedia_material_harga_id" uuid NOT NULL,
	"harga" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "penyuluh" (
	"penyuluh_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"member_id" uuid NOT NULL,
	"nip" text,
	"jabatan" text,
	"pendidikan_terakhir" text,
	"bidang_keahlian" text NOT NULL,
	"tahun_bertugas" text NOT NULL,
	"status" boolean NOT NULL,
	"bpp_id" uuid NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "petani" (
	"petani_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"member_id" uuid NOT NULL,
	"nomor_kartu_tani" text,
	"jenis_petani" "jenis_petani",
	"status_petani" "status_petani",
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "petani_kelompok_tani" (
	"kelompok_tani_id" uuid NOT NULL,
	"petani_id" uuid NOT NULL,
	"tanggal_masuk" timestamp with time zone NOT NULL,
	"ketua" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "produk_kur" (
	"produk_kur_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_produk" text NOT NULL,
	"bank_id" uuid,
	"deskripsi" text,
	"tujuan" text,
	"sasaran" text,
	"kontak" text,
	"alamat_web" text,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "provinsi" (
	"provinsi_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"kode_kemendagri" text,
	"nama_provinsi" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rekening_bank" (
	"rekening_bank_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nomor_rekening" text NOT NULL,
	"nama_pemilik" text NOT NULL,
	"cabang" text,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"bank_id" uuid,
	"mata_uang_id" uuid,
	"member_id" uuid,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "rencana_usaha_tani" (
	"rencana_usaha_tani_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tahun" text NOT NULL,
	"masa_tanam_id" uuid NOT NULL,
	"total_perkiraan_biaya" text NOT NULL,
	"total_perkiraan_pendapatan" text NOT NULL,
	"waktu_tanam" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"petani_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rencana_usaha_tani_komoditas" (
	"komoditas_id" uuid NOT NULL,
	"rencana_usaha_tani_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "role" (
	"role_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_role" text NOT NULL,
	"keterangan" text,
	"aktif" boolean,
	"status_role" "status_role"
);
--> statement-breakpoint
CREATE TABLE "role_layanan" (
	"role_id" uuid NOT NULL,
	"layanan_id" uuid NOT NULL,
	CONSTRAINT "role_layanan_role_id_layanan_id_pk" PRIMARY KEY("role_id","layanan_id")
);
--> statement-breakpoint
CREATE TABLE "role_member" (
	"role_id" uuid NOT NULL,
	"member_id" uuid NOT NULL,
	"confirm" boolean DEFAULT false NOT NULL,
	CONSTRAINT "role_member_role_id_member_id_pk" PRIMARY KEY("role_id","member_id")
);
--> statement-breakpoint
CREATE TABLE "sektor" (
	"sektor_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_sektor" text NOT NULL,
	"deskripsi" text,
	"status" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "serial_number" (
	"serial_number_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"serial_number" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"material_master_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "status_kegiatan_penyuluhan" (
	"status_kegiatan_penyuluhan_id" uuid PRIMARY KEY NOT NULL,
	"nama_status" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "status_kur" (
	"status_kur_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_status" text NOT NULL,
	"deskripsi" text,
	"aktif" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "status_member" (
	"status_member_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_status" text
);
--> statement-breakpoint
CREATE TABLE "status_wallet" (
	"status_wallet_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_status_wallet" text
);
--> statement-breakpoint
CREATE TABLE "sub_kategori" (
	"sub_kategori_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"kategori_id" uuid NOT NULL,
	"nama_subkategori" text NOT NULL,
	"deskripsi" text,
	"status" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sub_layanan" (
	"sub_layanan_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_sub_layanan" text,
	"keterangan" text,
	"icon" text,
	"url" text,
	"layanan_id" uuid
);
--> statement-breakpoint
CREATE TABLE "subsektor" (
	"subsektor_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sektor_id" uuid,
	"nama_subsektor" text,
	"deskripsi" text,
	"status" boolean
);
--> statement-breakpoint
CREATE TABLE "transaksi" (
	"transaksi_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"wallet_id" uuid,
	"jenis_transaksi_id" uuid,
	"jumlah" numeric,
	"saldo_sebelum" numeric,
	"saldo_sesudah" numeric,
	"waktu_transaksi" timestamp,
	"keterangan" text
);
--> statement-breakpoint
CREATE TABLE "userlogin" (
	"userlogin_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"member_id" uuid,
	"Provider" "provider",
	"provider_account_id" text,
	"username" text,
	"password" text,
	"access_token" text,
	"refresh_token" text,
	"last_login" timestamp
);
--> statement-breakpoint
CREATE TABLE "wallet" (
	"wallet_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"saldo" numeric DEFAULT '0' NOT NULL,
	"status_wallet_id" uuid,
	"created_at" timestamp,
	"updated_at" timestamp,
	"member_id" uuid
);
--> statement-breakpoint
CREATE TABLE "whitelist" (
	"whitelist_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"penyedia_material_id" uuid NOT NULL,
	"member_id" uuid NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"role_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "withdraw" (
	"withdraw_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"transaksi_id" uuid,
	"wallet_id" uuid,
	"StatusPencairan" "status_pencairan",
	"created_at" timestamp,
	"updated_at" timestamp,
	"rekening_bank_id" uuid
);
--> statement-breakpoint
ALTER TABLE "alamat" ADD CONSTRAINT "alamat_desa_id_desa_desa_id_fk" FOREIGN KEY ("desa_id") REFERENCES "public"."desa"("desa_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alamat_bpp" ADD CONSTRAINT "alamat_bpp_alamat_id_alamat_alamat_id_fk" FOREIGN KEY ("alamat_id") REFERENCES "public"."alamat"("alamat_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alamat_bpp" ADD CONSTRAINT "alamat_bpp_bpp_id_bpp_bpp_id_fk" FOREIGN KEY ("bpp_id") REFERENCES "public"."bpp"("bpp_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alamat_gudang" ADD CONSTRAINT "alamat_gudang_gudang_id_gudang_gudang_id_fk" FOREIGN KEY ("gudang_id") REFERENCES "public"."gudang"("gudang_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alamat_gudang" ADD CONSTRAINT "alamat_gudang_alamat_id_alamat_alamat_id_fk" FOREIGN KEY ("alamat_id") REFERENCES "public"."alamat"("alamat_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alamat_kelompok_tani" ADD CONSTRAINT "alamat_kelompok_tani_alamat_id_alamat_alamat_id_fk" FOREIGN KEY ("alamat_id") REFERENCES "public"."alamat"("alamat_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alamat_kelompok_tani" ADD CONSTRAINT "alamat_kelompok_tani_kelompok_tani_id_kelompok_tani_kelompok_tani_id_fk" FOREIGN KEY ("kelompok_tani_id") REFERENCES "public"."kelompok_tani"("kelompok_tani_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alamat_member" ADD CONSTRAINT "alamat_member_member_id_member_member_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."member"("member_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alamat_member" ADD CONSTRAINT "alamat_member_alamat_id_alamat_alamat_id_fk" FOREIGN KEY ("alamat_id") REFERENCES "public"."alamat"("alamat_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alamat_penyedia" ADD CONSTRAINT "alamat_penyedia_alamat_id_alamat_alamat_id_fk" FOREIGN KEY ("alamat_id") REFERENCES "public"."alamat"("alamat_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alamat_penyedia" ADD CONSTRAINT "alamat_penyedia_master_penyedia_id_master_penyedia_master_penyedia_id_fk" FOREIGN KEY ("master_penyedia_id") REFERENCES "public"."master_penyedia"("master_penyedia_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "biaya_saprotan_pupuk" ADD CONSTRAINT "biaya_saprotan_pupuk_jenis_pupuk_id_jenis_pupuk_jenis_pupuk_id_fk" FOREIGN KEY ("jenis_pupuk_id") REFERENCES "public"."jenis_pupuk"("jenis_pupuk_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "biaya_saprotan_pupuk" ADD CONSTRAINT "biaya_saprotan_pupuk_rencana_usaha_tani_id_rencana_usaha_tani_rencana_usaha_tani_id_fk" FOREIGN KEY ("rencana_usaha_tani_id") REFERENCES "public"."rencana_usaha_tani"("rencana_usaha_tani_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "biaya_usaha_tani" ADD CONSTRAINT "biaya_usaha_tani_rencana_usaha_tani_id_rencana_usaha_tani_rencana_usaha_tani_id_fk" FOREIGN KEY ("rencana_usaha_tani_id") REFERENCES "public"."rencana_usaha_tani"("rencana_usaha_tani_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "child_kategori" ADD CONSTRAINT "child_kategori_sub_kategori_id_sub_kategori_sub_kategori_id_fk" FOREIGN KEY ("sub_kategori_id") REFERENCES "public"."sub_kategori"("sub_kategori_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "child_layanan" ADD CONSTRAINT "child_layanan_sub_layanan_id_sub_layanan_sub_layanan_id_fk" FOREIGN KEY ("sub_layanan_id") REFERENCES "public"."sub_layanan"("sub_layanan_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deposit" ADD CONSTRAINT "deposit_transaksi_id_transaksi_transaksi_id_fk" FOREIGN KEY ("transaksi_id") REFERENCES "public"."transaksi"("transaksi_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deposit" ADD CONSTRAINT "deposit_wallet_id_wallet_wallet_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "public"."wallet"("wallet_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deposit" ADD CONSTRAINT "deposit_rekening_bank_id_rekening_bank_rekening_bank_id_fk" FOREIGN KEY ("rekening_bank_id") REFERENCES "public"."rekening_bank"("rekening_bank_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "desa" ADD CONSTRAINT "desa_kecamatan_id_kecamatan_kecamatan_id_fk" FOREIGN KEY ("kecamatan_id") REFERENCES "public"."kecamatan"("kecamatan_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dimensi_material_master" ADD CONSTRAINT "dimensi_material_master_material_master_id_material_master_material_master_id_fk" FOREIGN KEY ("material_master_id") REFERENCES "public"."material_master"("material_master_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ealokasi" ADD CONSTRAINT "ealokasi_penyuluh_id_penyuluh_penyuluh_id_fk" FOREIGN KEY ("penyuluh_id") REFERENCES "public"."penyuluh"("penyuluh_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ealokasi" ADD CONSTRAINT "ealokasi_komoditas_id_komoditas_komoditas_id_fk" FOREIGN KEY ("komoditas_id") REFERENCES "public"."komoditas"("komoditas_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ealokasi" ADD CONSTRAINT "ealokasi_kelompok_tani_id_kelompok_tani_kelompok_tani_id_fk" FOREIGN KEY ("kelompok_tani_id") REFERENCES "public"."kelompok_tani"("kelompok_tani_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ealokasi" ADD CONSTRAINT "ealokasi_master_penyedia_id_master_penyedia_master_penyedia_id_fk" FOREIGN KEY ("master_penyedia_id") REFERENCES "public"."master_penyedia"("master_penyedia_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ealokasi" ADD CONSTRAINT "ealokasi_masa_tanam_id_masa_tanam_masa_tanam_id_fk" FOREIGN KEY ("masa_tanam_id") REFERENCES "public"."masa_tanam"("masa_tanam_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ealokasi" ADD CONSTRAINT "ealokasi_petani_id_petani_petani_id_fk" FOREIGN KEY ("petani_id") REFERENCES "public"."petani"("petani_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ealokasi_pupuk_subsidi" ADD CONSTRAINT "ealokasi_pupuk_subsidi_jenis_pupuk_id_jenis_pupuk_jenis_pupuk_id_fk" FOREIGN KEY ("jenis_pupuk_id") REFERENCES "public"."jenis_pupuk"("jenis_pupuk_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ealokasi_pupuk_subsidi" ADD CONSTRAINT "ealokasi_pupuk_subsidi_ealokasi_id_ealokasi_ealokasi_id_fk" FOREIGN KEY ("ealokasi_id") REFERENCES "public"."ealokasi"("ealokasi_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ealokasi_pupuk_subsidi_transaksi" ADD CONSTRAINT "ealokasi_pupuk_subsidi_transaksi_ealokasi_pupuk_subsidi_id_ealokasi_pupuk_subsidi_ealokasi_pupuk_subsidi_id_fk" FOREIGN KEY ("ealokasi_pupuk_subsidi_id") REFERENCES "public"."ealokasi_pupuk_subsidi"("ealokasi_pupuk_subsidi_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ealokasi_pupuk_subsidi_transaksi" ADD CONSTRAINT "ealokasi_pupuk_subsidi_transaksi_order_id_order_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."order"("order_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "faq_produk_kur" ADD CONSTRAINT "faq_produk_kur_produk_kur_id_produk_kur_produk_kur_id_fk" FOREIGN KEY ("produk_kur_id") REFERENCES "public"."produk_kur"("produk_kur_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "file_kur" ADD CONSTRAINT "file_kur_kredit_usaha_rakyat_id_kredit_usaha_rakyat_kredit_usaha_rakyat_id_fk" FOREIGN KEY ("kredit_usaha_rakyat_id") REFERENCES "public"."kredit_usaha_rakyat"("kredit_usaha_rakyat_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "file_kur" ADD CONSTRAINT "file_kur_file_kur_syarat_id_file_kur_syarat_file_kur_syarat_id_fk" FOREIGN KEY ("file_kur_syarat_id") REFERENCES "public"."file_kur_syarat"("file_kur_syarat_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "file_kur_syarat" ADD CONSTRAINT "file_kur_syarat_produk_kur_id_produk_kur_produk_kur_id_fk" FOREIGN KEY ("produk_kur_id") REFERENCES "public"."produk_kur"("produk_kur_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gudang" ADD CONSTRAINT "gudang_member_id_member_member_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."member"("member_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hasil_panen" ADD CONSTRAINT "hasil_panen_rencana_usaha_tani_id_rencana_usaha_tani_rencana_usaha_tani_id_fk" FOREIGN KEY ("rencana_usaha_tani_id") REFERENCES "public"."rencana_usaha_tani"("rencana_usaha_tani_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kabupaten" ADD CONSTRAINT "kabupaten_provinsi_id_provinsi_provinsi_id_fk" FOREIGN KEY ("provinsi_id") REFERENCES "public"."provinsi"("provinsi_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kategori" ADD CONSTRAINT "kategori_komoditas_id_komoditas_komoditas_id_fk" FOREIGN KEY ("komoditas_id") REFERENCES "public"."komoditas"("komoditas_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kecamatan" ADD CONSTRAINT "kecamatan_kabupaten_id_kabupaten_kabupaten_id_fk" FOREIGN KEY ("kabupaten_id") REFERENCES "public"."kabupaten"("kabupaten_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kegiatan_penyuluhan" ADD CONSTRAINT "kegiatan_penyuluhan_penyuluh_id_penyuluh_penyuluh_id_fk" FOREIGN KEY ("penyuluh_id") REFERENCES "public"."penyuluh"("penyuluh_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kegiatan_penyuluhan" ADD CONSTRAINT "kegiatan_penyuluhan_kelompok_tani_id_kelompok_tani_kelompok_tani_id_fk" FOREIGN KEY ("kelompok_tani_id") REFERENCES "public"."kelompok_tani"("kelompok_tani_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kegiatan_penyuluhan" ADD CONSTRAINT "kegiatan_penyuluhan_metode_penyuluhan_id_metode_penyuluhan_metode_penyuluhan_id_fk" FOREIGN KEY ("metode_penyuluhan_id") REFERENCES "public"."metode_penyuluhan"("metode_penyuluhan_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kegiatan_penyuluhan" ADD CONSTRAINT "kegiatan_penyuluhan_status_kegiatan_penyuluhan_id_status_kegiatan_penyuluhan_status_kegiatan_penyuluhan_id_fk" FOREIGN KEY ("status_kegiatan_penyuluhan_id") REFERENCES "public"."status_kegiatan_penyuluhan"("status_kegiatan_penyuluhan_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kelompok_tani_komoditas" ADD CONSTRAINT "kelompok_tani_komoditas_komoditas_id_komoditas_komoditas_id_fk" FOREIGN KEY ("komoditas_id") REFERENCES "public"."komoditas"("komoditas_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kelompok_tani_komoditas" ADD CONSTRAINT "kelompok_tani_komoditas_kelompok_tani_id_kelompok_tani_kelompok_tani_id_fk" FOREIGN KEY ("kelompok_tani_id") REFERENCES "public"."kelompok_tani"("kelompok_tani_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "komoditas" ADD CONSTRAINT "komoditas_subsektor_id_subsektor_subsektor_id_fk" FOREIGN KEY ("subsektor_id") REFERENCES "public"."subsektor"("subsektor_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "koordinat" ADD CONSTRAINT "koordinat_alamat_id_alamat_alamat_id_fk" FOREIGN KEY ("alamat_id") REFERENCES "public"."alamat"("alamat_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kredit_usaha_rakyat" ADD CONSTRAINT "kredit_usaha_rakyat_produk_kur_id_produk_kur_produk_kur_id_fk" FOREIGN KEY ("produk_kur_id") REFERENCES "public"."produk_kur"("produk_kur_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kredit_usaha_rakyat" ADD CONSTRAINT "kredit_usaha_rakyat_member_id_member_member_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."member"("member_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kredit_usaha_rakyat" ADD CONSTRAINT "kredit_usaha_rakyat_role_id_role_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role"("role_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ktp_konfirmasi" ADD CONSTRAINT "ktp_konfirmasi_ktp_id_ktp_ktp_id_fk" FOREIGN KEY ("ktp_id") REFERENCES "public"."ktp"("ktp_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kur_history" ADD CONSTRAINT "kur_history_kredit_usaha_rakyat_id_kredit_usaha_rakyat_kredit_usaha_rakyat_id_fk" FOREIGN KEY ("kredit_usaha_rakyat_id") REFERENCES "public"."kredit_usaha_rakyat"("kredit_usaha_rakyat_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kur_history" ADD CONSTRAINT "kur_history_status_kur_id_status_kur_status_kur_id_fk" FOREIGN KEY ("status_kur_id") REFERENCES "public"."status_kur"("status_kur_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lahan_usaha" ADD CONSTRAINT "lahan_usaha_alamat_id_alamat_alamat_id_fk" FOREIGN KEY ("alamat_id") REFERENCES "public"."alamat"("alamat_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "limit_transaksi" ADD CONSTRAINT "limit_transaksi_wallet_id_wallet_wallet_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "public"."wallet"("wallet_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "manajemen_inventory" ADD CONSTRAINT "manajemen_inventory_gudang_id_awal_gudang_gudang_id_fk" FOREIGN KEY ("gudang_id_awal") REFERENCES "public"."gudang"("gudang_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "manajemen_inventory" ADD CONSTRAINT "manajemen_inventory_gudang_id_akhir_gudang_gudang_id_fk" FOREIGN KEY ("gudang_id_akhir") REFERENCES "public"."gudang"("gudang_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "manajemen_inventory" ADD CONSTRAINT "manajemen_inventory_material_master_id_material_master_material_master_id_fk" FOREIGN KEY ("material_master_id") REFERENCES "public"."material_master"("material_master_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "manajemen_inventory" ADD CONSTRAINT "manajemen_inventory_serial_number_id_serial_number_serial_number_id_fk" FOREIGN KEY ("serial_number_id") REFERENCES "public"."serial_number"("serial_number_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "manajemen_inventory" ADD CONSTRAINT "manajemen_inventory_jenis_inventory_id_jenis_inventory_jenis_inventory_id_fk" FOREIGN KEY ("jenis_inventory_id") REFERENCES "public"."jenis_inventory"("jenis_inventory_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master_penyedia" ADD CONSTRAINT "master_penyedia_penyedia_level_id_penyedia_level_penyedia_level_id_fk" FOREIGN KEY ("penyedia_level_id") REFERENCES "public"."penyedia_level"("penyedia_level_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master_penyedia" ADD CONSTRAINT "master_penyedia_member_id_member_member_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."member"("member_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master_penyedia_rekening_bank" ADD CONSTRAINT "master_penyedia_rekening_bank_master_penyedia_id_master_penyedia_master_penyedia_id_fk" FOREIGN KEY ("master_penyedia_id") REFERENCES "public"."master_penyedia"("master_penyedia_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master_penyedia_rekening_bank" ADD CONSTRAINT "master_penyedia_rekening_bank_rekening_bank_id_rekening_bank_rekening_bank_id_fk" FOREIGN KEY ("rekening_bank_id") REFERENCES "public"."rekening_bank"("rekening_bank_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master_penyedia_wallet" ADD CONSTRAINT "master_penyedia_wallet_master_penyedia_id_master_penyedia_master_penyedia_id_fk" FOREIGN KEY ("master_penyedia_id") REFERENCES "public"."master_penyedia"("master_penyedia_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master_penyedia_wallet" ADD CONSTRAINT "master_penyedia_wallet_wallet_id_wallet_wallet_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "public"."wallet"("wallet_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "materi_kegiatan" ADD CONSTRAINT "materi_kegiatan_kegiatan_penyuluhan_id_kegiatan_penyuluhan_kegiatan_penyuluhan_id_fk" FOREIGN KEY ("kegiatan_penyuluhan_id") REFERENCES "public"."kegiatan_penyuluhan"("kegiatan_penyuluhan_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "material_master" ADD CONSTRAINT "material_master_child_kategori_id_child_kategori_child_kategori_id_fk" FOREIGN KEY ("child_kategori_id") REFERENCES "public"."child_kategori"("child_kategori_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "material_stok" ADD CONSTRAINT "material_stok_gudang_id_gudang_gudang_id_fk" FOREIGN KEY ("gudang_id") REFERENCES "public"."gudang"("gudang_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "material_stok" ADD CONSTRAINT "material_stok_material_master_id_material_master_material_master_id_fk" FOREIGN KEY ("material_master_id") REFERENCES "public"."material_master"("material_master_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member" ADD CONSTRAINT "member_ktp_id_ktp_ktp_id_fk" FOREIGN KEY ("ktp_id") REFERENCES "public"."ktp"("ktp_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member" ADD CONSTRAINT "member_status_member_id_status_member_status_member_id_fk" FOREIGN KEY ("status_member_id") REFERENCES "public"."status_member"("status_member_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifikasi" ADD CONSTRAINT "notifikasi_notifikasi_grup_id_notifikasi_grup_notifikasi_grup_id_fk" FOREIGN KEY ("notifikasi_grup_id") REFERENCES "public"."notifikasi_grup"("notifikasi_grup_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifikasi" ADD CONSTRAINT "notifikasi_member_id_member_member_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."member"("member_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_member_id_member_member_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."member"("member_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_role_id_role_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role"("role_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_biaya_tambahan" ADD CONSTRAINT "order_biaya_tambahan_order_id_order_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."order"("order_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_material_material" ADD CONSTRAINT "order_material_material_penyedia_material_id_penyedia_material_penyedia_material_id_fk" FOREIGN KEY ("penyedia_material_id") REFERENCES "public"."penyedia_material"("penyedia_material_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_material_material" ADD CONSTRAINT "order_material_material_order_id_order_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."order"("order_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_pembayaran" ADD CONSTRAINT "order_pembayaran_order_id_order_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."order"("order_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_pengiriman" ADD CONSTRAINT "order_pengiriman_alamat_id_alamat_alamat_id_fk" FOREIGN KEY ("alamat_id") REFERENCES "public"."alamat"("alamat_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_pengiriman" ADD CONSTRAINT "order_pengiriman_order_id_order_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."order"("order_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_pengiriman_detail" ADD CONSTRAINT "order_pengiriman_detail_order_pengiriman_id_order_pengiriman_order_pengiriman_id_fk" FOREIGN KEY ("order_pengiriman_id") REFERENCES "public"."order_pengiriman"("order_pengiriman_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_status_pivot" ADD CONSTRAINT "order_status_pivot_order_status_id_order_status_order_status_id_fk" FOREIGN KEY ("order_status_id") REFERENCES "public"."order_status"("order_status_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_status_pivot" ADD CONSTRAINT "order_status_pivot_order_id_order_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."order"("order_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "penyedia_material" ADD CONSTRAINT "penyedia_material_material_master_id_material_master_material_master_id_fk" FOREIGN KEY ("material_master_id") REFERENCES "public"."material_master"("material_master_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "penyedia_material" ADD CONSTRAINT "penyedia_material_master_penyedia_id_master_penyedia_master_penyedia_id_fk" FOREIGN KEY ("master_penyedia_id") REFERENCES "public"."master_penyedia"("master_penyedia_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "penyedia_material_harga" ADD CONSTRAINT "penyedia_material_harga_penyedia_material_id_penyedia_material_penyedia_material_id_fk" FOREIGN KEY ("penyedia_material_id") REFERENCES "public"."penyedia_material"("penyedia_material_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "penyedia_material_riwayat_harga" ADD CONSTRAINT "penyedia_material_riwayat_harga_penyedia_material_harga_id_penyedia_material_harga_penyedia_material_harga_id_fk" FOREIGN KEY ("penyedia_material_harga_id") REFERENCES "public"."penyedia_material_harga"("penyedia_material_harga_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "penyuluh" ADD CONSTRAINT "penyuluh_member_id_member_member_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."member"("member_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "penyuluh" ADD CONSTRAINT "penyuluh_bpp_id_bpp_bpp_id_fk" FOREIGN KEY ("bpp_id") REFERENCES "public"."bpp"("bpp_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "petani" ADD CONSTRAINT "petani_member_id_member_member_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."member"("member_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "petani_kelompok_tani" ADD CONSTRAINT "petani_kelompok_tani_kelompok_tani_id_kelompok_tani_kelompok_tani_id_fk" FOREIGN KEY ("kelompok_tani_id") REFERENCES "public"."kelompok_tani"("kelompok_tani_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "petani_kelompok_tani" ADD CONSTRAINT "petani_kelompok_tani_petani_id_petani_petani_id_fk" FOREIGN KEY ("petani_id") REFERENCES "public"."petani"("petani_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "produk_kur" ADD CONSTRAINT "produk_kur_bank_id_bank_bank_id_fk" FOREIGN KEY ("bank_id") REFERENCES "public"."bank"("bank_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rekening_bank" ADD CONSTRAINT "rekening_bank_bank_id_bank_bank_id_fk" FOREIGN KEY ("bank_id") REFERENCES "public"."bank"("bank_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rekening_bank" ADD CONSTRAINT "rekening_bank_mata_uang_id_mata_uang_mata_uang_id_fk" FOREIGN KEY ("mata_uang_id") REFERENCES "public"."mata_uang"("mata_uang_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rekening_bank" ADD CONSTRAINT "rekening_bank_member_id_member_member_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."member"("member_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rencana_usaha_tani" ADD CONSTRAINT "rencana_usaha_tani_masa_tanam_id_masa_tanam_masa_tanam_id_fk" FOREIGN KEY ("masa_tanam_id") REFERENCES "public"."masa_tanam"("masa_tanam_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rencana_usaha_tani" ADD CONSTRAINT "rencana_usaha_tani_petani_id_petani_petani_id_fk" FOREIGN KEY ("petani_id") REFERENCES "public"."petani"("petani_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rencana_usaha_tani_komoditas" ADD CONSTRAINT "rencana_usaha_tani_komoditas_komoditas_id_komoditas_komoditas_id_fk" FOREIGN KEY ("komoditas_id") REFERENCES "public"."komoditas"("komoditas_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rencana_usaha_tani_komoditas" ADD CONSTRAINT "rencana_usaha_tani_komoditas_rencana_usaha_tani_id_rencana_usaha_tani_rencana_usaha_tani_id_fk" FOREIGN KEY ("rencana_usaha_tani_id") REFERENCES "public"."rencana_usaha_tani"("rencana_usaha_tani_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_layanan" ADD CONSTRAINT "role_layanan_role_id_role_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role"("role_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_layanan" ADD CONSTRAINT "role_layanan_layanan_id_layanan_layanan_id_fk" FOREIGN KEY ("layanan_id") REFERENCES "public"."layanan"("layanan_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_member" ADD CONSTRAINT "role_member_role_id_role_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role"("role_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_member" ADD CONSTRAINT "role_member_member_id_member_member_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."member"("member_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "serial_number" ADD CONSTRAINT "serial_number_material_master_id_material_master_material_master_id_fk" FOREIGN KEY ("material_master_id") REFERENCES "public"."material_master"("material_master_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sub_kategori" ADD CONSTRAINT "sub_kategori_kategori_id_kategori_kategori_id_fk" FOREIGN KEY ("kategori_id") REFERENCES "public"."kategori"("kategori_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sub_layanan" ADD CONSTRAINT "sub_layanan_layanan_id_layanan_layanan_id_fk" FOREIGN KEY ("layanan_id") REFERENCES "public"."layanan"("layanan_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subsektor" ADD CONSTRAINT "subsektor_sektor_id_sektor_sektor_id_fk" FOREIGN KEY ("sektor_id") REFERENCES "public"."sektor"("sektor_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaksi" ADD CONSTRAINT "transaksi_wallet_id_wallet_wallet_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "public"."wallet"("wallet_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaksi" ADD CONSTRAINT "transaksi_jenis_transaksi_id_jenis_transaksi_jenis_transaksi_id_fk" FOREIGN KEY ("jenis_transaksi_id") REFERENCES "public"."jenis_transaksi"("jenis_transaksi_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userlogin" ADD CONSTRAINT "userlogin_member_id_member_member_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."member"("member_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallet" ADD CONSTRAINT "wallet_status_wallet_id_status_wallet_status_wallet_id_fk" FOREIGN KEY ("status_wallet_id") REFERENCES "public"."status_wallet"("status_wallet_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallet" ADD CONSTRAINT "wallet_member_id_member_member_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."member"("member_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "whitelist" ADD CONSTRAINT "whitelist_penyedia_material_id_penyedia_material_penyedia_material_id_fk" FOREIGN KEY ("penyedia_material_id") REFERENCES "public"."penyedia_material"("penyedia_material_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "whitelist" ADD CONSTRAINT "whitelist_member_id_member_member_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."member"("member_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "whitelist" ADD CONSTRAINT "whitelist_role_id_role_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role"("role_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "withdraw" ADD CONSTRAINT "withdraw_transaksi_id_transaksi_transaksi_id_fk" FOREIGN KEY ("transaksi_id") REFERENCES "public"."transaksi"("transaksi_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "withdraw" ADD CONSTRAINT "withdraw_wallet_id_wallet_wallet_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "public"."wallet"("wallet_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "withdraw" ADD CONSTRAINT "withdraw_rekening_bank_id_rekening_bank_rekening_bank_id_fk" FOREIGN KEY ("rekening_bank_id") REFERENCES "public"."rekening_bank"("rekening_bank_id") ON DELETE no action ON UPDATE no action;