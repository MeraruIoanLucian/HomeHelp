import type { ReactNode } from 'react'

interface HeroBackgroundProps {
    children: ReactNode
    className?: string
}

export default function HeroBackground({ children, className = '' }: HeroBackgroundProps) {
    return (
        <div
            className={`overflow-hidden ${className}`}
            style={{
                background: '#F9F8F6',
            }}
        >
            {children}
        </div>
    )
}

