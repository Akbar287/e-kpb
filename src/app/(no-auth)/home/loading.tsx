import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
    return (
        <React.Fragment>
            <section className="py-20 glow">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1">
                            <Skeleton className="w-full h-[40px] rounded-full" />
                            <Skeleton className="w-full h-[80px] mb-8 rounded-full" />

                            <div className="flex gap-4">
                                <Skeleton className="w-[50px] h-[40px] rounded-full" />
                                <Skeleton className="w-[50px] h-[40px] rounded-full" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="clay-card p-4 rounded-2xl isometric">
                                <Skeleton className="w-full h-[160px] rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Loading
