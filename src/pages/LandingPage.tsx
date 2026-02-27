import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import HeroBackground from '../components/HeroBackground'

/* ─── Color Palette ─────────────────────────────────
   Hero:       linear-gradient →  #1a1a2e → #16213e → #0f3460
   Use-Cases:  #0d1b2a
   Keywords:   linear-gradient →  #1b2838 → #233554
   Features:   #e0fbfc (light) / #1b2838 (dark) alternating
   Footer:     #0a0f1a
───────────────────────────────────────────────────── */

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
        ctaLink: '/register',
        icon: '🏠',
    },
    {
        title: 'Are You a Technician?',
        description:
            'Join our network of trusted professionals. Browse available jobs nearby, set your own schedule, and grow your client base — all from one simple platform.',
        cta: 'Join Now',
        ctaLink: '/register',
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

const footerLinks = {
    Product: ['Features', 'Pricing', 'How It Works', 'FAQ'],
    Company: ['About Us', 'Careers', 'Blog', 'Press'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
    Support: ['Help Center', 'Contact Us', 'Community'],
}

// ─── Component ────────────────────────────────────

export default function LandingPage2() {
    return (
        <div className="font-sans text-white antialiased" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>

            {/* ╔══════════════════════════════════════════╗
          ║  SECTION 1 — Hero                        ║
          ╚══════════════════════════════════════════╝ */}
            <HeroBackground className="relative min-h-screen flex flex-col items-center justify-center px-6">

                <Navbar>
                    <Link
                        to="/login"
                        className="px-5 py-2 text-sm font-medium rounded-lg border border-white/20 hover:bg-white/10 transition-all duration-200"
                    >
                        I have an account
                    </Link>
                    <button
                        onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                        className="px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:brightness-110 cursor-pointer"
                        style={{ background: 'linear-gradient(135deg, #e94560, #c23152)' }}
                    >
                        Get Started
                    </button>
                </Navbar>

                {/* Hero Content */}
                <div className="relative z-10 text-center max-w-3xl">
                    <div
                        className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
                        style={{ background: 'rgba(233,69,96,0.15)', color: '#e94560', border: '1px solid rgba(233,69,96,0.3)' }}
                    >
                        Your Home, Our Priority
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-extrabold leading-tight mb-6">
                        Home repairs,{' '}
                        <span
                            className="bg-clip-text text-transparent"
                            style={{ backgroundImage: 'linear-gradient(135deg, #e94560, #f5a623)' }}
                        >
                            made simple.
                        </span>
                    </h1>
                    <p className="text-lg sm:text-xl text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
                        Connect with trusted local technicians for all your home repair needs — fast, reliable, and hassle-free.
                    </p>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 flex flex-col items-center gap-2 opacity-50 animate-bounce">
                    <span className="text-xs tracking-widest uppercase">Scroll</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </HeroBackground>

            <section
                id="get-started"
                className="py-24 px-6 sm:px-12"
                style={{ background: '#0d1b2a' }}
            >
                <FadeSection>
                    <div className="max-w-6xl mx-auto text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Two Sides, One Platform</h2>
                        <p className="text-white/50 max-w-lg mx-auto">
                            Whether you need help or you provide it — HomeHelp brings everyone together.
                        </p>
                    </div>
                </FadeSection>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {useCases.map((uc, i) => (
                        <FadeSection key={i}>
                            <div
                                className="rounded-2xl p-8 sm:p-10 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                                style={{
                                    background: 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    backdropFilter: 'blur(10px)',
                                }}
                            >
                                <span className="text-5xl mb-6">{uc.icon}</span>
                                <h3 className="text-2xl font-bold mb-4">{uc.title}</h3>
                                <p className="text-white/60 leading-relaxed mb-8 flex-1">{uc.description}</p>
                                <Link
                                    to={uc.ctaLink}
                                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                                    style={{
                                        background: i === 0
                                            ? 'linear-gradient(135deg, #e94560, #c23152)'
                                            : 'linear-gradient(135deg, #0f3460, #1a5276)',
                                        boxShadow: i === 0
                                            ? '0 4px 20px rgba(233,69,96,0.25)'
                                            : '0 4px 20px rgba(15,52,96,0.4)',
                                    }}
                                >
                                    {uc.cta} →
                                </Link>
                            </div>
                        </FadeSection>
                    ))}
                </div>
            </section>
            <section
                className="py-24 px-6 sm:px-12"
                style={{ background: 'linear-gradient(135deg, #1b2838 0%, #233554 100%)' }}
            >
                <FadeSection>
                    <div className="max-w-5xl mx-auto text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why HomeHelp?</h2>
                        <p className="text-white/50 max-w-md mx-auto">
                            Six things that set us apart from the rest.
                        </p>
                    </div>
                </FadeSection>

                <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {keywords.map((kw, i) => (
                        <FadeSection key={i}>
                            <div
                                className="flex flex-col items-center gap-3 rounded-2xl py-8 px-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group cursor-default"
                                style={{
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                }}
                            >
                                <span
                                    className="text-4xl sm:text-5xl transition-transform duration-300 group-hover:scale-110"
                                >
                                    {kw.emoji}
                                </span>
                                <span className="text-sm sm:text-base font-semibold tracking-wide uppercase text-white/80">{kw.label}</span>
                            </div>
                        </FadeSection>
                    ))}
                </div>
            </section>

            <section>
                {features.map((feat, i) => {
                    const isEven = i % 2 === 0
                    const lightBg = '#e0fbfc'
                    const darkBg = '#1b2838'

                    return (
                        <div
                            key={i}
                            className="grid grid-cols-1 md:grid-cols-2 min-h-[420px]"
                        >
                            {/* Image / Emoji Side */}
                            <div
                                className={`flex items-center justify-center p-12 ${isEven ? 'md:order-1' : 'md:order-2'}`}
                                style={{ background: isEven ? darkBg : lightBg }}
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
                                style={{ background: isEven ? lightBg : darkBg }}
                            >
                                <FadeSection>
                                    <div className="max-w-md">
                                        <div
                                            className="w-10 h-1 rounded-full mb-6"
                                            style={{ background: isEven ? '#e94560' : '#0f3460' }}
                                        />
                                        <h3
                                            className="text-2xl sm:text-3xl font-bold mb-4"
                                            style={{ color: isEven ? '#1b2838' : '#ffffff' }}
                                        >
                                            {feat.title}
                                        </h3>
                                        <p
                                            className="leading-relaxed text-base sm:text-lg"
                                            style={{ color: isEven ? '#334155' : 'rgba(255,255,255,0.6)' }}
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
            <footer
                className="pt-20 pb-8 px-6 sm:px-12"
                style={{ background: '#0a0f1a' }}
            >
                <div className="max-w-6xl mx-auto">
                    {/* CTA Banner */}
                    <FadeSection>
                        <div
                            className="rounded-2xl p-10 sm:p-14 text-center mb-20"
                            style={{
                                background: 'linear-gradient(135deg, #e94560 0%, #c23152 50%, #0f3460 100%)',
                            }}
                        >
                            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to Get Started?</h2>
                            <p className="text-white/70 max-w-md mx-auto mb-8">
                                Join thousands of homeowners and technicians already using HomeHelp.
                            </p>
                            <div className="flex gap-4 justify-center flex-wrap">
                                <button
                                    onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                                    className="px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:brightness-110 cursor-pointer"
                                    style={{ background: 'linear-gradient(135deg, #e94560, #c23152)' }}
                                >
                                    Get Started
                                </button>
                                <Link
                                    to="/login"
                                    className="px-8 py-3 rounded-xl font-semibold text-sm border border-white/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </FadeSection>

                    {/* Footer Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-16">
                        {Object.entries(footerLinks).map(([category, links]) => (
                            <div key={category}>
                                <h4 className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-4">{category}</h4>
                                <ul className="space-y-2.5">
                                    {links.map((link) => (
                                        <li key={link}>
                                            <a href="#" className="text-sm text-white/50 hover:text-white transition-colors duration-200">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <span className="text-xl font-extrabold tracking-tight">
                            Home<span style={{ color: '#e94560' }}>Help</span>
                        </span>
                        <p className="text-xs text-white/30">
                            © {new Date().getFullYear()} HomeHelp. All rights reserved.
                        </p>
                        <div className="flex gap-4">
                            {['𝕏', 'in', 'f'].map((icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 hover:-translate-y-0.5"
                                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
