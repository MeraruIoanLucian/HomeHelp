import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import SectionHeading from '../components/SectionHeading'
import GradientButton from '../components/GradientButton'
import AlertMessage from '../components/AlertMessage'
import { CATEGORIES } from '../components/CategoryIcon'

const URGENCIES = [
    { value: 'low', label: 'Low', icon: 'check_circle', color: '#065F46', bg: '#D1FAE5' },
    { value: 'medium', label: 'Medium', icon: 'warning', color: '#92400E', bg: '#FEF3C7' },
    { value: 'urgent', label: 'Urgent', icon: 'priority_high', color: '#991B1B', bg: '#FEE2E2' },
] as const

interface AiResult { category: string; title: string; urgency: 'low' | 'medium' | 'urgent' }

export default function CreateJobPage() {
    const { profile, user } = useAuth()
    const navigate = useNavigate()

    const [aiDescription, setAiDescription] = useState('')
    const [aiLoading, setAiLoading] = useState(false)
    const [aiError, setAiError] = useState<string | null>(null)
    const [aiUsed, setAiUsed] = useState(false)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [urgency, setUrgency] = useState('')
    const [price, setPrice] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)

    useEffect(() => { if (profile?.role === 'helper') navigate('/dashboard') }, [profile])

    async function handleAiAnalyze() {
        if (!aiDescription.trim() || aiDescription.trim().length < 5) {
            setAiError('Scrie cel puțin 5 caractere pentru a descrie problema.')
            return
        }
        setAiLoading(true); setAiError(null)
        try {
            const { data, error } = await supabase.functions.invoke('ai-task-translator', { body: { description: aiDescription.trim() } })
            if (error) {
                let errorMsg = 'Failed to call AI function.'
                try {
                    if (error.context instanceof Response) { const errBody = await error.context.json(); errorMsg = errBody?.error || error.message || errorMsg }
                    else { errorMsg = error.message || errorMsg }
                } catch { errorMsg = error.message || errorMsg }
                throw new Error(errorMsg)
            }
            if (data?.error) throw new Error(data.error)
            const result = data as AiResult
            setCategory(result.category); setTitle(result.title); setUrgency(result.urgency); setDescription(aiDescription.trim()); setAiUsed(true)
        } catch (err: unknown) {
            setAiError(err instanceof Error ? err.message : 'Something went wrong.')
        } finally { setAiLoading(false) }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); setSubmitError(null)
        if (!category) { setSubmitError('Please select a category.'); return }
        if (!title.trim()) { setSubmitError('Please enter a job title.'); return }
        if (!description.trim()) { setSubmitError('Please enter a description.'); return }
        if (!urgency) { setSubmitError('Please select an urgency level.'); return }
        if (!user) { setSubmitError('You must be logged in.'); return }
        setSubmitting(true)
        try {
            const { error } = await supabase.from('jobs').insert({
                owner_id: user.id, title: title.trim(), description: description.trim(),
                category, urgency, budget: price.trim() || null, ai_generated: aiUsed,
            })
            if (error) throw new Error(error.message)
            navigate('/dashboard')
        } catch (err: unknown) {
            setSubmitError(err instanceof Error ? err.message : 'Failed to create job.')
        } finally { setSubmitting(false) }
    }

    return (
        <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            <main className="pt-12 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
                <div className="mb-12">
                    <SectionHeading
                        title="Create a New Job"
                        subtitle="Connect with the best professionals for your home projects. Use our AI assistant to streamline your request."
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left: AI Assistant */}
                    <aside className="lg:col-span-5 lg:sticky lg:top-32">
                        <div className="p-8 rounded-[2rem] relative overflow-hidden group" style={{ background: 'linear-gradient(135deg, #2c2419, #4a3f35)' }}>
                            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl transition-all duration-500 group-hover:opacity-40" style={{ background: 'rgba(201, 181, 156, 0.2)' }} />
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg" style={{ background: 'rgba(201, 181, 156, 0.15)' }}>
                                        <span className="material-symbols-outlined" style={{ color: '#C9B59C', fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                                    </div>
                                    <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#FFFFFF' }}>
                                        Describe your problem.
                                    </h2>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: '#D9CFC7' }}>Detailed Description</label>
                                        <textarea value={aiDescription} onChange={(e) => setAiDescription(e.target.value)}
                                            placeholder='e.g. "mi s-a spart o țeavă în baie și curge apa peste tot"'
                                            className="w-full rounded-2xl p-4 min-h-[180px] text-base leading-relaxed resize-none outline-none transition-all"
                                            style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#FFFFFF' }} />
                                    </div>
                                    <button type="button" onClick={handleAiAnalyze} disabled={aiLoading || !aiDescription.trim()}
                                        className="w-full py-4 font-bold rounded-xl flex items-center justify-center gap-3 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                                        style={{ background: '#C9B59C', color: '#2c2419' }}>
                                        {aiLoading ? (
                                            <><span className="material-symbols-outlined animate-spin text-base">progress_activity</span>Analyzing...</>
                                        ) : (
                                            <><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>magic_button</span>Analyze using AI</>
                                        )}
                                    </button>
                                    {aiError && <AlertMessage type="error" message={aiError} />}
                                    {aiUsed && !aiError && !aiLoading && <AlertMessage type="success" message="AI filled in the form! You can edit the fields below before submitting." />}
                                    <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                        <span className="material-symbols-outlined text-sm mt-0.5" style={{ color: '#C9B59C' }}>info</span>
                                        <p className="text-sm leading-snug" style={{ color: '#D9CFC7' }}>Our AI will analyze your description to auto-fill the details on the right, ensuring accurate matches.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Right: Job Form */}
                    <section className="lg:col-span-7">
                        <div className="p-8 md:p-12 rounded-[2rem]" style={{ background: '#FFFFFF', boxShadow: '0 24px 48px rgba(44, 36, 25, 0.04)' }}>
                            <form className="space-y-8" onSubmit={handleSubmit}>
                                {/* Category */}
                                <div>
                                    <label className="block font-bold text-lg tracking-tight mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#2c2419' }}>Select Category</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {CATEGORIES.map((cat) => (
                                            <button key={cat.value} type="button" onClick={() => setCategory(cat.value)}
                                                className="flex flex-col items-center p-4 rounded-2xl transition-all duration-200 cursor-pointer"
                                                style={{ background: category === cat.value ? '#FFFFFF' : '#F9F8F6', border: `2px solid ${category === cat.value ? '#2c2419' : 'transparent'}` }}>
                                                <span className="material-symbols-outlined mb-2 text-2xl" style={{ color: '#2c2419' }}>{cat.icon}</span>
                                                <span className="text-sm font-medium">{cat.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Title */}
                                <div>
                                    <label className="block font-bold text-lg tracking-tight mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#2c2419' }}>Job Title</label>
                                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Kitchen Faucet Repair & Maintenance"
                                        className="w-full px-4 py-3 rounded-xl outline-none transition-all text-sm" style={{ background: '#F9F8F6', border: 'none', color: '#2c2419' }} />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block font-bold text-lg tracking-tight mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#2c2419' }}>Job Details</label>
                                    <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe specific details about the job..." rows={4}
                                        className="w-full px-4 py-3 rounded-xl outline-none transition-all resize-none text-sm" style={{ background: '#F9F8F6', border: 'none', color: '#2c2419' }} />
                                </div>

                                {/* Urgency */}
                                <div>
                                    <label className="block font-bold text-lg tracking-tight mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#2c2419' }}>Urgency Level</label>
                                    <div className="flex flex-wrap gap-3">
                                        {URGENCIES.map((u) => (
                                            <button key={u.value} type="button" onClick={() => setUrgency(u.value)}
                                                className="px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 transition-all duration-200 cursor-pointer"
                                                style={{ background: urgency === u.value ? u.bg : '#F9F8F6', color: urgency === u.value ? u.color : '#6b5e50', border: urgency === u.value ? `2px solid ${u.color}30` : '2px solid transparent' }}>
                                                <span className="material-symbols-outlined text-sm">{u.icon}</span>
                                                {u.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Budget & Submit */}
                                <div className="pt-6 flex flex-col md:flex-row gap-6 items-center justify-between" style={{ borderTop: '1px solid #EFE9E3' }}>
                                    <div className="w-full md:w-1/3">
                                        <label className="block text-sm font-medium mb-1" style={{ color: '#6b5e50' }}>Estimated Budget (Optional)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold" style={{ color: '#6b5e50' }}>RON</span>
                                            <input type="text" value={price} onChange={e => setPrice(e.target.value)} placeholder="0"
                                                className="w-full pl-14 pr-4 py-3 rounded-xl outline-none transition-all text-sm" style={{ background: '#F9F8F6', border: 'none', color: '#2c2419' }} />
                                        </div>
                                    </div>
                                    {submitError && <AlertMessage type="error" message={submitError} />}
                                    <GradientButton type="submit" loading={submitting} disabled={submitting} size="lg">
                                        Post Job Now
                                    </GradientButton>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}
