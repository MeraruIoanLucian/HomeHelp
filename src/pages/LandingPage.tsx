import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import HeroBackground from '../components/HeroBackground'
import Footer from '../components/Footer'

// ─── Fade-in on scroll hook ───────────────────────
function useFadeIn() {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const node = ref.current
        if (!node) return
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true) },
            { threshold: 0.15 }
        )
        obs.observe(node)
        return () => obs.disconnect()
    }, [])

    return { ref, visible }
}

function FadeSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    const { ref, visible } = useFadeIn()
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
        >
            {children}
        </div>
    )
}

// ─── Data ─────────────────────────────────────────

const useCases = [
    {
        title: 'Need Help at Home?',
        description:
            'Whether it\'s a leaky faucet, a broken appliance, or a full renovation — post your job in seconds and get matched with skilled local technicians who are ready to help.',
        cta: 'Get Started',
        ctaLink: '/register?role=helped',
        icon: '🏠',
    },
    {
        title: 'Are You a Technician?',
        description:
            'Join our network of trusted professionals. Browse available jobs nearby, set your own schedule, and grow your client base — all from one simple platform.',
        cta: 'Join Now',
        ctaLink: '/register?role=helper',
        icon: '🔧',
    },
]

const keywords = [
    { emoji: '⚡', label: 'Fast' },
    { emoji: '🛡️', label: 'Trusted' },
    { emoji: '📍', label: 'Local' },
    { emoji: '💬', label: 'Connected' },
    { emoji: '💰', label: 'Affordable' },
    { emoji: '⭐', label: 'Quality' },
]

const features = [
    {
        title: 'Post a Job in Seconds',
        description:
            'Describe what you need, set your budget, and let HomeHelp do the rest. Our smart matching system connects you with the right technician instantly.',
        image: '📋',
    },
    {
        title: 'Verified Professionals',
        description:
            'Every technician on our platform goes through identity verification and is rated by real customers. You always know who\'s coming to your home.',
        image: '✅',
    },
    {
        title: 'Real-Time Messaging',
        description:
            'Chat directly with your technician to discuss details, share photos of the issue, and coordinate timing — all within the app.',
        image: '💬',
    },
    {
        title: 'Transparent Pricing',
        description:
            'No hidden fees or surprise charges. See upfront estimates, compare quotes, and pay securely through the platform when the job is done.',
        image: '💳',
    },
]

// ─── Component ────────────────────────────────────

export default function LandingPage2() {
    return (
        <div className="font-sans antialiased" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: '#2c2419' }}>

            {/* ══ SECTION 1 — Hero ══ */}
            <HeroBackground className="relative min-h-screen flex flex-col items-center justify-center px-6">

                <Navbar>
                    <Link
                        to="/login"
                        className="px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:brightness-95"
                        style={{ border: '1px solid #D9CFC7', color: '#6b5e50' }}
                    >
                        I have an account
                    </Link>
                    <button
                        onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                        className="px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:brightness-110 cursor-pointer"
                        style={{ background: '#C9B59C', color: '#2c2419' }}
                    >
                        Get Started
                    </button>
                </Navbar>

                {/* Hero Content */}
                <div className="relative z-10 text-center max-w-3xl">
                    <div
                        className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
                        style={{ background: '#C9B59C25', color: '#C9B59C', border: '1px solid #C9B59C40' }}
                    >
                        Your Home, Our Priority
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-extrabold leading-tight mb-6" style={{ color: '#2c2419' }}>
                        Home repairs,{' '}
                        <span style={{ color: '#C9B59C' }}>
                            made simple.
                        </span>
                    </h1>
                    <p className="text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: '#6b5e50' }}>
                        Connect with trusted local technicians for all your home repair needs — fast, reliable, and hassle-free.
                    </p>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 flex flex-col items-center gap-2 animate-bounce" style={{ color: '#C9B59C' }}>
                    <span className="text-xs tracking-widest uppercase">Scroll</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </HeroBackground>

            {/* ══ SECTION 2 — Use Cases ══ */}
            <section
                id="get-started"
                className="py-24 px-6 sm:px-12"
                style={{ background: '#EFE9E3' }}
            >
                <FadeSection>
                    <div className="max-w-6xl mx-auto text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#2c2419' }}>Two Sides, One Platform</h2>
                        <p className="max-w-lg mx-auto" style={{ color: '#6b5e50' }}>
                            Whether you need help or you provide it — HomeHelp brings everyone together.
                        </p>
                    </div>
                </FadeSection>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {useCases.map((uc, i) => (
                        <FadeSection key={i}>
                            <div
                                className="rounded-2xl p-8 sm:p-10 flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
                                style={{
                                    background: '#F9F8F6',
                                    border: '1px solid #D9CFC7',
                                }}
                            >
                                <span className="text-5xl mb-6">{uc.icon}</span>
                                <h3 className="text-2xl font-bold mb-4" style={{ color: '#2c2419' }}>{uc.title}</h3>
                                <p className="leading-relaxed mb-8 flex-1" style={{ color: '#6b5e50' }}>{uc.description}</p>
                                <Link
                                    to={uc.ctaLink}
                                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                                    style={{
                                        background: i === 0 ? '#C9B59C' : '#2c2419',
                                        color: i === 0 ? '#2c2419' : '#EFE9E3',
                                    }}
                                >
                                    {uc.cta} →
                                </Link>
                            </div>
                        </FadeSection>
                    ))}
                </div>
            </section>

            {/* ══ SECTION 3 — Keywords ══ */}
            <section
                className="py-24 px-6 sm:px-12"
                style={{ background: '#F9F8F6' }}
            >
                <FadeSection>
                    <div className="max-w-5xl mx-auto text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#2c2419' }}>Why HomeHelp?</h2>
                        <p className="max-w-md mx-auto" style={{ color: '#6b5e50' }}>
                            Six things that set us apart from the rest.
                        </p>
                    </div>
                </FadeSection>

                <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {keywords.map((kw, i) => (
                        <FadeSection key={i}>
                            <div
                                className="flex flex-col items-center gap-3 rounded-2xl py-8 px-4 transition-all duration-300 hover:-translate-y-1 group cursor-default"
                                style={{
                                    background: '#EFE9E3',
                                    border: '1px solid #D9CFC7',
                                }}
                            >
                                <span
                                    className="text-4xl sm:text-5xl transition-transform duration-300 group-hover:scale-110"
                                >
                                    {kw.emoji}
                                </span>
                                <span className="text-sm sm:text-base font-semibold tracking-wide uppercase" style={{ color: '#6b5e50' }}>{kw.label}</span>
                            </div>
                        </FadeSection>
                    ))}
                </div>
            </section>

            {/* ══ SECTION 4 — Features ══ */}
            <section>
                {features.map((feat, i) => {
                    const isEven = i % 2 === 0

                    return (
                        <div
                            key={i}
                            className="grid grid-cols-1 md:grid-cols-2 min-h-[420px]"
                        >
                            {/* Image / Emoji Side */}
                            <div
                                className={`flex items-center justify-center p-12 ${isEven ? 'md:order-1' : 'md:order-2'}`}
                                style={{ background: isEven ? '#EFE9E3' : '#D9CFC7' }}
                            >
                                <FadeSection>
                                    <span
                                        className="text-8xl sm:text-9xl drop-shadow-lg transition-transform duration-500 hover:scale-110 cursor-default block"
                                    >
                                        {feat.image}
                                    </span>
                                </FadeSection>
                            </div>

                            {/* Text Side */}
                            <div
                                className={`flex items-center p-12 sm:p-16 ${isEven ? 'md:order-2' : 'md:order-1'}`}
                                style={{ background: isEven ? '#D9CFC7' : '#EFE9E3' }}
                            >
                                <FadeSection>
                                    <div className="max-w-md">
                                        <div
                                            className="w-10 h-1 rounded-full mb-6"
                                            style={{ background: '#C9B59C' }}
                                        />
                                        <h3
                                            className="text-2xl sm:text-3xl font-bold mb-4"
                                            style={{ color: '#2c2419' }}
                                        >
                                            {feat.title}
                                        </h3>
                                        <p
                                            className="leading-relaxed text-base sm:text-lg"
                                            style={{ color: '#6b5e50' }}
                                        >
                                            {feat.description}
                                        </p>
                                    </div>
                                </FadeSection>
                            </div>
                        </div>
                    )
                })}
            </section>

            {/* ══ CTA Banner ══ */}
            <section
                className="py-20 px-6 sm:px-12"
                style={{ background: '#2c2419' }}
            >
                <FadeSection>
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: '#EFE9E3' }}>Ready to Get Started?</h2>
                        <p className="max-w-md mx-auto mb-8" style={{ color: '#C9B59C' }}>
                            Join thousands of homeowners and technicians already using HomeHelp.
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <button
                                onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                                className="px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200 hover:brightness-110 cursor-pointer"
                                style={{ background: '#C9B59C', color: '#2c2419' }}
                            >
                                Get Started
                            </button>
                            <Link
                                to="/login"
                                className="px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:brightness-110"
                                style={{ border: '1px solid #C9B59C60', color: '#D9CFC7' }}
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                </FadeSection>
            </section>

            <Footer />
        </div>
    )
}
