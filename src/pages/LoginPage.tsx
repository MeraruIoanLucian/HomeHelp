import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthLayout from '../components/AuthLayout'
import Navbar from '../components/Navbar'
import HeroBackground from '../components/HeroBackground'

export default function LoginPage() {
    const { signIn } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')
        setLoading(true)
        const { error } = await signIn(email, password)
        setLoading(false)
        if (error) setError(error)
        else navigate('/dashboard')
    }

    return (
        <HeroBackground className="relative min-h-screen">
            <Navbar>
                <Link to="/" className="px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:brightness-110 cursor-pointer"
                    style={{ background: '#C9B59C', color: '#2c2419' }}>
                    Back
                </Link>
            </Navbar>
            <div className="relative z-10">
                <AuthLayout title="Welcome back">

                    {error && <p className="error-msg">{error}</p>}

                    <input type="email" placeholder="Email" value={email}
                        onChange={e => setEmail(e.target.value)} required className="input" />

                    <input type="password" placeholder="Password" value={password}
                        onChange={e => setPassword(e.target.value)} required className="input" />

                    <button type="submit" disabled={loading} className="btn-primary"
                        onClick={handleSubmit}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <p className="text-sm text-surface-700 text-center">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary-600 hover:underline">Sign up</Link>
                    </p>
                </AuthLayout>
            </div>
        </HeroBackground>
    )
}
