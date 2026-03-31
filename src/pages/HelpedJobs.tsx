import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import HeroBackground from '../components/HeroBackground'
import Footer from '../components/Footer'

type JobStatus = 'open' | 'assigned' | 'in_progress' | 'completed' | 'cancelled'

interface Job {
    id: string
    title: string
    description: string
    category: string
    urgency: 'low' | 'medium' | 'urgent'
    budget: string | null
    status: JobStatus
    created_at: string
}

const TABS: { label: string; value: JobStatus | 'all' }[] = [
    { label: 'All', value: 'all' },
    { label: 'Open', value: 'open' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
]

const URGENCY_STYLES: Record<string, { bg: string; color: string; label: string }> = {
    low: { bg: '#D1FAE5', color: '#065F46', label: 'Low' },
    medium: { bg: '#FEF3C7', color: '#92400E', label: 'Medium' },
    urgent: { bg: '#FEE2E2', color: '#991B1B', label: 'Urgent' },
}

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
    open: { bg: '#DBEAFE', color: '#1E40AF', label: 'Open' },
    assigned: { bg: '#E0E7FF', color: '#3730A3', label: 'Assigned' },
    in_progress: { bg: '#FEF3C7', color: '#92400E', label: 'In Progress' },
    completed: { bg: '#D1FAE5', color: '#065F46', label: 'Completed' },
    cancelled: { bg: '#F3F4F6', color: '#6B7280', label: 'Cancelled' },
}

export default function HelpedJobs() {
    const { user } = useAuth()

    const [jobs, setJobs] = useState<Job[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<JobStatus | 'all'>('all')

    useEffect(() => {
        async function fetchJobs() {
            if (!user) return

            setLoading(true)
            setError(null)

            const { data, error: fetchError } = await supabase
                .from('jobs')
                .select('*')
                .eq('owner_id', user.id)
                .order('created_at', { ascending: false })

            if (fetchError) {
                setError(fetchError.message)
            } else {
                setJobs(data ?? [])
            }

            setLoading(false)
        }

        fetchJobs()
    }, [user])

    const filteredJobs = activeTab === 'all'
        ? jobs
        : jobs.filter((j) => j.status === activeTab)

    const counts: Record<string, number> = { all: jobs.length }
    for (const j of jobs) {
        counts[j.status] = (counts[j.status] ?? 0) + 1
    }

    return (
        <div className="relative z-10 min-h-screen flex flex-col">
            <Navbar>
                <Link
                    to="/dashboard"
                    className="px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:brightness-110 cursor-pointer"
                    style={{ background: '#C9B59C', color: '#2c2419' }}
                >
                    Dashboard
                </Link>
                <Link
                    to="/profile"
                    className="px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:brightness-110 cursor-pointer"
                    style={{ background: '#C9B59C', color: '#2c2419' }}
                >
                    Profile
                </Link>
            </Navbar>

            <HeroBackground className="relative flex-1">
                <div className="pt-30 pb-12 px-6 max-w-5xl mx-auto">
                    <h1
                        className="text-center text-5xl sm:text-7xl font-extrabold leading-tight mb-4"
                        style={{ color: '#2c2419' }}
                    >
                        Your Jobs
                    </h1>
                    <p
                        className="text-center text-lg mb-10 max-w-xl mx-auto"
                        style={{ color: '#C9B59C' }}
                    >
                        Track and manage all jobs you've posted
                    </p>

                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {TABS.map((tab) => {
                            const isActive = activeTab === tab.value
                            const count = counts[tab.value] ?? 0
                            return (
                                <button
                                    key={tab.value}
                                    onClick={() => setActiveTab(tab.value)}
                                    className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer"
                                    style={{
                                        background: isActive ? '#2c2419' : '#EFE9E3',
                                        color: isActive ? '#F9F8F6' : '#6b5e50',
                                        border: `1px solid ${isActive ? '#2c2419' : '#D9CFC7'}`,
                                    }}
                                >
                                    {tab.label}
                                    {count > 0 && (
                                        <span
                                            className="ml-2 px-1.5 py-0.5 text-xs rounded-full"
                                            style={{
                                                background: isActive ? '#C9B59C' : '#D9CFC7',
                                                color: '#2c2419',
                                            }}
                                        >
                                            {count}
                                        </span>
                                    )}
                                </button>
                            )
                        })}
                    </div>

                    {loading && (
                        <div className="flex justify-center py-20">
                            <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="#C9B59C" strokeWidth="4" className="opacity-25" />
                                <path fill="#C9B59C" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
                            </svg>
                        </div>
                    )}

                    {error && (
                        <div
                            className="p-4 rounded-xl text-sm text-center mb-6"
                            style={{ background: '#FEE2E2', color: '#991B1B', border: '1px solid #FECACA' }}
                        >
                            {error}
                        </div>
                    )}

                    {!loading && !error && filteredJobs.length === 0 && (
                        <div
                            className="rounded-2xl p-12 text-center"
                            style={{ background: '#EFE9E3', border: '1px solid #D9CFC7' }}
                        >

                            <h3 className="text-xl font-bold mb-2" style={{ color: '#2c2419' }}>
                                {activeTab === 'all'
                                    ? 'No jobs yet'
                                    : `No ${TABS.find((t) => t.value === activeTab)?.label.toLowerCase()} jobs`}
                            </h3>
                            <p className="text-sm mb-6" style={{ color: '#6b5e50' }}>
                                {activeTab === 'all'
                                    ? "You haven't posted any jobs. Create one to get started!"
                                    : 'Try selecting a different tab to see other jobs.'}
                            </p>
                            {activeTab === 'all' && (
                                <Link
                                    to="/create-job"
                                    className="inline-block px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200 hover:brightness-110"
                                    style={{ background: '#C9B59C', color: '#2c2419' }}
                                >
                                    + Create a Job
                                </Link>
                            )}
                        </div>
                    )}

                    {!loading && !error && filteredJobs.length > 0 && (
                        <div className="grid gap-4">
                            {filteredJobs.map((job) => {
                                const urg = URGENCY_STYLES[job.urgency] ?? URGENCY_STYLES.medium
                                const stat = STATUS_STYLES[job.status] ?? STATUS_STYLES.open

                                return (
                                    <div
                                        key={job.id}
                                        className="rounded-2xl p-6 transition-all"
                                        style={{
                                            background: '#EFE9E3',
                                            border: '1px solid #D9CFC7',
                                        }}
                                    >
                                        <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
                                            <span
                                                className="px-2.5 py-1 text-xs font-semibold rounded-full"
                                                style={{ background: stat.bg, color: stat.color }}
                                            >
                                                {stat.label}
                                            </span>
                                            <span
                                                className="px-2.5 py-1 text-xs font-semibold rounded-full"
                                                style={{ background: urg.bg, color: urg.color }}
                                            >
                                                {urg.label}
                                            </span>
                                            <span
                                                className="px-2.5 py-1 text-xs font-medium rounded-full"
                                                style={{ background: '#D9CFC7', color: '#2c2419' }}
                                            >
                                                {job.category}
                                            </span>
                                        </div>

                                        <h3
                                            className="text-lg sm:text-xl font-bold mb-1 text-center"
                                            style={{ color: '#2c2419' }}
                                        >
                                            {job.title}
                                        </h3>

                                        <p
                                            className="text-sm leading-relaxed mb-4 line-clamp-2 text-center"
                                            style={{ color: '#6b5e50' }}
                                        >
                                            {job.description}
                                        </p>

                                        <div className="flex flex-wrap items-center justify-center gap-2">
                                            {job.budget && (
                                                <span
                                                    className="text-sm font-semibold"
                                                    style={{ color: '#2c2419' }}
                                                >
                                                    Budget: {job.budget}
                                                </span>
                                            )}
                                            <span className="text-xs" style={{ color: '#A89882' }}>
                                                {new Date(job.created_at).toLocaleDateString('ro-RO', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                        </div>

                                        <Link
                                            to={`/chat/${job.id}`}
                                            className="block mt-4 w-full py-2.5 text-sm font-semibold rounded-lg text-center transition-all duration-200 hover:brightness-110"
                                            style={{ background: '#C9B59C', color: '#2c2419' }}
                                        >
                                            Chat
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </HeroBackground>
            <Footer />
        </div>
    )
}
