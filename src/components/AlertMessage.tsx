type AlertMessageProps = {
    type: 'error' | 'success'
    message: string
}

const styleMap = {
    error: {
        bg: '#FEE2E2',
        color: '#991B1B',
        border: '1px solid #FECACA',
        icon: 'error',
    },
    success: {
        bg: '#D1FAE5',
        color: '#065F46',
        border: '1px solid #A7F3D0',
        icon: 'check_circle',
    },
}

// componenta simpla pt mesaje de eroare/succes
const AlertMessage = ({ type, message }: AlertMessageProps) => {
    if (!message) return null

    const s = styleMap[type]
    return (
        <div
            className="p-3 rounded-xl text-sm flex items-start gap-2"
            style={{ background: s.bg, color: s.color, border: s.border }}
        >
            <span className="material-symbols-outlined text-base mt-0.5">{s.icon}</span>
            <span>{message}</span>
        </div>
    )
}

export default AlertMessage
