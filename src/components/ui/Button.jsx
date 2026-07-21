import React from 'react'
import { cn } from '@/lib/utils'

export const Button = React.forwardRef(({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium font-display transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-brand-gold/50 disabled:opacity-50 disabled:pointer-events-none'
  
  const variants = {
    default: 'bg-brand-gold hover:bg-brand-goldDark text-brand-dark shadow-md hover:shadow-lg hover:shadow-brand-gold/10 font-semibold',
    outline: 'border border-white/10 hover:border-brand-gold/30 hover:bg-white/5 text-slate-200',
    ghost: 'hover:bg-white/5 text-slate-300 hover:text-white',
    link: 'text-brand-gold hover:text-brand-goldDark underline-offset-4 hover:underline'
  }

  const sizes = {
    default: 'h-10 px-5 py-2 text-sm',
    sm: 'h-8 px-3 text-xs',
    lg: 'h-12 px-6 text-base',
    icon: 'h-10 w-10'
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})
Button.displayName = 'Button'
