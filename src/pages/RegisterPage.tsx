import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth, type UserRole } from '../context/AuthContext'

export default function RegisterPage() {
    const { signUp } = useAuth()
    const navigate = useNavigate()
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState<UserRole>('helped')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')
        setLoading(true)

        const { error } = await signUp(email, password, fullName, role)
        setLoading(false)

        if (error) setError(error)
        else navigate('/dashboard')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface-50 px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-xl shadow-sm p-8 space-y-5">
                <h1 className="text-2xl font-bold text-surface-900 text-center">Create your account</h1>

                {error && (
                    <p className="text-sm text-danger-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
                )}

                <input
                    type="text"
                    placeholder="Full name"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />

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
                    placeholder="Password (min 6 characters)"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full px-4 py-2.5 rounded-lg border border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />

                {/* Role selection */}
                <fieldset className="space-y-2">
                    <legend className="text-sm font-medium text-surface-700">I am a...</legend>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => setRole('helped')}
                            className={`py-3 rounded-lg border text-sm font-medium transition-colors ${role === 'helped'
                                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                                    : 'border-surface-200 text-surface-700 hover:border-surface-300'
                                }`}
                        >
                            🏠 Homeowner
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('helper')}
                            className={`py-3 rounded-lg border text-sm font-medium transition-colors ${role === 'helper'
                                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                                    : 'border-surface-200 text-surface-700 hover:border-surface-300'
                                }`}
                        >
                            🔧 Technician
                        </button>
                    </div>
                </fieldset>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Creating account...' : 'Sign Up'}
                </button>

                <p className="text-sm text-surface-700 text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary-600 hover:underline">Sign in</Link>
                </p>
            </form>
        </div>
    )
}
