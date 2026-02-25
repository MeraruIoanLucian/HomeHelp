import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import CardNav from '../components/CardNav'
import logo from '../assets/HomeHelpLogo.png'

export default function DashboardPage() {
    const { profile, signOut } = useAuth()
    const navigate = useNavigate()

    async function handleSignOut() {
        await signOut()
        navigate('/')
    }

    const navItems = [
        {
            label: 'Jobs',
            bgColor: '#0D0716',
            textColor: '#fff',
            links: [
                { label: 'Browse Jobs', href: '/jobs', ariaLabel: 'Browse available jobs' },
                { label: 'Post a Job', href: '/jobs/new', ariaLabel: 'Post a new job' }
            ]
        },
        {
            label: 'Messages',
            bgColor: '#170D27',
            textColor: '#fff',
            links: [
                { label: 'Inbox', href: '/messages', ariaLabel: 'View messages' },
                { label: 'Notifications', href: '/notifications', ariaLabel: 'View notifications' }
            ]
        },
        {
            label: 'Account',
            bgColor: '#271E37',
            textColor: '#fff',
            links: [
                { label: 'Profile', href: '/profile', ariaLabel: 'Edit profile' },
                { label: 'Settings', href: '/settings', ariaLabel: 'Account settings' }
            ]
        }
    ]

    return (
        <div className="min-h-screen bg-surface-50">
            <CardNav
                logo={logo}
                logoAlt="HomeHelp"
                items={navItems}
                baseColor="#fff"
                menuColor="#000"
                buttonBgColor="#111"
                buttonTextColor="#fff"
                ease="power3.out"
            />

            <div className="pt-24 px-8">
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
        </div>
    )
}
