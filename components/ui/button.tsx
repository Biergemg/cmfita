import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "metallic"
    size?: "default" | "sm" | "lg" | "icon"
}

const buttonVariants = {
    base: "inline-flex items-center justify-center whitespace-nowrap rounded-industrial border font-teko uppercase tracking-[0.14em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-industrial-400 disabled:pointer-events-none disabled:opacity-50",
    variants: {
        variant: {
            default: "border-industrial-700 bg-industrial-800/90 text-steel-light hover:-translate-y-0.5 hover:bg-industrial-700 shadow-md",
            metallic: "border-white/15 bg-gradient-to-b from-white via-stone-100 to-zinc-300 text-industrial-950 font-bold hover:-translate-y-0.5 hover:brightness-105 shadow-[0_10px_30px_rgba(248,250,252,0.12)]",
            outline: "border-industrial-500/80 bg-industrial-950/30 text-steel-light hover:-translate-y-0.5 hover:border-signal-copper/60 hover:bg-industrial-800/80 hover:text-steel-light",
            ghost: "border-transparent hover:bg-industrial-800/50 hover:text-steel-light",
        },
        size: {
            default: "h-10 px-6 py-2 text-base",
            sm: "h-8 px-4 text-sm",
            lg: "h-12 px-8 text-lg",
            icon: "h-10 w-10",
        },
    }
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        const compClassName = cn(
            buttonVariants.base,
            buttonVariants.variants.variant[variant],
            buttonVariants.variants.size[size],
            className
        )
        return (
            <button className={compClassName} ref={ref} {...props} />
        )
    }
)
Button.displayName = "Button"
