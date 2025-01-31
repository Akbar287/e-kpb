"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import logo from "@/assets/icons/KPB-Logo.png"
import Link from "next/link"
import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    LoginFormValidation,
    LoginSkemaValidation,
} from "@/validation/LoginValidation"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form"
import { signIn, useSession } from "next-auth/react"
import { useSearchParams, useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { LogInIcon } from "lucide-react"
import { authStore } from "@/store/AuthStore"
import { setZustandValue } from "nes-zustand"
import { profileStore } from "@/store/ProfileStore"
import { roleStore } from "@/store/RoleStore"
import { AuthTypesProps } from "@/types/AuthTypes"
import { ProfileTypeProps } from "@/types/ProfilTypes"
import { RoleTypeProps } from "@/types/RoleTypes"

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const router = useRouter()
    const { data: session } = useSession()
    const searchParam = useSearchParams()
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
    const [loading, setLoading] = React.useState<boolean>(false)
    const form = useForm<LoginFormValidation>({
        resolver: zodResolver(LoginSkemaValidation),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const onSubmit = async (data: LoginFormValidation) => {
        setLoading(true)
        const result = await signIn("credentials", {
            username: data.username,
            password: data.password,
            redirect: false,
            callbackUrl: searchParam.get("callbackUrl") || "/",
        })

        if (result?.error) {
            setErrorMessage(result.error)
            setLoading(false)
        }

        if (result?.ok) {
            const user = await fetch("/api/protected/profile").then((res) =>
                res.json()
            )
            const role = await fetch("/api/protected/role").then((res) =>
                res.json()
            )
            setZustandValue<AuthTypesProps | null>(authStore, {
                id: user.data.userloginId,
                username: user.data.username,
                nama: user.data.member.Ktp.nama,
                avatar: user.data.member.avatar,
                email: user.data.member.email,
            })
            setZustandValue<ProfileTypeProps | null>(profileStore, {
                ktp: user.data.member.Ktp,
                member: user.data.member,
                userlogin: user.data,
            })
            setZustandValue<RoleTypeProps[] | null>(roleStore, role.data)
            localStorage.setItem("kpb.my-profile", JSON.stringify(user.data))
            localStorage.setItem("kpb.my-role", JSON.stringify(role.data))
            setErrorMessage(null)
            // router.push(searchParam.get("callbackUrl") || "/");
            window.location.href = searchParam.get("callbackUrl") || "/"
            setLoading(false)
        }
    }

    React.useEffect(() => {
        if (searchParam.get("msg")) {
            setErrorMessage(searchParam.get("msg") as string)
        }
        if (session) {
            window.location.href = searchParam.get("callbackUrl") || "/"
        }
    }, [])

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <Link href="/">
                                <div className="flex items-center justify-center rounded-md">
                                    <div className="p-2 dark:bg-gray-100 rounded-xl">
                                        <Image
                                            src={logo}
                                            priority
                                            width={120}
                                            height={30}
                                            alt="logo"
                                            style={{
                                                width: "auto",
                                                height: "auto",
                                            }}
                                        />
                                    </div>
                                </div>
                                <span className="sr-only">e-KPB</span>
                            </Link>
                            <h1 className="text-xl font-bold">
                                Selamat Datang di e-KPB
                            </h1>
                            <div className="text-sm text-center">
                                Belum Punya akun ?{" "}
                                <Link
                                    className="underline underline-offset-4"
                                    href={"/register"}
                                >
                                    Daftar Disini
                                </Link>
                            </div>
                        </div>
                        {errorMessage && (
                            <Alert
                                variant="destructive"
                                className="bg-red-500 text-white"
                            >
                                <LogInIcon className="h-4 w-4" />
                                <AlertTitle className="font-semibold">
                                    Kesalahan
                                </AlertTitle>
                                <AlertDescription>
                                    {errorMessage}
                                </AlertDescription>
                            </Alert>
                        )}
                        <div className="flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama Pengguna</FormLabel>
                                        <FormControl>
                                            <Input
                                                readOnly={loading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Nama Pengguna Terdiri dari 6-16
                                            Karakter
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Kata Sandi</FormLabel>
                                        <FormControl>
                                            <Input
                                                readOnly={loading}
                                                {...field}
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Kata Sandi Terdiri dari 8-16
                                            Karakter
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full"
                            >
                                Login
                            </Button>
                        </div>
                        <div className="relative text-sm text-center after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                            <span className="relative z-10 px-2 bg-background text-muted-foreground">
                                atau login dengan
                            </span>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2">
                            <Button
                                variant="outline"
                                type="button"
                                className="w-full"
                                disabled={loading}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                                        fill="currentColor"
                                    />
                                </svg>
                                Lanjutkan dengan Apple
                            </Button>
                            <Button
                                variant="outline"
                                type="button"
                                className="w-full"
                                disabled={loading}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                        fill="currentColor"
                                    />
                                </svg>
                                Lanjutkan dengan Google
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
                Dengan klik Login, Anda setuju dengan{" "}
                <Link href="/syarat-ketentuan">Syarat dan Ketentuan</Link> and{" "}
                <Link href="/kebijakan-privasi">Kebijakan Privacy</Link>.
            </div>
        </div>
    )
}
