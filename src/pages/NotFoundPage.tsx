export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-surface-50 px-4">
            <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
            <p className="text-xl text-surface-700 mb-6">Page not found</p>
            <a
                href="/"
                className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-[var(--radius-button)] hover:bg-primary-700 transition-colors"
            >
                Go Home
            </a>
        </div>
    )
}
