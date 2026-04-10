import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function AuthLayout({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col" style={{ background: 'var(--brand-bg)' }}>
            <nav className="fixed top-0 w-full z-50 glass-bg">
                <div className="flex justify-between items-center h-20 px-6 md:px-12 max-w-7xl mx-auto">
                    <Logo />
                    <Link
                        to="/"
                        className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-200"
                        style={{ color: 'var(--brand-muted)' }}
                    >
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back
                    </Link>
                </div>
            </nav>

            {/* Form */}
            <div className="flex-1 flex items-center justify-center pt-20 px-4 pb-12">
                <div
                    className="w-full max-w-md rounded-[2rem] p-8 md:p-10"
                    style={{
                        background: '#FFFFFF',
                        boxShadow: '0 24px 48px rgba(44, 36, 25, 0.08)',
                    }}
                >
                    <h1
                        className="text-3xl font-extrabold tracking-tight text-center mb-8"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--brand-dark)' }}
                    >
                        {title}
                    </h1>
                    <div className="space-y-5">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
