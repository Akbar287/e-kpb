import { RegisterForm } from "@/components/auth/register-form"
import logo from "@/assets/icons/KPB-Logo.png"
import bg from "@/assets/images/kpb.jpg"
import Image from "next/image"
import Link from "next/link"

export default function Page() {
    return (
        <div className="grid min-h-svh bg-gradient-to-br from-green-50 via-yellow-50 to-red-50 dark:from-gray-800 dark:to-gray-700 lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10 overflow-y-auto h-screen">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-medium"
                    >
                        <div className="flex items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <div className="p-2 bg-gray-100 rounded-xl">
                                <Image
                                    src={logo}
                                    priority
                                    width={50}
                                    height={10}
                                    alt="logo"
                                    style={{
                                        width: "auto",
                                        height: "auto",
                                    }}
                                />
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="flex items-center justify-center flex-1 ">
                    <div className="w-full">
                        <RegisterForm />
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <Image
                    src={bg}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.7] dark:grayscale"
                />
            </div>
        </div>
    )
}
