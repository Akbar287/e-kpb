"use client"
import { ChevronRight } from "lucide-react"
import React, { useRef } from "react"
import imageHero from "@/assets/images/backgroundlayanan.webp"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"
// import { Metadata } from "next"
// import { Canvas, useFrame } from "@react-three/fiber"
// import { OrbitControls, Environment } from "@react-three/drei"

const dataTestimoni = [
    {
        id: 1,
        nama: "Rudi",
        pekerjaan: "Pengguna",
        testimoni:
            "Aplikasi ini telah mengubah cara saya mengelola pertanian saya. Dukungan dan layanannya sangat baik.",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 2,
        nama: "Anugerah",
        pekerjaan: "Farmer",
        testimoni:
            "Aplikasi ini telah mengubah cara saya mengelola pertanian saya. Dukungan dan layanannya sangat baik.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 3,
        nama: "Nopriansyah",
        pekerjaan: "Koperasi",
        testimoni:
            "Aplikasi ini telah mengubah cara saya mengelola pertanian saya. Dukungan dan layanannya sangat baik.",
        avatar: "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 4,
        nama: "Rudi",
        pekerjaan: "Pengguna",
        testimoni:
            "Aplikasi ini telah mengubah cara saya mengelola pertanian saya. Dukungan dan layanannya sangat baik.",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 5,
        nama: "Anugerah",
        pekerjaan: "Farmer",
        testimoni:
            "Aplikasi ini telah mengubah cara saya mengelola pertanian saya. Dukungan dan layanannya sangat baik.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 6,
        nama: "Nopriansyah",
        pekerjaan: "Koperasi",
        testimoni:
            "Aplikasi ini telah mengubah cara saya mengelola pertanian saya. Dukungan dan layanannya sangat baik.",
        avatar: "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
]

const dataChoose = [
    {
        id: 1,
        choose: "Petani, Peternak, dan Nelayan",
        list: [
            "Akses mudah ke subsidi dan dukungan pemerintah",
            "Proses aplikasi yang disederhanakan untuk semua layanan",
            "Akses pasar langsung dan harga yang lebih baik",
            "Sumber daya pendidikan dan dukungan ahli",
        ],
    },
    {
        id: 2,
        choose: "Pabrik, Distributor, Kios, UMKM",
        list: [
            "Penguatan ekonomi pertanian lokal",
            "Peningkatan ketahanan pangan dan keberlanjutan",
            "Penciptaan lapangan kerja lokal",
            "Peningkatan pembangunan pedesaan",
        ],
    },
]

const HomePage = () => {
    return (
        <React.Fragment>
            <section className="py-20 glow">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-col items-center gap-12 md:flex-row">
                        <div className="flex-1">
                            <h1 className="mb-6 text-4xl font-bold text-transparent md:text-6xl bg-gradient-to-r from-green-600 to-green-400 dark:from-green-400 dark:to-green-200 bg-clip-text">
                                Memberdayakan Petani dengan Solusi Sistem
                                Pertanian Terpadu
                            </h1>
                            <p className="mb-8 text-lg text-gray-600 dark:text-gray-100">
                                Akses semua yang Anda butuhkan untuk
                                mengembangkan bisnis pertanian Anda - mulai dari
                                pupuk bersubsidi, akses pasar hingga Hilirisasi,
                                semuanya dalam satu platform.
                            </p>
                            <div className="flex gap-4">
                                <Link
                                    href={"/login"}
                                    className="flex items-center gap-2 px-8 py-3 text-gray-800 clay-button bg-gradient-to-r from-green-600 to-green-300 dark:text-white dark:from-green-900 dark:to-green-500 rounded-xl"
                                >
                                    Masuk
                                    <ChevronRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    href={"/layanan"}
                                    className="px-8 py-3 text-gray-800 clay-button bg-gradient-to-r from-accent to-accent-dark dark:text-gray-100 rounded-xl"
                                >
                                    Layanan
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 items-center gap-12 md:flex-row">
                            {/* <FarmerScene /> */}
                            <div className="p-4 clay-card rounded-2xl isometric">
                                <Image
                                    src={imageHero}
                                    priority
                                    alt="Farmer in field"
                                    className="shadow-lg rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="benefits" className="py-20 glow">
                <div className="container px-4 mx-auto">
                    <h2 className="mb-12 text-3xl font-bold text-center text-transparent md:text-4xl bg-gradient-to-r from-green-500 via-green-700 to-accent-foreground bg-clip-text">
                        Kenapa Memilih e-KPB?
                    </h2>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {dataChoose.map((choose) => (
                            <motion.div
                                key={choose.id}
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                className="p-6 bg-white shadow-lg clay-card rounded-xl edge-light isometric"
                            >
                                <h3 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
                                    {choose.choose}
                                </h3>
                                <ul className="space-y-4">
                                    {choose.list.map((list, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="p-1 text-gray-800 rounded-lg clay-card bg-gradient-to-r from-accent to-accent-dark dark:text-gray-200">
                                                <ChevronRight className="w-5 h-5" />
                                            </div>
                                            <span className="text-gray-600 dark:text-gray-200">
                                                {list}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <section id="benefits" className="py-20 glow">
                <div className="container px-4 mx-auto">
                    <h2 className="mb-12 text-3xl font-bold text-center text-transparent md:text-4xl bg-gradient-to-r from-green-500 via-green-700 to-accent-foreground bg-clip-text">
                        Apa yang dikatakan pengguna kami?
                    </h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {dataTestimoni.map((testimoni, index) => (
                            <motion.div
                                key={testimoni.id}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: index * 0.2 }}
                                className="p-6 bg-white rounded-lg shadow-lg clay-card"
                            >
                                <div className="flex items-center mb-4">
                                    <img
                                        className="w-12 h-12 rounded-full"
                                        src={testimoni.avatar}
                                        alt="User Avatar"
                                    />
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-50">
                                            {testimoni.nama}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-200">
                                            {testimoni.pekerjaan}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-justify text-gray-700 dark:text-gray-200">
                                    {testimoni.testimoni}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <motion.div
                animate={{
                    rotate: [0, 10, -10, 0],
                    y: [0, 20, -20, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="fixed bottom-20 left-8 bg-white p-4 rounded-full shadow-lg"
            >
                <svg
                    className="w-12 h-12 text-green-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="24"
                    height="24"
                    strokeWidth="1.5"
                >
                    <path d="M5 21c.5 -4.5 2.5 -8 7 -10"></path>
                    <path d="M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12 9c0 1 0 3 2 5h3z"></path>
                </svg>
            </motion.div>
            <motion.div
                animate={{
                    rotate: [0, 10, -10, 0],
                    y: [0, 20, -20, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="fixed top-1/3 right-10 bg-white p-4 rounded-full shadow-lg"
            >
                <svg
                    className="w-12 h-12 text-green-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="24"
                    height="24"
                    strokeWidth="1.5"
                >
                    <path d="M12 10a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3"></path>
                    <path d="M12 14a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3"></path>
                    <path d="M12 20l0 -10"></path>
                </svg>
            </motion.div>
        </React.Fragment>
    )
}

// function FarmerScene() {
//     return (
//         <div style={{ height: "100vh", width: "100vw" }}>
//             <Canvas shadows camera={{ position: [5, 2, 5], fov: 60 }}>
//                 <ambientLight intensity={0.5} />
//                 <directionalLight
//                     position={[10, 10, 5]}
//                     intensity={1}
//                     castShadow
//                     shadow-mapSize-width={2048}
//                     shadow-mapSize-height={2048}
//                 />

//                 <RiceField />
//                 <FarmerModel />
//                 <OrbitControls />
//                 <Environment preset="sunset" />
//             </Canvas>
//         </div>
//     )
// }

// function FarmerModel() {
//     const leftArm = useRef<THREE.Mesh>(null)
//     const rightArm = useRef<THREE.Mesh>(null)

//     // Animation for arms
//     useFrame(({ clock }) => {
//         const time = clock.getElapsedTime()
//         if (leftArm.current && rightArm.current) {
//             leftArm.current.rotation.x = Math.sin(time) * 0.3
//             rightArm.current.rotation.x = Math.sin(time + Math.PI) * 0.3
//         }
//     })

//     return (
//         <group position={[0, -1, 0]}>
//             {/* Body */}
//             <mesh position={[0, 1.5, 0]}>
//                 <cylinderGeometry args={[0.5, 0.5, 2]} />
//                 <meshStandardMaterial color="#4d7c0f" />
//             </mesh>

//             {/* Head */}
//             <mesh position={[0, 2.5, 0]}>
//                 <sphereGeometry args={[0.4]} />
//                 <meshStandardMaterial color="#ffcc99" />
//             </mesh>

//             {/* Hat */}
//             <mesh position={[0, 2.8, 0]} rotation={[-0.3, 0, 0]}>
//                 <coneGeometry args={[0.5, 0.3]} />
//                 <meshStandardMaterial color="#6b4423" />
//             </mesh>

//             {/* Arms */}
//             <mesh ref={leftArm} position={[-0.7, 2, 0]} rotation={[0, 0, -0.5]}>
//                 <cylinderGeometry args={[0.1, 0.1, 1]} />
//                 <meshStandardMaterial color="#ffcc99" />
//             </mesh>

//             <mesh ref={rightArm} position={[0.7, 2, 0]} rotation={[0, 0, 0.5]}>
//                 <cylinderGeometry args={[0.1, 0.1, 1]} />
//                 <meshStandardMaterial color="#ffcc99" />
//             </mesh>

//             {/* Legs */}
//             <mesh position={[-0.3, 0.5, 0]}>
//                 <cylinderGeometry args={[0.15, 0.15, 1.5]} />
//                 <meshStandardMaterial color="#2d3748" />
//             </mesh>

//             <mesh position={[0.3, 0.5, 0]}>
//                 <cylinderGeometry args={[0.15, 0.15, 1.5]} />
//                 <meshStandardMaterial color="#2d3748" />
//             </mesh>

//             {/* Hoe */}
//             <mesh position={[1, 1, 0]} rotation={[0, 0, -0.5]}>
//                 <cylinderGeometry args={[0.05, 0.05, 2]} />
//                 <meshStandardMaterial color="#666" />
//             </mesh>
//             <mesh position={[1.8, 1.2, 0]}>
//                 <boxGeometry args={[0.4, 0.1, 0.1]} />
//                 <meshStandardMaterial color="#444" />
//             </mesh>
//         </group>
//     )
// }

// function RiceField() {
//     return (
//         <group>
//             {/* Ground */}
//             <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
//                 <planeGeometry args={[20, 20]} />
//                 <meshStandardMaterial color="#5b7c3d" />
//             </mesh>

//             {/* Rice plants */}
//             {Array.from({ length: 50 }).map((_, i) => (
//                 <mesh
//                     key={i}
//                     position={[
//                         (Math.random() - 0.5) * 10,
//                         0.2,
//                         (Math.random() - 0.5) * 10,
//                     ]}
//                 >
//                     <cylinderGeometry args={[0.02, 0.02, 0.4]} />
//                     <meshStandardMaterial color="#6b8c42" />
//                 </mesh>
//             ))}
//         </group>
//     )
// }
export default HomePage
