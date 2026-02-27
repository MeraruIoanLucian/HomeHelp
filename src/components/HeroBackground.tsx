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
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            }}
        >
            {/* Decorative blobs */}
            <div
                className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, #e94560 0%, transparent 70%)', top: '-10%', left: '-10%' }}
            />
            <div
                className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, #0f3460 0%, transparent 70%)', bottom: '-15%', right: '-10%' }}
            />

            {children}
        </div>
    )
}
