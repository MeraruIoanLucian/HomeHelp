import { Link } from 'react-router-dom'

interface EmptyStateProps {
    title: string
    description: string
    actionLabel?: string
    actionTo?: string
}

export default function EmptyState({
    title,
    description,
    actionLabel,
    actionTo,
}: EmptyStateProps) {
    return (
        <div
            className="rounded-[2rem] p-12 text-center"
            style={{ background: '#FFFFFF', boxShadow: '0 24px 48px rgba(44,36,25,0.04)' }}
        >
            <span className="material-symbols-outlined text-5xl mb-4 block" style={{ color: 'var(--brand-accent)' }}>
                inbox
            </span>
            <h3
                className="text-xl font-bold mb-2"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--brand-dark)' }}
            >
                {title}
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--brand-muted)' }}>
                {description}
            </p>
            {actionLabel && actionTo && (
                <Link
                    to={actionTo}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm"
                    style={{ background: 'var(--brand-accent)', color: 'var(--brand-dark)' }}
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                    {actionLabel}
                </Link>
            )}
        </div>
    )
}
