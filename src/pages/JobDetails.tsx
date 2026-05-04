import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { getOrCreateConversation } from "../lib/getSauCreateConversation"
import { supabase } from "../lib/supabase"
import { StatusBadge, UrgencyBadge } from "../components/StatusBadge"
import GradientButton from "../components/GradientButton"
import AlertMessage from "../components/AlertMessage"

export default function JobDetails() {
    const [job, setJob] = useState<any>(null)
    const [offers, setOffers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [price, setPrice] = useState('')
    const [message, setMessage] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [hasApplied, setHasApplied] = useState(false)
    const { user } = useAuth()
    const { id } = useParams()
    const navigate = useNavigate()

    const isOwner = user?.id === job?.owner_id

    useEffect(() => {
        async function fetchJob() {
            const { data: job } = await supabase.from('jobs').select('*').eq('id', id).single()
            setJob(job)
            if (user?.id === job?.owner_id) {
                const { data: offersData } = await supabase.from('offers').select('*, helper:profiles!helper_id(full_name, avatar_url, rating_avg)').eq('job_id', id)
                setOffers(offersData ?? [])
            }
            // daca helper a mai dat oferta nu mai poate sa dea alta aici ci doar in chat o editare 
            else if (user) {
                const { data: myOffer } = await supabase.from('offers').select('*').eq('job_id', id).eq('helper_id', user.id).maybeSingle()
                if (myOffer) setHasApplied(true)
            }
            setLoading(false)
        }
        fetchJob()
    }, [])

    // TODO: implementeaza handleSendOffer (still needs testing, chat not created)
    async function handleSendOffer(e: React.FormEvent) {
        e.preventDefault()
        setSubmitError(null)
        setSubmitting(true)
        try {
            const { error } = await supabase.from('offers').insert({
                job_id: id,
                helper_id: user?.id,
                price: parseFloat(price),
                message,
            })
            if (error) throw error
            const conversation = await getOrCreateConversation(id!, job.owner_id, user?.id!)
            navigate('/chat/' + conversation.id)
        } catch (error: any) {
            setSubmitError(error.message)
        } finally {
            setSubmitting(false)
        }
    }

    // TODO: implementeaza handleAcceptOffer (still needs testing)
    async function handleAcceptOffer(offer: any) {
        if (!job || !user) return
        setSubmitError(null)
        setSubmitting(true)
        try {
            // 1. UPDATE oferta: status = 'accepted'
            const { error: offerError } = await supabase.from('offers').update({ status: 'accepted' }).eq('id', offer.id)
            if (offerError) throw offerError
            // 2. UPDATE restul ofertelor pe job: status = 'rejected'
            const { error: rejectedOffersError } = await supabase.from('offers').update({ status: 'rejected' }).eq('job_id', job.id).neq('id', offer.id)
            if (rejectedOffersError) throw rejectedOffersError
            // 3. UPDATE jobul: status = 'assigned', helper_id = offer.helper_id
            const { error: jobError } = await supabase.from('jobs').update({
                status: 'assigned',
                helper_id: offer.helper_id,
                updated_at: new Date().toISOString()
            }).eq('id', job.id)
            if (jobError) throw jobError
            // 4. refresh local state
            setJob({
                ...job,
                status: 'assigned',
                helper_id: offer.helper_id
            })
            setOffers(offers.map(o =>
                o.id === offer.id ? { ...o, status: 'accepted' } : { ...o, status: 'rejected' }
            ))
        } catch (error: any) {
            setSubmitError(error.message)
        } finally {
            setSubmitting(false)
        }

    }

    // Loading
    if (loading) {
        return (
            <div className="flex justify-center py-32">
                <div className="w-8 h-8 border-3 rounded-full animate-spin" style={{ borderColor: '#D9CFC7', borderTopColor: '#C9B59C' }} />
            </div>
        )
    }

    if (!job) {
        return (
            <div className="pt-12 pb-24 px-6 md:px-12 max-w-4xl mx-auto text-center">
                <span className="material-symbols-outlined text-5xl mb-4 block" style={{ color: '#C9B59C' }}>search_off</span>
                <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#2c2419' }}>Job not found</h2>
                <p className="mb-6" style={{ color: '#6b5e50' }}>This job may have been removed or doesn't exist.</p>
                <GradientButton to="/dashboard" icon="arrow_back">Back to Dashboard</GradientButton>
            </div>
        )
    }

    return (
        <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            <main className="pt-12 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto">

                {/* Header cu detalii job */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Stanga: detalii job */}
                    <div className="lg:col-span-7">
                        <div className="mb-6">
                            <GradientButton to="/helped-jobs" variant="outline" icon="arrow_back" size="sm">Back to Jobs</GradientButton>
                        </div>

                        <div className="rounded-[2rem] p-8 md:p-12" style={{ background: '#FFFFFF', boxShadow: '0 24px 48px rgba(44, 36, 25, 0.04)' }}>
                            {/* Status + Urgency */}
                            <div className="flex items-center gap-3 mb-6 flex-wrap">
                                <StatusBadge status={job.status} />
                                <UrgencyBadge urgency={job.urgency} />
                                {job.ai_generated && (
                                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                                        style={{ background: '#E0E7FF', color: '#3730A3' }}>
                                        AI Assisted
                                    </span>
                                )}
                            </div>

                            {/* Categorie + Titlu */}
                            <div className="flex items-start gap-5 mb-8">

                                <div>
                                    <span className="text-[10px] font-bold tracking-widest uppercase block mb-1" style={{ color: '#6b5e50' }}>{job.category}</span>
                                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#2c2419' }}>
                                        {job.title}
                                    </h1>
                                </div>
                            </div>

                            {/* Descriere */}
                            <div className="mb-8">
                                <h3 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#6b5e50' }}>Description</h3>
                                <p className="leading-relaxed" style={{ color: '#2c2419' }}>{job.description}</p>
                            </div>

                            {/* Info grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6" style={{ borderTop: '1px solid #EFE9E3' }}>
                                {job.budget && (
                                    <div className="p-4 rounded-xl" style={{ background: '#F9F8F6' }}>
                                        <span className="text-[10px] font-bold tracking-widest uppercase block mb-1" style={{ color: '#6b5e50' }}>Budget</span>
                                        <span className="text-lg font-black" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#2c2419' }}>{job.budget}</span>
                                    </div>
                                )}
                                <div className="p-4 rounded-xl" style={{ background: '#F9F8F6' }}>
                                    <span className="text-[10px] font-bold tracking-widest uppercase block mb-1" style={{ color: '#6b5e50' }}>Posted</span>
                                    <span className="text-sm font-medium" style={{ color: '#2c2419' }}>
                                        {new Date(job.created_at).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </span>
                                </div>
                                <div className="p-4 rounded-xl" style={{ background: '#F9F8F6' }}>
                                    <span className="text-[10px] font-bold tracking-widest uppercase block mb-1" style={{ color: '#6b5e50' }}>Offers</span>
                                    <span className="text-lg font-black" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#2c2419' }}>{offers.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dreapta: formular oferta SAU lista oferte */}
                    <aside className="lg:col-span-5 lg:sticky lg:top-32">

                        {/* Formular oferta doar pt helperi pe joburi open */}
                        {!isOwner && job.status === 'open' && !hasApplied && (
                            <div className="rounded-[2rem] p-8 relative overflow-hidden" style={{ background: '#4a3f35' }}>
                                <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl" style={{ background: 'rgba(200, 180, 155, 0.15)' }} />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 rounded-lg" style={{ background: 'rgba(201, 181, 156, 0.15)' }}>
                                            <span className="material-symbols-outlined" style={{ color: '#C9B59C', fontVariationSettings: "'FILL' 1" }}>local_offer</span>
                                        </div>
                                        <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#FFFFFF' }}>
                                            Send an Offer
                                        </h2>
                                    </div>

                                    <form onSubmit={handleSendOffer} className="space-y-5">
                                        <div>
                                            <label className="block text-sm font-medium mb-2" style={{ color: '#D9CFC7' }}>Your Price (RON)</label>
                                            <input type="number" value={price} onChange={e => setPrice(e.target.value)}
                                                placeholder="e.g. 250" required min="1"
                                                className="w-full rounded-xl p-4 text-base outline-none"
                                                style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#FFFFFF' }} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2" style={{ color: '#D9CFC7' }}>Message</label>
                                            <textarea value={message} onChange={e => setMessage(e.target.value)}
                                                placeholder="Describe your approach, availability, experience..."
                                                rows={4} required
                                                className="w-full rounded-xl p-4 text-base leading-relaxed resize-none outline-none"
                                                style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#FFFFFF' }} />
                                        </div>

                                        {submitError && <AlertMessage type="error" message={submitError} />}

                                        <button type="submit" disabled={submitting}
                                            className="w-full py-4 font-bold rounded-xl flex items-center justify-center gap-3 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                                            style={{ background: '#C9B59C', color: '#2c2419' }}>
                                            {submitting ? (
                                                <><span className="material-symbols-outlined animate-spin text-base">progress_activity</span>Sending...</>
                                            ) : (
                                                <><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>Send Offer</>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {!isOwner && job.status === 'open' && hasApplied && (
                            <div className="rounded-[2rem] p-8 relative overflow-hidden" style={{ background: '#4a3f35' }}>
                                <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl" style={{ background: 'rgba(200, 180, 155, 0.15)' }} />
                                <div className="relative z-10">
                                    <div className="mb-6 flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#C9B59C' }} />
                                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#C9B59C' }}>Offer Already Sent</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#FFFFFF' }}>Waiting for approval</h3>
                                    <p className="leading-relaxed mb-8" style={{ color: '#D9CFC7' }}>You've already submitted your offer. The homeowner will review it and contact you if they want to proceed.</p>
                                </div>
                            </div>
                        )}

                        {/* Lista oferte doar pt owner */}
                        {isOwner && (
                            <div className="rounded-[2rem] p-8" style={{ background: '#FFFFFF', boxShadow: '0 24px 48px rgba(44, 36, 25, 0.04)' }}>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-2 rounded-xl" style={{ background: '#C9B59C20' }}>
                                        <span className="material-symbols-outlined" style={{ color: '#C9B59C' }}>list_alt</span>
                                    </div>
                                    <h2 className="text-xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#2c2419' }}>
                                        Offers Received ({offers.length})
                                    </h2>
                                </div>

                                {offers.length === 0 ? (
                                    <div className="text-center py-8">
                                        <span className="material-symbols-outlined text-4xl mb-3 block" style={{ color: '#D9CFC7' }}>hourglass_empty</span>
                                        <p className="text-sm" style={{ color: '#6b5e50' }}>No offers yet. Technicians will see your job and send proposals.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {offers.map((offer) => (
                                            <div key={offer.id} className="rounded-2xl p-6" style={{ background: '#F9F8F6' }}>
                                                {/* Helper info */}
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center"
                                                        style={{ background: '#EFE9E3', border: '2px solid #D9CFC7' }}>
                                                        {offer.helper?.avatar_url ? (
                                                            <img src={offer.helper.avatar_url} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <span className="material-symbols-outlined text-lg" style={{ color: '#6b5e50' }}>person</span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-bold text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#2c2419' }}>
                                                            {offer.helper?.full_name ?? 'Technician'}
                                                        </div>
                                                        {offer.helper?.rating_avg > 0 && (
                                                            <div className="flex items-center gap-1">
                                                                <span className="material-symbols-outlined text-xs" style={{ color: '#F59E0B', fontVariationSettings: "'FILL' 1" }}>star</span>
                                                                <span className="text-xs" style={{ color: '#6b5e50' }}>{offer.helper.rating_avg.toFixed(1)}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-[10px] font-bold uppercase tracking-widest block" style={{ color: '#6b5e50' }}>Price</span>
                                                        <span className="text-xl font-black" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#2c2419' }}>
                                                            {offer.price} RON
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Mesaj oferta */}
                                                <p className="text-sm leading-relaxed mb-4" style={{ color: '#6b5e50' }}>{offer.message}</p>

                                                {/* Actiuni */}
                                                {offer.status === 'pending' && job.status === 'open' && (
                                                    <div className="flex gap-3">
                                                        <button onClick={() => handleAcceptOffer(offer)}
                                                            className="flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
                                                            style={{ background: '#2c2419', color: '#F9F8F6' }}>
                                                            <span className="material-symbols-outlined text-sm">check</span>Accept
                                                        </button>
                                                        {/* //TODO : implementeaza decline offer  */}
                                                        <button className="px-5 py-3 rounded-xl font-bold text-sm transition-all duration-200"
                                                            style={{ border: '1px solid #D9CFC7', color: '#6b5e50' }}>
                                                            Decline
                                                        </button>
                                                    </div>
                                                )}
                                                {offer.status === 'accepted' && (
                                                    <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider"
                                                        style={{ background: '#D1FAE5', color: '#065F46' }}>Accepted</span>
                                                )}
                                                {offer.status === 'rejected' && (
                                                    <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider"
                                                        style={{ background: '#F3F4F6', color: '#6B7280' }}>Declined</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </aside>
                </div>
            </main>
        </div>
    )
}