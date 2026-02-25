import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import CardNav from '../components/CardNav'
import logo from '../assets/HomeHelpLogo.png'
import Grainient from '../components/Grainient'

export default function HomePage() {
    const { profile, signOut } = useAuth()
    const navigate = useNavigate()

    async function handleSignOut() {
        await signOut()
        navigate('/')
    }

    const navItems = [
        {
            label: 'Jobs',
            bgColor: '#0f172a',
            textColor: '#fff',
            links: [
                { label: 'Browse Jobs', href: '/jobs', ariaLabel: 'Browse available jobs' },
                { label: 'Post a Job', href: '/jobs/new', ariaLabel: 'Post a new job' }
            ]
        },
        {
            label: 'Messages',
            bgColor: '#0f172a',
            textColor: '#fff',
            links: [
                { label: 'Inbox', href: '/messages', ariaLabel: 'View messages' },
                { label: 'Notifications', href: '/notifications', ariaLabel: 'View notifications' }
            ]
        },
        {
            label: 'Account',
            bgColor: '#0f172a',
            textColor: '#fff',
            links: [
                { label: 'Profile', href: '/profile', ariaLabel: 'Edit profile' },
                { label: 'Settings', href: '/settings', ariaLabel: 'Account settings' }
            ]
        }
    ]

    return (
        <div className="relative min-h-screen">

            <div className="absolute inset-0">
                <Grainient
                    color1="#a6f9d9"
                    color2="#2563eb"
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
            <div className="relative z-10 min-h-screen">
                <CardNav
                    logo={logo}
                    logoAlt="HomeHelp"
                    items={navItems}
                    baseColor="#fff"
                    menuColor="#0f172a"
                    buttonBgColor="#0f172a"
                    buttonTextColor="#fff"
                    buttonLabel="Sign Out"
                    onButtonClick={handleSignOut}
                    ease="power3.out"
                />

                <div className="pt-32 px-110 ">
                    <div className="max-w-2xl mx-auto">
                        <div className="rounded-xl bg-white/30 backdrop-blur p-2 justify-center mb-6">
                            <div className="flex justify-center">
                                <h1 className="text-4xl font-bold text-[#fff]">Home</h1>
                            </div>
                        </div>
                        {profile && (
                            <div className="bg-white/30 backdrop-blur rounded-xl shadow-sm p-6">
                                <p className="text-2xl font-medium text-[#fff]">{profile.full_name}</p>
                                <p className="text-lg text-[#fff] mt-1">
                                    Role: <span className="font-medium capitalize">{profile.role === 'helped' ? '🏠 Homeowner' : '🔧 Technician'}</span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
