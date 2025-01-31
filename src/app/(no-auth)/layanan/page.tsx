import { Layanan } from "@/db/schema"
import { drizzle } from "drizzle-orm/node-postgres"
import React from "react"

interface Layanan {
    LayananId: string
    NamaLayanan: string
    Keterangan: string
    Icon: string
    Url: string
}

const Page = async () => {
    const db = drizzle(process.env.DATABASE_URL!)
    const rawData = await db.select().from(Layanan)
    const layanans: Layanan[] = JSON.parse(JSON.stringify(rawData))

    return (
        <section id="services" className="py-20">
            <div className="container px-4 mx-auto">
                <h2 className="mb-4 text-3xl font-bold text-center text-transparent md:text-4xl bg-gradient-to-r from-green-700 to-accent dark:to-accent-foreground bg-clip-text">
                    Layanan Pertanian Komprehensif
                </h2>
                <p className="max-w-3xl mx-auto mb-12 text-center text-gray-600 dark:text-gray-200">
                    Akses berbagai layanan yang dirancang untuk mendukung dan
                    mengembangkan bisnis pertanian Anda
                </p>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {layanans.map((service, index) => (
                        <div
                            key={index}
                            className="p-6 transition-all duration-150 clay-card hover:scale-105 rounded-xl edge-light"
                        >
                            <div className="inline-block p-3 mb-4 text-gray-800 rounded-lg clay-card bg-gradient-to-br from-primary-light to-primary dark:text-white">
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: service.Icon,
                                    }}
                                />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-50">
                                {service.NamaLayanan}
                            </h3>
                            <p className="text-justify text-gray-800 dark:text-gray-50">
                                {service.Keterangan}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Page
