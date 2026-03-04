import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "metallic"
    size?: "default" | "sm" | "lg" | "icon"
}

const buttonVariants = {
    base: "inline-flex items-center justify-center whitespace-nowrap rounded-industrial font-teko uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-industrial-400 disabled:pointer-events-none disabled:opacity-50",
    variants: {
        variant: {
            default: "bg-industrial-800 text-steel-light hover:bg-industrial-800/80 shadow-md",
            metallic: "bg-gradient-to-b from-steel-light to-steel-metallic text-industrial-950 font-bold hover:brightness-110 shadow-[0_0_15px_rgba(255,255,255,0.1)]",
            outline: "border border-industrial-400 text-steel-light hover:bg-industrial-800 hover:text-steel-light",
            ghost: "hover:bg-industrial-800/50 hover:text-steel-light",
        },
        size: {
            default: "h-10 px-6 py-2 text-lg",
            sm: "h-8 px-4 text-base",
            lg: "h-12 px-10 text-xl",
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
