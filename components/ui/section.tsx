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
                <div className={cn("container mx-auto px-6 max-w-7xl relative z-10", containerClassName)}>
                    {children}
                </div>
            </section>
        )
    }
)
Section.displayName = "Section"
