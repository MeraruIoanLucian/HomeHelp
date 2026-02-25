import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthLayout from '../components/AuthLayout'
import Grainient from '../components/Grainient'


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
        <div className="relative min-h-screen">
            {/* Background */}
            <div className="absolute inset-0">
                <Grainient
                    color1="#a6f9d9"
                    color2="#2b34ff"
                    color3="#f1c9fe"
                    timeSpeed={0.6}
                    colorBalance={0.11}
                    warpStrength={2.85}
                    warpFrequency={0.6}
                    warpSpeed={2}
                    warpAmplitude={50}
                    blendAngle={-80}
                    blendSoftness={0.47}
                    rotationAmount={1440}
                    noiseScale={0.2}
                    grainAmount={0}
                    grainScale={3.8}
                    grainAnimated
                    contrast={1.5}
                    gamma={1}
                    saturation={1}
                    centerX={0}
                    centerY={0}
                    zoom={0.75}
                />
            </div>

            {/* Content */}
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
        </div>
    )
}
