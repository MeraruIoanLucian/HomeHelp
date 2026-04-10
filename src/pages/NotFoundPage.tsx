import GradientButton from '../components/GradientButton'

export default function NotFoundPage() {
    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center px-6"
            style={{ background: '#F9F8F6', fontFamily: "'Inter', system-ui, sans-serif" }}
        >
            <div className="text-center max-w-md">
                <div
                    className="text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter mb-4"
                    style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        background: 'linear-gradient(135deg, #C9B59C 0%, #2c2419 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    404
                </div>

                <h1
                    className="text-3xl font-bold mb-4"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#2c2419' }}
                >
                    Page not found
                </h1>
                <p className="mb-10 leading-relaxed" style={{ color: '#6b5e50' }}>
                    The page you're looking for doesn't exist or has been moved. Let's get you back on track.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <GradientButton to="/dashboard" icon="home">
                        Go to Dashboard
                    </GradientButton>
                    <GradientButton to="/" variant="outline" icon="arrow_back">
                        Home
                    </GradientButton>
                </div>
            </div>
        </div>
    )
}
