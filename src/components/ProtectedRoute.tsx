import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface-50">
                <p className="text-surface-700">Loading...</p>
            </div>
        )
    }

    if (!user) return <Navigate to="/login" replace />

    return <>{children}</>
}
