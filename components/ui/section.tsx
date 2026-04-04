import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode
    containerClassName?: string
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
    ({ className, containerClassName, children, ...props }, ref) => {
        return (
            <section ref={ref} className={cn("industrial-divider relative py-20 md:py-28", className)} {...props}>
                <div className={cn("container relative z-10 mx-auto max-w-7xl px-4 sm:px-6", containerClassName)}>
                    {children}
                </div>
            </section>
        )
    }
)
Section.displayName = "Section"
