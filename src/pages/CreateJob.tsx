import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import HeroBackground from '../components/HeroBackground'

const CATEGORIES = [
    'Instalații Apă',
    'Gaze',
    'Electrice',
    'Centrale Termice',
    'Climatizare',
    'Altele',
] as const

const URGENCIES = [
    { value: 'low', label: '🟢 Low' },
    { value: 'medium', label: '🟡 Medium' },
    { value: 'urgent', label: '🔴 Urgent' },
] as const

interface AiResult {
    category: string
    title: string
    urgency: 'low' | 'medium' | 'urgent'
}

export default function CreateJobPage() {
    const { profile, user } = useAuth()
    const navigate = useNavigate()

    // ── AI state ─────────────────────────────────────────────────────────
    const [aiDescription, setAiDescription] = useState('')
    const [aiLoading, setAiLoading] = useState(false)
    const [aiError, setAiError] = useState<string | null>(null)
    const [aiUsed, setAiUsed] = useState(false)

    // ── Form state ───────────────────────────────────────────────────────
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [urgency, setUrgency] = useState('')
    const [price, setPrice] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)

    // Redirect helpers away
    if (profile?.role === 'helper') {
        navigate('/dashboard')
        return null
    }

    // ── Call AI Edge Function ────────────────────────────────────────────
    async function handleAiAnalyze() {
        if (!aiDescription.trim() || aiDescription.trim().length < 5) {
            setAiError('Scrie cel puțin 5 caractere pentru a descrie problema.')
            return
        }

        setAiLoading(true)
        setAiError(null)

        try {
            const { data, error } = await supabase.functions.invoke(
                'ai-task-translator',
                {
                    body: { description: aiDescription.trim() },
                }
            )

            if (error) {
                // Try to read the actual error message from the response
                let errorMsg = 'Failed to call AI function.'
                try {
                    if (error.context instanceof Response) {
                        const errBody = await error.context.json()
                        errorMsg = errBody?.error || error.message || errorMsg
                    } else {
                        errorMsg = error.message || errorMsg
                    }
                } catch {
                    errorMsg = error.message || errorMsg
                }
                throw new Error(errorMsg)
            }

            if (data?.error) {
                throw new Error(data.error)
            }

            const result = data as AiResult

            // Auto-fill the form
            setCategory(result.category)
            setTitle(result.title)
            setUrgency(result.urgency)
            setDescription(aiDescription.trim())
            setAiUsed(true)
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : 'Something went wrong.'
            setAiError(message)
        } finally {
            setAiLoading(false)
        }
    }

    // ── Submit job to Supabase ───────────────────────────────────────────
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setSubmitError(null)

        // Validation
        if (!category) {
            setSubmitError('Please select a category.')
            return
        }
        if (!title.trim()) {
            setSubmitError('Please enter a job title.')
            return
        }
        if (!description.trim()) {
            setSubmitError('Please enter a description.')
            return
        }
        if (!urgency) {
            setSubmitError('Please select an urgency level.')
            return
        }
        if (!user) {
            setSubmitError('You must be logged in.')
            return
        }

        setSubmitting(true)

        try {
            const { error } = await supabase.from('jobs').insert({
                owner_id: user.id,
                title: title.trim(),
                description: description.trim(),
                category,
                urgency,
                budget: price.trim() || null,
                ai_generated: aiUsed,
            })

            if (error) throw new Error(error.message)

            navigate('/dashboard')
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : 'Failed to create job.'
            setSubmitError(message)
        } finally {
            setSubmitting(false)
        }
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
            </Navbar>
            <HeroBackground className="relative min-h-screen">
                <div className="pt-32 px-6 max-w-2xl mx-auto pb-12">
                    {/* Header */}
                    <div
                        className="rounded-xl p-4 mb-6"
                        style={{
                            background: '#EFE9E3',
                            border: '1px solid #D9CFC7',
                        }}
                    >
                        <h1
                            className="text-4xl font-bold text-center"
                            style={{ color: '#2c2419' }}
                        >
                            Create a Job
                        </h1>
                    </div>

                    {/* ── AI Section ───────────────────────────────────── */}
                    <div
                        className="rounded-xl p-6 mb-6"
                        style={{
                            background: 'linear-gradient(135deg, #EFE9E3 0%, #E8E0D8 100%)',
                            border: '1px solid #C9B59C',
                        }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <h2
                                className="text-lg font-semibold"
                                style={{ color: '#2c2419' }}
                            >
                                Describe your problem
                            </h2>
                        </div>
                        <p
                            className="text-sm mb-4"
                            style={{ color: '#6b5e50' }}
                        >
                            Describe your problem in your own words and AI will
                            automatically fill in the category, title, and
                            urgency for you.
                        </p>

                        <textarea
                            id="ai-description"
                            value={aiDescription}
                            onChange={(e) => setAiDescription(e.target.value)}
                            placeholder='e.g. "mi s-a spart o țeavă în baie și curge apa peste tot"'
                            rows={3}
                            className="w-full px-4 py-3 rounded-lg outline-none transition resize-none"
                            style={{
                                border: '1px solid #D9CFC7',
                                background: '#F9F8F6',
                                color: '#2c2419',
                            }}
                        />

                        <button
                            type="button"
                            onClick={handleAiAnalyze}
                            disabled={aiLoading || !aiDescription.trim()}
                            className="mt-3 w-full py-3 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                background: aiLoading
                                    ? '#A89882'
                                    : '#2c2419',
                                color: '#F9F8F6',
                            }}
                        >
                            {aiLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg
                                        className="animate-spin h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            className="opacity-25"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            className="opacity-75"
                                        />
                                    </svg>
                                    Analyzing...
                                </span>
                            ) : (
                                ' Analyze using AI'
                            )}
                        </button>

                        {/* AI Error */}
                        {aiError && (
                            <div
                                className="mt-3 p-3 rounded-lg text-sm"
                                style={{
                                    background: '#FEE2E2',
                                    color: '#991B1B',
                                    border: '1px solid #FECACA',
                                }}
                            >
                                {aiError}
                            </div>
                        )}

                        {/* AI Success */}
                        {aiUsed && !aiError && !aiLoading && (
                            <div
                                className="mt-3 p-3 rounded-lg text-sm"
                                style={{
                                    background: '#D1FAE5',
                                    color: '#065F46',
                                    border: '1px solid #A7F3D0',
                                }}
                            >
                                AI filled in the form! You can edit the
                                fields below before submitting.
                            </div>
                        )}
                    </div>

                    {/* ── Job Form ─────────────────────────────────────── */}
                    <div
                        className="rounded-xl p-8"
                        style={{
                            background: '#EFE9E3',
                            border: '1px solid #D9CFC7',
                        }}
                    >
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {/* Category */}
                            <div>
                                <label
                                    htmlFor="category"
                                    className="block text-sm font-medium mb-1"
                                    style={{ color: '#6b5e50' }}
                                >
                                    Category
                                </label>
                                <select
                                    id="category"
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    className="w-full px-4 py-2 rounded-lg outline-none transition"
                                    style={{
                                        border: '1px solid #D9CFC7',
                                        background: '#F9F8F6',
                                        color: '#2c2419',
                                    }}
                                >
                                    <option value="">Select a category</option>
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Title */}
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium mb-1"
                                    style={{ color: '#6b5e50' }}
                                >
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg outline-none transition"
                                    style={{
                                        border: '1px solid #D9CFC7',
                                        background: '#F9F8F6',
                                        color: '#2c2419',
                                    }}
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium mb-1"
                                    style={{ color: '#6b5e50' }}
                                >
                                    Job Description
                                </label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg outline-none transition resize-none"
                                    style={{
                                        border: '1px solid #D9CFC7',
                                        background: '#F9F8F6',
                                        color: '#2c2419',
                                    }}
                                />
                            </div>

                            {/* Urgency */}
                            <div>
                                <label
                                    htmlFor="urgency"
                                    className="block text-sm font-medium mb-1"
                                    style={{ color: '#6b5e50' }}
                                >
                                    Urgency
                                </label>
                                <select
                                    id="urgency"
                                    value={urgency}
                                    onChange={(e) =>
                                        setUrgency(e.target.value)
                                    }
                                    className="w-full px-4 py-2 rounded-lg outline-none transition"
                                    style={{
                                        border: '1px solid #D9CFC7',
                                        background: '#F9F8F6',
                                        color: '#2c2419',
                                    }}
                                >
                                    <option value="">Select urgency</option>
                                    {URGENCIES.map((u) => (
                                        <option key={u.value} value={u.value}>
                                            {u.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Price */}
                            <div>
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium mb-1"
                                    style={{ color: '#6b5e50' }}
                                >
                                    Budget (optional)
                                </label>
                                <input
                                    type="text"
                                    id="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="e.g. 200-400 RON"
                                    className="w-full px-4 py-2 rounded-lg outline-none transition"
                                    style={{
                                        border: '1px solid #D9CFC7',
                                        background: '#F9F8F6',
                                        color: '#2c2419',
                                    }}
                                />
                            </div>

                            {/* Submit Error */}
                            {submitError && (
                                <div
                                    className="p-3 rounded-lg text-sm"
                                    style={{
                                        background: '#FEE2E2',
                                        color: '#991B1B',
                                        border: '1px solid #FECACA',
                                    }}
                                >
                                    {submitError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-3 text-sm font-semibold rounded-lg transition-all duration-200 hover:brightness-110 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{
                                    background: submitting ? '#A89882' : '#C9B59C',
                                    color: '#2c2419',
                                }}
                            >
                                {submitting ? 'Creating…' : 'Create Job'}
                            </button>
                        </form>
                    </div>
                </div>
            </HeroBackground>
        </div>
    )
}
