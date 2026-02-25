import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth, type UserRole } from '../context/AuthContext'
import AuthLayout from '../components/AuthLayout'
import Grainient from '../components/Grainient'

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

    const roleBtn = (value: UserRole, label: string) => (
        <button
            type="button"
            onClick={() => setRole(value)}
            className={`py-3 rounded-lg border text-sm font-medium transition-colors ${role === value
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-surface-200 text-surface-700 hover:border-surface-300'
                }`}
        >
            {label}
        </button>
    )

    return (
        <div className="relative min-h-screen">
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
            <div className="relative z-10">
                <AuthLayout title="Create your account">
                    {error && <p className="error-msg">{error}</p>}

                    <input type="text" placeholder="Full name" value={fullName}
                        onChange={e => setFullName(e.target.value)} required className="input" />

                    <input type="email" placeholder="Email" value={email}
                        onChange={e => setEmail(e.target.value)} required className="input" />

                    <input type="password" placeholder="Password (min 6 characters)" value={password}
                        onChange={e => setPassword(e.target.value)} required minLength={6} className="input" />

                    <fieldset className="space-y-2">
                        <legend className="text-sm font-medium text-surface-700">I am a...</legend>
                        <div className="grid grid-cols-2 gap-3">
                            {roleBtn('helped', '🏠 Homeowner')}
                            {roleBtn('helper', '🔧 Technician')}
                        </div>
                    </fieldset>

                    <button type="submit" disabled={loading} className="btn-primary"
                        onClick={handleSubmit}>
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </button>

                    <p className="text-sm text-surface-700 text-center">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary-600 hover:underline">Sign in</Link>
                    </p>
                </AuthLayout>
            </div>
        </div>
    )
}
