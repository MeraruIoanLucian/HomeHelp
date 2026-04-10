type SectionHeadingProps = {
    title: string
    subtitle?: string
    centered?: boolean
    light?: boolean
    size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
    sm: 'text-3xl md:text-4xl',
    md: 'text-4xl md:text-5xl',
    lg: 'text-4xl md:text-5xl lg:text-6xl',
}

export default function SectionHeading({
    title,
    subtitle,
    centered = false,
    light = false,
    size = 'md',
}: SectionHeadingProps) {
    return (
        <div className={centered ? 'text-center' : ''}>
            <h2
                className={`${sizeMap[size]} font-extrabold tracking-tight mb-2`}
                style={{
                    fontFamily: 'var(--font-heading)',
                    color: light ? 'var(--brand-bg)' : 'var(--brand-dark)',
                }}
            >
                {title}
            </h2>
            {subtitle && (
                <p
                    className={`text-lg max-w-2xl ${centered ? 'mx-auto' : ''}`}
                    style={{ color: light ? 'var(--brand-accent)' : 'var(--brand-muted)' }}
                >
                    {subtitle}
                </p>
            )}
        </div>
    )
}
