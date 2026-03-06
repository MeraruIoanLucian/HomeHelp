import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface NavbarProps {
    children?: ReactNode
}

export default function Navbar({ children }: NavbarProps) {
    const navigate = useNavigate()
    return (
        <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-5 z-20">
            <button className="text-2xl font-extrabold tracking-tight cursor-pointer" style={{ color: '#2c2419' }} onClick={() => navigate('/dashboard')}>
                Home<span style={{ color: '#C9B59C' }}>Help</span>
            </button>
            <div className="flex gap-3">
                {children}
            </div>
        </nav>
    )
}

