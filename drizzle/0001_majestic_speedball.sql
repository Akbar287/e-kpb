CREATE TABLE "keranjang" (
	"keranjang_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"penyedia_material_id" uuid,
	"member_id" uuid,
	"role_id" uuid,
	"jumlah" integer NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "userlogin" RENAME COLUMN "Provider" TO "provider";--> statement-breakpoint
ALTER TABLE "keranjang" ADD CONSTRAINT "keranjang_penyedia_material_id_penyedia_material_penyedia_material_id_fk" FOREIGN KEY ("penyedia_material_id") REFERENCES "public"."penyedia_material"("penyedia_material_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "keranjang" ADD CONSTRAINT "keranjang_member_id_member_member_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."member"("member_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "keranjang" ADD CONSTRAINT "keranjang_role_id_role_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role"("role_id") ON DELETE no action ON UPDATE no action;