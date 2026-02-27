import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import HeroBackground from '../components/HeroBackground'

export default function CreateJobPage() {
    const { profile, signOut } = useAuth()
    const navigate = useNavigate()

    async function handleSignOut() {
        await signOut()
        navigate('/')
    }

    if (profile?.role == 'helper') {
        navigate('/home')
    }

    return (
        <div className="relative z-10 min-h-screen">
            <Navbar>
                <Link
                    to="/login"
                    className="px-5 py-2 text-sm font-medium rounded-lg border border-white/20 hover:bg-white/10 transition-all duration-200"
                >
                    I have an account
                </Link>
                <button
                    onClick={handleSignOut}
                    className="px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:brightness-110 cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #e94560, #c23152)' }}
                >
                    Sign Out
                </button>
            </Navbar>
            <HeroBackground className="relative min-h-screen">
                <div className="pt-32 px-6 max-w-2xl mx-auto">
                    <div className="rounded-xl bg-white/30 backdrop-blur p-2 justify-center mb-6">
                        <div className="flex justify-center">
                            <h1 className="text-4xl font-bold text-[#fff]">Create a Job</h1>
                        </div>
                    </div>
                    <div className="bg-white/30 backdrop-blur rounded-xl shadow-sm p-50">
                        <p className="text-lg text-[#fff] mt-5">
                            <form>
                                <label htmlFor="title">Job Title</label>
                                <input type="text" id="title" name="title" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                                <label htmlFor="description">Job Description</label>
                                <input type="text" id="description" name="description" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                                <label htmlFor="price">Job Price</label>
                                <input type="text" id="price" name="price" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                                <button type="submit">Create Job</button>
                            </form>
                        </p>
                    </div>
                </div>
            </HeroBackground>
        </div>
    )
}
