import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

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
        <div className="min-h-screen flex items-center justify-center bg-surface-50 px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-xl shadow-sm p-8 space-y-5">
                <h1 className="text-2xl font-bold text-surface-900 text-center">Welcome back</h1>

                {error && (
                    <p className="text-sm text-danger-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>

                <p className="text-sm text-surface-700 text-center">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary-600 hover:underline">Sign up</Link>
                </p>
            </form>
        </div>
    )
}
