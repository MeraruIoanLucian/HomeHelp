import type { ReactNode } from 'react'

interface NavbarProps {
    children?: ReactNode
}

export default function Navbar({ children }: NavbarProps) {
    return (
        <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-5 z-20 text-white">
            <span className="text-2xl font-extrabold tracking-tight text-white">
                Home<span style={{ color: '#e94560' }}>Help</span>
            </span>
            <div className="flex gap-3">
                {children}
            </div>
        </nav>
    )
}
