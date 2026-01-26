'use client'

import Link from 'next/link'
import * as Icons from 'lucide-react'
import { ArrowRight } from 'lucide-react'

interface Service {
    id: string
    name: string
    slug: string
    description: string
    icon: string
    color: string
}

interface ServicesMarqueeProps {
    services: Service[]
}

// Dynamic icon component
function DynamicIcon({ name, className }: { name: string; className?: string }) {
    const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name]
    if (!IconComponent) return <Icons.Layers className={className} />
    return <IconComponent className={className} />
}

export function ServicesMarquee({ services }: ServicesMarqueeProps) {
    if (services.length === 0) {
        return null
    }

    return (
        <section className="py-16 bg-zinc-950 border-y border-zinc-900 overflow-hidden">
            {/* Section Header */}
            <div className="text-center mb-12 px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-4">
                    Hizmetlerimiz
                </h2>
                <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                    Markanızın ihtiyacı olan tüm dijital çözümler
                </p>
            </div>

            {/* Marquee Container */}
            <div className="relative group/marquee">
                {/* Gradient Overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

                {/* Scrolling Track with CSS Animation */}
                <div
                    className="flex w-max hover:[animation-play-state:paused]"
                    style={{
                        animation: 'marquee-scroll 60s linear infinite',
                    }}
                >
                    {/* First set */}
                    {services.map((service, index) => (
                        <ServiceCard key={`first-${service.id}-${index}`} service={service} />
                    ))}
                    {/* Second set for seamless loop */}
                    {services.map((service, index) => (
                        <ServiceCard key={`second-${service.id}-${index}`} service={service} />
                    ))}
                </div>
            </div>

            {/* View All Link */}
            <div className="text-center mt-10">
                <Link
                    href="/hizmetler"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
                >
                    Tüm Hizmetleri Gör
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </section>
    )
}

function ServiceCard({ service }: { service: Service }) {
    return (
        <Link
            href={`/hizmetler/${service.slug}`}
            className="flex-shrink-0 mx-3 group"
        >
            <div
                className="relative w-72 h-40 rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-300 hover:scale-105 overflow-hidden"
                style={{
                    borderColor: `${service.color}30`,
                }}
            >
                {/* Glow Effect on Hover */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"
                    style={{ backgroundColor: service.color }}
                />

                {/* Content */}
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div
                            className="p-2 rounded-lg"
                            style={{
                                backgroundColor: `${service.color}20`,
                                color: service.color,
                            }}
                        >
                            <DynamicIcon name={service.icon} className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-white group-hover:text-opacity-100 transition-colors duration-300"
                            style={{ color: service.color }}
                        >
                            {service.name}
                        </h3>
                    </div>
                    <p className="text-sm text-zinc-500 line-clamp-2">
                        {service.description}
                    </p>
                </div>

                {/* Arrow */}
                <div className="relative z-10 flex justify-end">
                    <ArrowRight className="h-5 w-5 text-zinc-600 group-hover:translate-x-1 group-hover:text-white transition-all duration-300" />
                </div>
            </div>
        </Link>
    )
}


