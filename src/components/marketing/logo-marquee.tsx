'use client'

import { Building2 } from 'lucide-react'

interface TrustedCompany {
    id: string
    name: string
    logoUrl: string
    websiteUrl?: string | null
}

interface LogoMarqueeProps {
    companies: TrustedCompany[]
    speed?: number
}

// Helper to validate and fix URLs
function isValidImageUrl(url: string): boolean {
    if (!url) return false
    return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')
}

function fixUrl(url: string): string {
    if (!url) return ''
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
        return url
    }
    return `https://${url}`
}

export function LogoMarquee({ companies, speed = 80 }: LogoMarqueeProps) {
    const validCompanies = companies.filter(c => c.logoUrl && c.logoUrl.length > 0)

    if (validCompanies.length === 0) return null

    const LogoItem = ({ company }: { company: TrustedCompany }) => {
        const logoUrl = fixUrl(company.logoUrl)
        const websiteUrl = company.websiteUrl ? fixUrl(company.websiteUrl) : null
        const isValid = isValidImageUrl(logoUrl)

        const content = isValid ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
                src={logoUrl}
                alt={company.name}
                className="w-full h-full object-contain"
            />
        ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-800 rounded">
                <Building2 className="h-6 w-6 text-zinc-600" />
            </div>
        )

        return (
            <div className="flex-shrink-0 w-32 h-16 mx-8 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300">
                {websiteUrl ? (
                    <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        {content}
                    </a>
                ) : content}
            </div>
        )
    }

    return (
        <section className="py-16 bg-zinc-950 overflow-hidden">
            <div className="container px-4 mx-auto mb-10">
                <p className="text-center text-zinc-500 text-sm uppercase tracking-widest">
                    Bize Güvenen Markalar
                </p>
            </div>

            <div className="relative flex overflow-hidden group">
                {/* CSS-based infinite scroll */}
                <div
                    className="flex w-max animate-marquee hover:[animation-play-state:paused]"
                    style={{
                        animationDuration: `${speed}s`,
                    }}
                >
                    {validCompanies.map((company, i) => (
                        <LogoItem key={`a-${company.id}-${i}`} company={company} />
                    ))}
                    {validCompanies.map((company, i) => (
                        <LogoItem key={`b-${company.id}-${i}`} company={company} />
                    ))}
                    {validCompanies.map((company, i) => (
                        <LogoItem key={`c-${company.id}-${i}`} company={company} />
                    ))}
                    {validCompanies.map((company, i) => (
                        <LogoItem key={`d-${company.id}-${i}`} company={company} />
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .animate-marquee {
                    animation: marquee linear infinite;
                }
            `}</style>
        </section>
    )
}
