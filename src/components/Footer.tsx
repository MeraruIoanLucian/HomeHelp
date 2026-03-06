const footerLinks = {
    Product: ['Features', 'Pricing', 'How It Works', 'FAQ'],
    Company: ['About Us', 'Careers', 'Blog', 'Press'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
    Support: ['Help Center', 'Contact Us', 'Community'],
}

export default function Footer() {
    return (
        <footer
            className="pt-16 pb-8 px-6 sm:px-12"
            style={{ background: '#2c2419' }}
        >
            <div className="max-w-6xl mx-auto">
                {/* Footer Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#C9B59C' }}>{category}</h4>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-sm transition-colors duration-200" style={{ color: '#D9CFC7' }}
                                            onMouseEnter={e => (e.target as HTMLElement).style.color = '#F9F8F6'}
                                            onMouseLeave={e => (e.target as HTMLElement).style.color = '#D9CFC7'}
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid #C9B59C30' }}>
                    <span className="text-xl font-extrabold tracking-tight" style={{ color: '#EFE9E3' }}>
                        Home<span style={{ color: '#C9B59C' }}>Help</span>
                    </span>
                    <p className="text-xs" style={{ color: '#C9B59C80' }}>
                        © {new Date().getFullYear()} HomeHelp. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        {['𝕏', 'in', 'f'].map((icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 hover:-translate-y-0.5"
                                style={{ background: '#C9B59C20', border: '1px solid #C9B59C30', color: '#D9CFC7' }}
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
