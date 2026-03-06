import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import HeroBackground from '../components/HeroBackground'
import Footer from '../components/Footer'

const categories = [
    {
        title: 'Electrical',
        description: 'Faulty wiring, blown fuses, outlet repairs, lighting installation, and full electrical inspections.',
        emoji: '⚡',
    },
    {
        title: 'Plumbing',
        description: 'Leaky pipes, clogged drains, toilet repairs, water heater maintenance, and bathroom renovations.',
        emoji: '🔧',
    },
    {
        title: 'Garden & Landscaping',
        description: 'Lawn care, hedge trimming, irrigation systems, tree removal, and seasonal garden maintenance.',
        emoji: '🌿',
    },
    {
        title: 'Painting & Decorating',
        description: 'Interior and exterior painting, wallpaper installation, drywall repair, and color consultations.',
        emoji: '🎨',
    },
    {
        title: 'Appliance Repair',
        description: 'Washing machines, refrigerators, ovens, dishwashers — get your household appliances fixed fast.',
        emoji: '🛠️',
    },
    {
        title: 'Cleaning Services',
        description: 'Deep cleaning, move-in/move-out cleaning, carpet shampooing, and routine house maintenance.',
        emoji: '🧹',
    },
]

export default function Dashboard() {
    const { profile, signOut } = useAuth()
    const navigate = useNavigate()

    async function handleSignOut() {
        await signOut()
        navigate('/')
    }

    return (
        <div className="relative z-10 min-h-screen flex flex-col">
            <Navbar>
                <Link to="/chat"
                    className="px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:brightness-110 cursor-pointer"
                    style={{ background: '#C9B59C', color: '#2c2419' }}
                >
                    💬 Chat
                </Link>
                <Link to="/appointments"
                    className="px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:brightness-110 cursor-pointer"
                    style={{ background: '#C9B59C', color: '#2c2419' }}
                >
                    🗓️ Appointments
                </Link>
                <Link to="/profile"
                    className="px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:brightness-110 cursor-pointer"
                    style={{ background: '#C9B59C', color: '#2c2419' }}
                >
                    👤 Profile
                </Link>
            </Navbar>
            <HeroBackground className="relative flex-1">
                <div className="pt-30 pb-12 px-6 max-w-5xl mx-auto">
                    {/* title */}
                    <h1 className="text-center text-5xl sm:text-7xl font-extrabold leading-tight mb-4" style={{ color: '#2c2419' }}>
                        Dashboard
                    </h1>
                    <p className="text-center text-lg mb-12 max-w-xl mx-auto" style={{ color: '#C9B59C' }}>
                        Browse service categories and find the right help for your home.
                    </p>

                    {/* Service Categories */}
                    <div className="flex flex-col gap-6 pb-12">
                        {categories.map((cat, i) => {
                            const isEven = i % 2 === 0
                            return (
                                <div
                                    key={cat.title}
                                    className="rounded-2xl overflow-hidden cursor-pointer"
                                    style={{
                                        background: '#EFE9E3',
                                        border: '1px solid #D9CFC7',
                                    }}
                                >
                                    <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} min-h-[160px]`}>
                                        {/* Text Side */}
                                        <div className="flex-1 flex flex-col justify-center p-8 sm:p-10">
                                            <div
                                                className="w-10 h-1 rounded-full mb-4"
                                                style={{ background: '#C9B59C' }}
                                            />
                                            <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: '#2c2419' }}>
                                                {cat.title}
                                            </h3>
                                            <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#6b5e50' }}>
                                                {cat.description}
                                            </p>
                                        </div>

                                        {/* Image / Emoji Side */}
                                        <div
                                            className="flex items-center justify-center p-8 md:w-[220px] md:min-h-full"
                                            style={{
                                                background: '#D9CFC7',
                                                borderLeft: isEven ? '1px solid #D9CFC7' : 'none',
                                                borderRight: !isEven ? '1px solid #D9CFC7' : 'none',
                                            }}
                                        >
                                            <span className="text-6xl sm:text-7xl transition-transform duration-300 group-hover:scale-110">
                                                {cat.emoji}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </HeroBackground>
            <Footer />
        </div>
    )
}
