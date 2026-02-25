import type { ReactNode } from 'react'

export default function AuthLayout({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent px-4">
            <form className="w-full max-w-sm bg-white rounded-xl shadow-sm p-8 space-y-5">
                <h1 className="text-2xl font-bold text-surface-900 text-center">{title}</h1>
                {children}
            </form>
        </div>
    )
}
