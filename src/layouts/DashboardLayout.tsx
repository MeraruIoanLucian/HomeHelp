import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'
import GradientButton from '../components/GradientButton'

// Layout comun pt paginile cu sidebar (dashboard, etc.)
export default function DashboardLayout() {
    const { profile } = useAuth()
    const location = useLocation()
    const isHelper = profile?.role === 'helper'

    // linkurile din sidebar - difera in functie de rol
    const sidebarLinks = [
        { to: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
        ...(isHelper
            ? [{ to: '/helped-jobs', icon: 'work', label: 'Marketplace' }]
            : [{ to: '/create-job', icon: 'add_circle', label: 'Create Job' }]
        ),
        { to: '/helped-jobs', icon: 'pending_actions', label: 'My Jobs' },
        { to: '/chat', icon: 'chat', label: 'Messages' },
        { to: '/profile', icon: 'settings', label: 'Settings' },
    ]

    const mobileNav = [
        { to: '/dashboard', icon: 'home', label: 'Home' },
        { to: isHelper ? '/helped-jobs' : '/create-job', icon: isHelper ? 'search' : 'add_circle', label: isHelper ? 'Browse' : 'Create' },
        { to: '/helped-jobs', icon: 'pending_actions', label: 'Activity' },
        { to: '/profile', icon: 'person', label: 'Profile' },
    ]

    return (
        <div className="min-h-screen" style={{ background: 'var(--brand-bg)', fontFamily: 'var(--font-body)' }}>

            {/* Top navbar */}
            <header className="fixed top-0 w-full z-50 glass-bg">
                <div className="flex justify-between items-center h-20 px-6 md:px-12 max-w-screen-2xl mx-auto">
                    <Logo to="/dashboard" />

                    {/* Linkuri desktop */}
                    <nav className="hidden md:flex items-center gap-8" style={{ fontFamily: 'var(--font-heading)' }}>
                        {!isHelper && (
                            <Link to="/create-job" className="font-bold tracking-tight transition-colors duration-200" style={{ color: 'var(--brand-muted)' }}
                                onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--brand-dark)'}
                                onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--brand-muted)'}>
                                Create Job
                            </Link>
                        )}
                        <Link to="/helped-jobs" className="font-bold tracking-tight transition-colors duration-200" style={{ color: 'var(--brand-muted)' }}
                            onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--brand-dark)'}
                            onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--brand-muted)'}>
                            My Jobs
                        </Link>
                        <Link to="/chat" className="font-bold tracking-tight transition-colors duration-200" style={{ color: 'var(--brand-muted)' }}
                            onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--brand-dark)'}
                            onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--brand-muted)'}>
                            Chats
                        </Link>
                    </nav>

                    <div className="flex items-center gap-3">
                        {!isHelper && (
                            <GradientButton to="/create-job" size="sm" className="hidden md:flex">
                                Create Job
                            </GradientButton>
                        )}
                        <Link to="/profile" className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center"
                            style={{ background: profile?.avatar_url ? 'transparent' : '#EFE9E3', border: '2px solid #D9CFC7' }}>
                            {profile?.avatar_url ? (
                                <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <span className="material-symbols-outlined text-lg" style={{ color: '#6b5e50' }}>person</span>
                            )}
                        </Link>
                    </div>
                </div>
            </header>

            {/* Sidebar - doar pe desktop */}
            <aside className="hidden md:flex flex-col fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 z-40 p-4 overflow-y-auto"
                style={{ background: '#F3F1EE', borderRight: '1px solid #E8E2DA' }}>
                <div className="flex items-center gap-3 px-4 py-6 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#C9B59C30' }}>
                        <span className="material-symbols-outlined" style={{ color: '#C9B59C', fontVariationSettings: "'FILL' 1" }}>
                            {isHelper ? 'engineering' : 'person'}
                        </span>
                    </div>
                    <div>
                        <div className="font-semibold text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#2c2419' }}>
                            {profile?.full_name ?? 'User'}
                        </div>
                        <div className="text-xs" style={{ color: '#6b5e50' }}>{isHelper ? 'Technician' : 'Homeowner'}</div>
                    </div>
                </div>

                <nav className="flex-1 space-y-1">
                    {sidebarLinks.map((item, i) => {
                        const isActive = location.pathname === item.to
                        return (
                            <Link key={i} to={item.to}
                                className="flex items-center gap-3 rounded-xl px-4 py-3 mb-1 text-sm font-semibold transition-all duration-200 hover:translate-x-1"
                                style={{
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    background: isActive ? '#FFFFFF' : 'transparent',
                                    color: isActive ? '#2c2419' : '#6b5e50',
                                    boxShadow: isActive ? '0 2px 8px rgba(44,36,25,0.06)' : 'none',
                                }}>
                                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>
            </aside>

            {/* Continut pagina */}
            <main className="flex-1 md:ml-64 pt-20">
                <Outlet />
            </main>

            {/* Navigare mobil */}
            <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 md:hidden"
                style={{
                    background: 'rgba(249, 248, 246, 0.9)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                    boxShadow: '0 -10px 30px rgba(44,36,25,0.04)', borderTop: '1px solid #E8E2DA', borderRadius: '2rem 2rem 0 0',
                }}>
                {mobileNav.map((tab, i) => {
                    const isActive = location.pathname === tab.to
                    return (
                        <Link key={i} to={tab.to} className="flex flex-col items-center justify-center px-5 py-2"
                            style={{ color: isActive ? '#2c2419' : '#6b5e50', background: isActive ? '#EFE9E3' : 'transparent', borderRadius: '1rem' }}>
                            <span className="material-symbols-outlined mb-1" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                                {tab.icon}
                            </span>
                            <span className="text-[10px] font-medium">{tab.label}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="md:ml-64">
                <footer className="pt-20 pb-24 md:pb-10 px-6 md:px-12" style={{ background: '#F3F1EE', borderTop: '1px solid #E8E2DA' }}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-screen-2xl mx-auto">
                        <div className="col-span-2 md:col-span-1">
                            <div className="mb-4">
                                <Logo size="sm" to="/dashboard" />
                            </div>
                            <p className="text-sm leading-relaxed" style={{ color: '#6b5e50' }}>
                                Connecting homeowners with artisanal excellence.
                            </p>
                        </div>
                        {[
                            { title: 'Directory', links: ['About Us', 'Service Directory', 'Technician Portal'] },
                            { title: 'Support', links: ['Help Center', 'Privacy Policy', 'Terms of Service'] },
                        ].map((col, i) => (
                            <div key={i}>
                                <h5 className="font-bold mb-6 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#2c2419' }}>{col.title}</h5>
                                <ul className="space-y-3">
                                    {col.links.map((link) => (
                                        <li key={link}>
                                            <a href="#" className="text-sm transition-colors duration-200" style={{ color: '#6b5e50' }}
                                                onMouseEnter={e => (e.target as HTMLElement).style.color = '#2c2419'}
                                                onMouseLeave={e => (e.target as HTMLElement).style.color = '#6b5e50'}>
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        <div className="col-span-2 md:col-span-4 mt-8 pt-8 text-center" style={{ borderTop: '1px solid #E8E2DA50' }}>
                            <p className="text-xs" style={{ color: '#6b5e5080' }}>© 2026 HomeHelp. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}
