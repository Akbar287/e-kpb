"use client"
import { CreditCardIcon, Tractor, Users } from "lucide-react"
import React from "react"
import { TrendingUp } from "lucide-react"
import {
    Bar,
    BarChart,
    CartesianGrid,
    Label,
    Pie,
    PieChart,
    XAxis,
} from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const kurChartConfig = {
    desktop: {
        label: "Petani",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Peternak",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

const kurChartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const penerimaBeasiswa = [
    { browser: "Unila", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "Polinela", visitors: 200, fill: "var(--color-safari)" },
]

const beasiswaChartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Unila",
        color: "hsl(var(--chart-1))",
    },
    safari: {
        label: "Polinela",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

const kegiatanPenyuluhan = [
    { browser: "Lampung Barat", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "Lampung Utara", visitors: 200, fill: "var(--color-safari)" },
]

const penyuluhanChartConfig = {
    visitors: {
        label: "Kegiatan",
    },
    chrome: {
        label: "Lampung Barat",
        color: "hsl(var(--chart-1))",
    },
    safari: {
        label: "Lampung Utara",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

const Page = () => {
    const totalVisitors = React.useMemo(() => {
        return penerimaBeasiswa.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [])

    return (
        <section id="stats" className="py-20">
            <div className="container px-4 mx-auto">
                <div className="max-w-4xl mx-auto overflow-hidden clay-card rounded-2xl ">
                    <div className="p-8 bg-gradient-to-br from-green-300 via-green-800 to-green-500 dark:from-green-800 dark:via-green-600 dark:to-green-900 edge-light">
                        <h2 className="mb-12 text-3xl font-bold text-center text-gray-50 dark:text-gray-900">
                            Perkembangan Informasi Kami
                        </h2>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div className="p-6 clay-card rounded-xl bg-white/10 backdrop-blur-lg">
                                <div className="flex items-center justify-center mb-4">
                                    <Users className="w-12 h-12" />
                                </div>
                                <div className="text-center">
                                    <div className="mb-2 text-4xl font-bold">
                                        782,938
                                    </div>
                                    <div className="text-primary-light">
                                        Aktif Pengguna
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 clay-card rounded-xl bg-white/10 backdrop-blur-lg">
                                <div className="flex items-center justify-center mb-4">
                                    <Tractor className="w-12 h-12" />
                                </div>
                                <div className="text-center">
                                    <div className="mb-2 text-4xl font-bold">
                                        120
                                    </div>
                                    <div className="text-primary-light">
                                        Ton Pupuk Bersubsidi
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 clay-card rounded-xl bg-white/10 backdrop-blur-lg">
                                <div className="flex items-center justify-center mb-4">
                                    <CreditCardIcon className="w-12 h-12" />
                                </div>
                                <div className="text-center">
                                    <div className="mb-2 text-4xl font-bold">
                                        Rp. 120 T
                                    </div>
                                    <div className="text-primary-light">
                                        Kredit Usaha Rakyat
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Card className="max-w-4xl mx-auto mt-5 overflow-hidden clay-card rounded-2xl">
                    <CardHeader>
                        <CardTitle> Pemberian Kredit</CardTitle>
                        <CardDescription>January - Juni 2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={kurChartConfig}>
                            <BarChart accessibilityLayer data={kurChartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent indicator="dashed" />
                                    }
                                />
                                <Bar
                                    dataKey="desktop"
                                    fill="var(--color-desktop)"
                                    radius={4}
                                />
                                <Bar
                                    dataKey="mobile"
                                    fill="var(--color-mobile)"
                                    radius={4}
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2 text-sm">
                        <div className="flex gap-2 font-medium leading-none">
                            Kenaikan sebesar 5.2 % Semester Awal 2024
                            <TrendingUp className="w-4 h-4" />
                        </div>
                        <div className="leading-none text-muted-foreground">
                            Menampilkan total data selama 6 bulan
                        </div>
                    </CardFooter>
                </Card>
                <div className="grid max-w-4xl grid-cols-2 gap-2 mx-auto mt-5">
                    <Card className="mt-5 overflow-hidden clay-card rounded-2xl">
                        <CardHeader className="items-center pb-0">
                            <CardTitle>Penerima Beasiswa</CardTitle>
                            <CardDescription>
                                January - Juni 2024
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 pb-0">
                            <ChartContainer
                                config={beasiswaChartConfig}
                                className="mx-auto aspect-square max-h-[250px]"
                            >
                                <PieChart>
                                    <ChartTooltip
                                        cursor={false}
                                        content={
                                            <ChartTooltipContent hideLabel />
                                        }
                                    />
                                    <Pie
                                        data={penerimaBeasiswa}
                                        dataKey="visitors"
                                        nameKey="browser"
                                        innerRadius={60}
                                        strokeWidth={5}
                                    >
                                        <Label
                                            content={({ viewBox }) => {
                                                if (
                                                    viewBox &&
                                                    "cx" in viewBox &&
                                                    "cy" in viewBox
                                                ) {
                                                    return (
                                                        <text
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            textAnchor="middle"
                                                            dominantBaseline="middle"
                                                        >
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={viewBox.cy}
                                                                className="text-3xl font-bold fill-foreground"
                                                            >
                                                                {totalVisitors.toLocaleString()}
                                                            </tspan>
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={
                                                                    (viewBox.cy ||
                                                                        0) + 24
                                                                }
                                                                className="fill-muted-foreground"
                                                            >
                                                                Mahasiswa
                                                            </tspan>
                                                        </text>
                                                    )
                                                }
                                            }}
                                        />
                                    </Pie>
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2 font-medium leading-none">
                                Penerima Beasiswa meningkat 5.2% tahun ini.
                                <TrendingUp className="w-4 h-4" />
                            </div>
                            <div className="leading-none text-muted-foreground">
                                Menampilkan total data selama 6 bulan
                            </div>
                        </CardFooter>
                    </Card>
                    <Card className="mt-5 overflow-hidden clay-card rounded-2xl">
                        <CardHeader className="items-center pb-0">
                            <CardTitle>Kegiatan Penyuluhan</CardTitle>
                            <CardDescription>
                                January - Juni 2024
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 pb-0">
                            <ChartContainer
                                config={penyuluhanChartConfig}
                                className="mx-auto aspect-square max-h-[250px]"
                            >
                                <PieChart>
                                    <ChartTooltip
                                        cursor={false}
                                        content={
                                            <ChartTooltipContent hideLabel />
                                        }
                                    />
                                    <Pie
                                        data={kegiatanPenyuluhan}
                                        dataKey="visitors"
                                        nameKey="browser"
                                        innerRadius={60}
                                        strokeWidth={5}
                                    >
                                        <Label
                                            content={({ viewBox }) => {
                                                if (
                                                    viewBox &&
                                                    "cx" in viewBox &&
                                                    "cy" in viewBox
                                                ) {
                                                    return (
                                                        <text
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            textAnchor="middle"
                                                            dominantBaseline="middle"
                                                        >
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={viewBox.cy}
                                                                className="text-3xl font-bold fill-foreground"
                                                            >
                                                                {totalVisitors.toLocaleString()}
                                                            </tspan>
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={
                                                                    (viewBox.cy ||
                                                                        0) + 24
                                                                }
                                                                className="fill-muted-foreground"
                                                            >
                                                                Kegiatan
                                                            </tspan>
                                                        </text>
                                                    )
                                                }
                                            }}
                                        />
                                    </Pie>
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2 font-medium leading-none">
                                Kegiatan penyuluhan meningkat 5.2% awal semester
                                ini.
                                <TrendingUp className="w-4 h-4" />
                            </div>
                            <div className="leading-none text-muted-foreground">
                                Menampilkan total data selama 6 bulan
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default Page
