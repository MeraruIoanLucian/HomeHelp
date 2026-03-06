import { useAuth } from '../context/AuthContext'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import HeroBackground from '../components/HeroBackground'

export default function CreateJobPage() {
    const { profile, signOut } = useAuth()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const category = searchParams.get('category')

    //va trebui sa verificam din link categoria pentru a preselecta  categoria
    //voi face luare de locatie poate cu un api cu harta?
    //voi face luare de data si ora
    //voi face luare de pret
    //voi face luare de descriere
    //voi face luare de titlu
    //voi face luare de imagine
    //voi face luare de vide
    //schimb layoutul la pagina sa nu fie asa pe centru cards



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
                    to="/dashboard"
                    className="px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:brightness-110 cursor-pointer"
                    style={{ background: '#C9B59C', color: '#2c2419' }}
                >
                    Dashboard
                </Link>
                <button
                    onClick={handleSignOut}
                    className="px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:brightness-95"
                    style={{ border: '1px solid #D9CFC7', color: '#6b5e50' }}
                >
                    Sign Out
                </button>
            </Navbar>
            <HeroBackground className="relative min-h-screen">
                <div className="pt-32 px-6 max-w-2xl mx-auto">
                    <div className="rounded-xl p-4 mb-6" style={{ background: '#EFE9E3', border: '1px solid #D9CFC7' }}>
                        <div className="flex justify-center">
                            <h1 className="text-4xl font-bold" style={{ color: '#2c2419' }}>Create a Job</h1>
                        </div>
                    </div>
                    <div className="rounded-xl p-8" style={{ background: '#EFE9E3', border: '1px solid #D9CFC7' }}>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium mb-1" style={{ color: '#6b5e50' }}>Job Title</label>
                                <input type="text" id="title" name="title"
                                    className="w-full px-4 py-2 rounded-lg outline-none transition"
                                    style={{ border: '1px solid #D9CFC7', background: '#F9F8F6', color: '#2c2419' }}
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium mb-1" style={{ color: '#6b5e50' }}>Job Description</label>
                                <input type="text" id="description" name="description"
                                    className="w-full px-4 py-2 rounded-lg outline-none transition"
                                    style={{ border: '1px solid #D9CFC7', background: '#F9F8F6', color: '#2c2419' }}
                                />
                            </div>
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium mb-1" style={{ color: '#6b5e50' }}>Job Price</label>
                                <input type="text" id="price" name="price"
                                    className="w-full px-4 py-2 rounded-lg outline-none transition"
                                    style={{ border: '1px solid #D9CFC7', background: '#F9F8F6', color: '#2c2419' }}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 text-sm font-semibold rounded-lg transition-all duration-200 hover:brightness-110 cursor-pointer"
                                style={{ background: '#C9B59C', color: '#2c2419' }}
                            >
                                Create Job
                            </button>
                        </form>
                    </div>
                </div>
            </HeroBackground>
        </div>
    )
}
