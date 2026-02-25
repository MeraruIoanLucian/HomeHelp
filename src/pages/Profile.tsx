import { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import CardNav from '../components/CardNav'
import logo from '../assets/HomeHelpLogo.png'
import Grainient from '../components/Grainient'

export default function ProfilePage() {
    const { profile, user, signOut, refreshProfile } = useAuth()
    const navigate = useNavigate()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [uploading, setUploading] = useState(false)

    async function handleSignOut() {
        await signOut()
        navigate('/')
    }

    async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file || !user) return

        setUploading(true)
        try {
            const fileExt = file.name.split('.').pop()
            const filePath = `${user.id}/avatar.${fileExt}`

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, { upsert: true })

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath)

            const { error: updateError } = await supabase
                .from('profiles')
                .update({ avatar_url: publicUrl })
                .eq('id', user.id)

            if (updateError) throw updateError

            await refreshProfile()
        } catch (err) {
            console.error('Avatar upload failed:', err)
        } finally {
            setUploading(false)
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
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
                                <h1 className="text-4xl font-bold text-[#fff]">Profile</h1>
                            </div>
                        </div>

                        {/* Avatar upload circle */}
                        <div className="flex flex-col items-center mb-6">
                            <div
                                className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer group"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {profile?.avatar_url ? (
                                    <img
                                        src={profile.avatar_url}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-white/30 backdrop-blur flex items-center justify-center">
                                        <span className="text-5xl text-white/80">
                                            {profile?.full_name?.charAt(0)?.toUpperCase() || '?'}
                                        </span>
                                    </div>
                                )}

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    {uploading ? (
                                        <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </div>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarUpload}
                                />
                            </div>
                        </div>

                        {profile && (
                            <div className="bg-white/30 backdrop-blur rounded-xl shadow-sm p-6">
                                <p className="text-2xl font-medium text-[#fff] text-center">{profile.full_name}</p>
                                <p className="text-lg text-[#fff] mt-1 text-center">
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
