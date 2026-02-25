import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function DashboardPage() {
    const { profile, signOut } = useAuth()
    const navigate = useNavigate()

    async function handleSignOut() {
        await signOut()
        navigate('/')
    }

    return (
        <div className="min-h-screen bg-surface-50 p-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-surface-900">Dashboard</h1>
                    <button
                        onClick={handleSignOut}
                        className="px-4 py-2 text-sm text-surface-700 border border-surface-200 rounded-lg hover:bg-surface-100 transition-colors"
                    >
                        Sign Out
                    </button>
                </div>

                {profile && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <p className="text-lg font-medium text-surface-900">{profile.full_name}</p>
                        <p className="text-sm text-surface-700 mt-1">
                            Role: <span className="font-medium capitalize">{profile.role === 'helped' ? '🏠 Homeowner' : '🔧 Technician'}</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
