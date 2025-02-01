import { RegisterForm } from "@/components/auth/register-form"
import logo from "@/assets/icons/KPB-Logo.png"
import bg from "@/assets/images/kpb.jpg"
import Image from "next/image"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="grid min-h-svh bg-gradient-to-br from-green-50 via-yellow-50 to-red-50 dark:from-gray-800 dark:to-gray-700 lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10 overflow-y-auto h-screen">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Skeleton className="w-full h-20" />
                </div>
                <div className="flex items-center justify-center flex-1 ">
                    <div className="w-full">
                        <Skeleton className="w-full h-1/3" />
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <Skeleton className="w-full h-full" />
            </div>
        </div>
    )
}
