import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

interface GradientButtonProps {
    children: ReactNode
    to?: string
    onClick?: () => void
    icon?: string
    loading?: boolean
    disabled?: boolean
    type?: 'button' | 'submit'
    variant?: 'primary' | 'secondary' | 'outline'
    fullWidth?: boolean
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

const sizeMap = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg',
}

const variantMap = {
    primary: {
        background: 'linear-gradient(135deg, var(--brand-dark), var(--brand-dark-secondary))',
        color: 'var(--brand-bg)',
        boxShadow: '0 12px 24px rgba(44, 36, 25, 0.15)',
    },
    secondary: {
        background: 'var(--brand-accent)',
        color: 'var(--brand-dark)',
        boxShadow: 'none',
    },
    outline: {
        background: 'transparent',
        color: 'var(--brand-dark)',
        boxShadow: 'none',
        border: '2px solid var(--brand-border)',
    },
}

export default function GradientButton({
    children,
    to,
    onClick,
    icon,
    loading = false,
    disabled = false,
    type = 'button',
    variant = 'primary',
    fullWidth = false,
    size = 'md',
    className = '',
}: GradientButtonProps) {
    const baseClasses = `${sizeMap[size]} font-bold rounded-xl inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${fullWidth ? 'w-full' : ''} ${className}`
    const style = variantMap[variant]

    const content = (
        <>
            {loading ? (
                <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
            ) : icon ? (
                <span className="material-symbols-outlined text-sm">{icon}</span>
            ) : null}
            {children}
        </>
    )

    if (to) {
        return (
            <Link to={to} className={baseClasses} style={style}>
                {content}
            </Link>
        )
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={baseClasses}
            style={style}
        >
            {content}
        </button>
    )
}
