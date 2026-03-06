import HeroBackground from '../components/HeroBackground'
import { Link } from 'react-router-dom'
export default function NotFoundPage() {
    return (
        <HeroBackground className="relative min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-6xl font-bold mb-4" style={{ color: '#C9B59C' }}>404</h1>
            <p className="text-xl mb-6" style={{ color: '#6b5e50' }}>Page not found</p>
            <Link
                to="/dashboard"
                className="px-6 py-3 font-semibold rounded-lg transition-all duration-200 hover:brightness-110"
                style={{ background: '#C9B59C', color: '#2c2419' }}
            >
                Go Home
            </Link>
        </HeroBackground>
    )
}

