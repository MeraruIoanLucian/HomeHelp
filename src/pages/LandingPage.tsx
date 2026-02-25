import { Link } from 'react-router-dom'
import Grainient from '../components/Grainient'

export default function LandingPage() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center text-white px-4">
            {/* Background */}
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

            {/* Content */}
            <div className="relative z-10 text-center">
                <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">HomeHelp</h1>
                <p className="text-xl text-white/80 mb-8 max-w-md drop-shadow">
                    Connect with trusted local technicians for all your home repair needs.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link
                        to="/login"
                        className="px-6 py-3 bg-white/10 backdrop-blur text-white font-semibold rounded-lg border border-white/30 hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5"
                    >
                        Log In
                    </Link>
                    <Link
                        to="/register"
                        className="px-6 py-3 bg-white/10 backdrop-blur text-white font-semibold rounded-lg border border-white/30 hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    )
}
