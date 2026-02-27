import HeroBackground from '../components/HeroBackground'
import { Link } from 'react-router-dom'
export default function NotFoundPage() {
    return (
        <HeroBackground className="relative min-h-screen">
            <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
            <p className="text-xl text-surface-700 mb-6">Page not found</p>
            <Link
                to="/home"
                className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-[var(--radius-button)] hover:bg-primary-700 transition-colors"
            >
                Go Home
            </Link>
        </HeroBackground>
    )
}
