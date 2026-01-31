'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Project {
    id: string
    title: string
    slug: string
    coverImage: string | null
    clientName: string | null
    servicesProvided: string
}

interface PortfolioSliderProps {
    projects: Project[]
}

export function PortfolioSlider({ projects }: PortfolioSliderProps) {
    const sliderRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const checkScroll = () => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    useEffect(() => {
        checkScroll()
        const slider = sliderRef.current
        if (slider) {
            slider.addEventListener('scroll', checkScroll)
            return () => slider.removeEventListener('scroll', checkScroll)
        }
    }, [])

    const scroll = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const scrollAmount = sliderRef.current.clientWidth * 0.8
            sliderRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    if (projects.length === 0) return null

    return (
        <section className="py-20 bg-zinc-950">
            <div className="container px-4 mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-3"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            Çalışmalarımız
                        </h2>
                        <p className="text-zinc-400 max-w-md">
                            Markalar için ürettiğimiz projelerden örnekler
                        </p>
                    </motion.div>

                    <div className="flex items-center gap-4">
                        {/* Navigation Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => scroll('left')}
                                disabled={!canScrollLeft}
                                className={`p-3 rounded-full border transition-all ${canScrollLeft
                                    ? 'border-zinc-700 text-white hover:bg-zinc-800'
                                    : 'border-zinc-800 text-zinc-600 cursor-not-allowed'
                                    }`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                disabled={!canScrollRight}
                                className={`p-3 rounded-full border transition-all ${canScrollRight
                                    ? 'border-zinc-700 text-white hover:bg-zinc-800'
                                    : 'border-zinc-800 text-zinc-600 cursor-not-allowed'
                                    }`}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        <Link href="/calismalar">
                            <Button className="bg-white text-black hover:bg-zinc-200 group">
                                Tümünü Gör
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Slider */}
                <div className="relative">
                    {/* Gradient fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

                    {/* Scrollable container */}
                    <div
                        ref={sliderRef}
                        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {projects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex-shrink-0 w-[320px] md:w-[400px] snap-start"
                            >
                                <Link href={`/calismalar/${project.slug}`} className="group block">
                                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 transition-all">
                                        {project.coverImage ? (
                                            <Image
                                                src={project.coverImage}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                                                <span className="text-zinc-600">Görsel</span>
                                            </div>
                                        )}

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                        {/* Content overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-5">
                                            {project.clientName && (
                                                <span className="text-sm text-blue-400 font-medium mb-1 block">
                                                    {project.clientName}
                                                </span>
                                            )}
                                            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                                                {project.title}
                                            </h3>

                                            {/* Services tags */}
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {(() => {
                                                    try {
                                                        const services = JSON.parse(project.servicesProvided || '[]')
                                                        return services.slice(0, 2).map((service: string) => (
                                                            <span
                                                                key={service}
                                                                className="text-xs text-zinc-400 bg-zinc-800/80 px-2 py-1 rounded"
                                                            >
                                                                {service.replace(/-/g, ' ')}
                                                            </span>
                                                        ))
                                                    } catch {
                                                        return null
                                                    }
                                                })()}
                                            </div>
                                        </div>

                                        {/* Hover arrow */}
                                        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                            <ArrowRight className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    )
}
