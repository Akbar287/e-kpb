"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useForm } from "react-hook-form"
import {
    RegisterFormValidation,
    RegisterSkemaValidation,
} from "@/validation/RegisterValidation"
import { zodResolver } from "@hookform/resolvers/zod"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "../ui/textarea"
import { format } from "date-fns"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { CalendarIcon, LogInIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import React from "react"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

export function RegisterForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
    const { toast } = useToast()
    const form = useForm<RegisterFormValidation>({
        resolver: zodResolver(RegisterSkemaValidation),
        defaultValues: {
            username: "",
            password: "",
            nik: "",
            nama: "",
            alamat: "",
            jenisKelamin: undefined,
            tempatLahir: "",
            tanggalLahir: new Date(),
            verified: false,
            email: "",
            pekerjaan: "",
            nomorHp: "",
            nomorWa: "",
        },
    })

    const onSubmit = async (data: RegisterFormValidation) => {
        setErrorMessage(null)
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data,
                tanggalLahir: format(data.tanggalLahir, "yyyy-MM-dd"),
            }),
        })

        if (res.status === 201) {
            toast({
                title: "Registrasi Berhasil",
                description: "Anda sudah Registrasi, Silakan Login ke Aplikasi",
                action: (
                    <ToastAction altText="Ke Halaman Login">
                        <Link href="/login">Login</Link>
                    </ToastAction>
                ),
            })
        } else {
            res.json()
                .then((data) => setErrorMessage(data.message))
                .catch(() => setErrorMessage("Terjadi Kesalahan"))
        }
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn("flex flex-col gap-6", className)}
                {...props}
            >
                {errorMessage && (
                    <Alert
                        variant="destructive"
                        className="bg-red-500 text-white"
                    >
                        <LogInIcon className="h-4 w-4" />
                        <AlertTitle className="font-semibold">
                            Kesalahan
                        </AlertTitle>
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                )}
                <FormField
                    control={form.control}
                    name="nik"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>NIK</FormLabel>
                            <FormControl>
                                <Input
                                    className="border-gray-800 dark:border-gray-100"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                NIK Terdiri dari 16 Angka
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nama"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className="border-gray-800 dark:border-gray-100"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="jenisKelamin"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Jenis Kelamin</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="space-y-2 mt-2"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="PRIA"
                                            id="pria"
                                        />
                                        <Label htmlFor="pria">Pria</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="WANITA"
                                            id="wanita"
                                        />
                                        <Label htmlFor="wanita">Wanita</Label>
                                    </div>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="alamat"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Alamat</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="border-gray-800 dark:border-gray-100"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tempatLahir"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tempat Lahir</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className="border-gray-800 dark:border-gray-100"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tanggalLahir"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Tanggal Lahir</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        className="w-full"
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() ||
                                            date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pekerjaan"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pekerjaan</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className="border-gray-800 dark:border-gray-100"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nomorHp"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nomor HP</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className="border-gray-800 dark:border-gray-100"
                                />
                            </FormControl>
                            <FormDescription>
                                Diawali 08 dan terdiri dari 10-13 Angka
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nomorWa"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nomor WhatsApp</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className="border-gray-800 dark:border-gray-100"
                                />
                            </FormControl>
                            <FormDescription>
                                Diawali 08 dan terdiri dari 10-13 Angka
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className="border-gray-800 dark:border-gray-100"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama Pengguna</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className="border-gray-800 dark:border-gray-100"
                                />
                            </FormControl>
                            <FormDescription>
                                Nama Pengguna Terdiri dari 6-16 Karakter
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
                                    className="border-gray-800 dark:border-gray-100"
                                    {...field}
                                    type="password"
                                />
                            </FormControl>
                            <FormDescription>
                                Kata Sandi Terdiri dari 8-16 Karakter
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Registrasi</Button>
            </form>
            <p className="text-center my-2 font-normal text-lg">
                Sudah Memiliki Akun ? <Link href={"/login"}> Login</Link>
            </p>
        </Form>
    )
}
