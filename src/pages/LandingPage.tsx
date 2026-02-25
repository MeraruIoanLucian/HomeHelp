export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 text-white px-4">
            <h1 className="text-5xl font-bold mb-4">HomeHelp</h1>
            <p className="text-xl text-primary-100 mb-8 text-center max-w-md">
                Connect with trusted local technicians for all your home repair needs.
            </p>
            <div className="flex gap-4">
                <a
                    href="/login"
                    className="px-6 py-3 bg-white text-primary-700 font-semibold rounded-[var(--radius-button)] shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                >
                    Log In
                </a>
                <a
                    href="/register"
                    className="px-6 py-3 bg-primary-800 text-white font-semibold rounded-[var(--radius-button)] border border-primary-400 hover:bg-primary-900 transition-all duration-200 hover:-translate-y-0.5"
                >
                    Sign Up
                </a>
            </div>
        </div>
    )
}
