import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
    return (
        <React.Fragment>
            <section className="py-20 glow">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                            <Skeleton className="w-full h-[120px] rounded-lg" />
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Loading
