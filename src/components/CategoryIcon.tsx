// Toate categoriile intr-un loc - folosit de CategoryIcon, CreateJob si LandingPage
export const CATEGORIES = [
    { value: 'Instalații Apă', icon: 'plumbing', label: 'Plumbing', sub: 'Systems & Fixtures' },
    { value: 'Electrice', icon: 'bolt', label: 'Electrical', sub: 'Power & Safety' },
    { value: 'Gaze', icon: 'gas_meter', label: 'Gas', sub: 'Installation & Repair' },
    { value: 'Centrale Termice', icon: 'device_thermostat', label: 'Heating', sub: 'Climate Control' },
    { value: 'Climatizare', icon: 'ac_unit', label: 'HVAC', sub: 'Air Conditioning' },
    { value: 'Altele', icon: 'handyman', label: 'Other', sub: 'General Repairs' },
] as const

type CategoryIconProps = {
    category: string
    size?: 'sm' | 'md' | 'lg'
    color?: string
}

const sizeMap = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-4xl',
}

export default function CategoryIcon({ category, size = 'md', color }: CategoryIconProps) {
    const match = CATEGORIES.find(c => c.value === category)
    const icon = match?.icon ?? 'handyman'
    return (
        <span
            className={`material-symbols-outlined ${sizeMap[size]}`}
            style={{ color: color ?? 'var(--brand-accent)' }}
        >
            {icon}
        </span>
    )
}
