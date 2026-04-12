'use client'

import Link from 'next/link'
import * as Icons from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

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

// Bento grid size patterns — cycles every 6 cards
const bentoPatterns = [
    { colSpan: 2, rowSpan: 2 }, // large featured
    { colSpan: 1, rowSpan: 1 }, // small
    { colSpan: 1, rowSpan: 1 }, // small
    { colSpan: 1, rowSpan: 1 }, // small
    { colSpan: 1, rowSpan: 1 }, // small
    { colSpan: 2, rowSpan: 1 }, // wide
]

function getBentoSize(index: number) {
    return bentoPatterns[index % bentoPatterns.length]
}

export function ServicesMarquee({ services }: ServicesMarqueeProps) {
    if (services.length === 0) {
        return null
    }

    return (
        <section className="py-20 md:py-28 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <div className="mb-14">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-sm font-semibold uppercase tracking-widest text-zinc-400 mb-3"
                    >
                        Neler Yapıyoruz
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-4"
                    >
                        Hizmetlerimiz
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-zinc-500 max-w-lg text-lg"
                    >
                        Markanızın ihtiyacı olan tüm dijital çözümler, tek çatı altında.
                    </motion.p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[180px] gap-4">
                    {services.map((service, index) => {
                        const size = getBentoSize(index)
                        return (
                            <BentoCard
                                key={service.id}
                                service={service}
                                index={index}
                                colSpan={size.colSpan}
                                rowSpan={size.rowSpan}
                            />
                        )
                    })}
                </div>

                {/* View All Link */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-12 flex justify-center"
                >
                    <Link
                        href="/hizmetler"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-400 hover:shadow-sm transition-all duration-300 group text-sm font-medium"
                    >
                        Tüm Hizmetleri Gör
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

function BentoCard({
    service,
    index,
    colSpan,
    rowSpan,
}: {
    service: Service
    index: number
    colSpan: number
    rowSpan: number
}) {
    const isLarge = colSpan === 2 && rowSpan === 2
    const isWide = colSpan === 2 && rowSpan === 1

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className={`
                ${colSpan === 2 ? 'sm:col-span-2' : 'col-span-1'}
                ${rowSpan === 2 ? 'sm:row-span-2' : 'row-span-1'}
            `}
        >
            <Link
                href={`/hizmetler/${service.slug}`}
                className="group relative flex flex-col justify-between h-full rounded-2xl border border-zinc-100 bg-zinc-50/50 p-6 md:p-8 transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200/50 hover:border-zinc-200 overflow-hidden"
            >
                {/* Background gradient on hover */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(ellipse at top left, ${service.color}, transparent 70%)`,
                    }}
                />

                {/* Large decorative icon in background */}
                <div className="absolute -bottom-6 -right-6 opacity-[0.04] group-hover:opacity-[0.08] transition-all duration-700 group-hover:scale-110">
                    <DynamicIcon
                        name={service.icon}
                        className={isLarge ? 'h-48 w-48' : isWide ? 'h-36 w-36' : 'h-28 w-28'}
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                    {/* Icon badge */}
                    <div
                        className={`flex items-center justify-center rounded-2xl mb-4 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg ${
                            isLarge ? 'w-16 h-16' : 'w-12 h-12'
                        }`}
                        style={{
                            backgroundColor: `${service.color}15`,
                            color: service.color,
                            boxShadow: `0 0 0 0 ${service.color}00`,
                        }}
                    >
                        <DynamicIcon
                            name={service.icon}
                            className={isLarge ? 'h-8 w-8' : 'h-6 w-6'}
                        />
                    </div>

                    {/* Text */}
                    <div className="flex-1 flex flex-col">
                        <h3
                            className={`font-semibold text-zinc-900 mb-2 ${
                                isLarge ? 'text-xl md:text-2xl' : 'text-base'
                            }`}
                        >
                            {service.name}
                        </h3>
                        <p
                            className={`text-zinc-500 leading-relaxed ${
                                isLarge
                                    ? 'text-sm md:text-base line-clamp-4'
                                    : isWide
                                        ? 'text-sm line-clamp-2'
                                        : 'text-sm line-clamp-2'
                            }`}
                        >
                            {service.description}
                        </p>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center gap-1.5 mt-4">
                        <span
                            className="text-xs font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                            style={{ color: service.color }}
                        >
                            Detayları Gör
                        </span>
                        <ArrowRight
                            className="h-4 w-4 -translate-x-4 group-hover:translate-x-0 transition-all duration-300"
                            style={{ color: service.color }}
                        />
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}


