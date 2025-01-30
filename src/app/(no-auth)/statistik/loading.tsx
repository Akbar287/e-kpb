import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
    return (
        <React.Fragment>
            <section id="stats" className="py-20">
                <div className="container px-4 mx-auto">
                    <div className="max-w-4xl mx-auto overflow-hidden clay-card rounded-2xl ">
                        <Skeleton className="w-full h-52" />
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Loading
