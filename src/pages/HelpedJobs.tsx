import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import HeroBackground from '../components/HeroBackground'
import Footer from '../components/Footer'
import WorkInProgress from '../assets/WorkInProgress.png'
import JobDone from '../assets/JobDone.png'
import Chats from '../assets/Chats.png'

export default function HelpedJobs() {
    const { profile, signOut } = useAuth()
    const navigate = useNavigate()

    async function handleSignOut() {
        await signOut()
        navigate('/')
    }

    return (
        <div className="relative z-10 min-h-screen flex flex-col">
            <Navbar>
                <Link to="/dashboard"
                    className="px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:brightness-110 cursor-pointer"
                    style={{ background: '#C9B59C', color: '#2c2419' }}
                >
                    Dashboard
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
                        Current Jobs
                    </h1>
                    <p className="text-center text-lg mb-12 max-w-xl mx-auto" style={{ color: '#C9B59C' }}>
                        Request help for your home or see ongoing jobs
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <Link to="/create-job" className="rounded-2xl overflow-hidden block" style={{ background: '#EFE9E3', border: '1px solid #D9CFC7' }}>
                            <div className="flex items-center justify-center h-80" style={{ background: '#D9CFC7' }}>
                                <img src={WorkInProgress} alt="Create Job" className="w-full h-full" />
                            </div>
                            <div className="p-8">
                                <div className="w-10 h-1 rounded-full mb-4" style={{ background: '#C9B59C' }} />
                                <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: '#2c2419' }}>Ongoing Jobs</h3>
                                <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#6b5e50' }}>Track your active requests and manage ongoing tasks.</p>
                            </div>
                        </Link>
                        <Link to="/jobs" className="rounded-2xl overflow-hidden block" style={{ background: '#EFE9E3', border: '1px solid #D9CFC7' }}>
                            <div className="flex items-center justify-center h-80" style={{ background: '#D9CFC7' }}>
                                <img src={JobDone} alt="Create Job" className="w-full h-full" />
                            </div>
                            <div className="p-8">
                                <div className="w-10 h-1 rounded-full mb-4" style={{ background: '#C9B59C' }} />
                                <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: '#2c2419' }}>Completed Jobs</h3>
                                <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#6b5e50' }}>View and manage your completed jobs.</p>
                            </div>
                        </Link>
                        <Link to="/create-job" className="rounded-2xl overflow-hidden block" style={{ background: '#EFE9E3', border: '1px solid #D9CFC7' }}>
                            <div className="flex items-center justify-center h-80" style={{ background: '#D9CFC7' }}>
                                <img src={Chats} alt="Create Job" className="w-full h-full" />
                            </div>
                            <div className="p-8">
                                <div className="w-10 h-1 rounded-full mb-4" style={{ background: '#C9B59C' }} />
                                <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: '#2c2419' }}>Chat</h3>
                                <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#6b5e50' }}>Chat with your helper and get updates on your job.</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </HeroBackground>
            <Footer />
        </div>
    )
}
