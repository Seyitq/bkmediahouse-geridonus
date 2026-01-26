'use client'

import { Star, Quote, User } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface Testimonial {
    id: string
    name: string
    title: string
    company?: string | null
    content: string
    photoUrl?: string | null
    rating: number
}

interface TestimonialMarqueeProps {
    testimonials: Testimonial[]
    speed?: number
}

export function TestimonialMarquee({ testimonials, speed = 50 }: TestimonialMarqueeProps) {
    if (testimonials.length === 0) return null

    const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
        <Card className="flex-shrink-0 w-[400px] mx-3 bg-zinc-900/80 border-zinc-800 backdrop-blur-sm hover:border-zinc-700 transition-colors">
            <CardContent className="p-6 flex flex-col h-full">
                <Quote className="h-8 w-8 text-blue-500/30 mb-4" />

                <p className="text-zinc-300 text-base leading-relaxed flex-1 mb-6">
                    "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {testimonial.photoUrl ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                                src={testimonial.photoUrl}
                                alt={testimonial.name}
                                className="w-12 h-12 object-cover rounded-full"
                            />
                        ) : (
                            <User className="h-6 w-6 text-zinc-600" />
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-medium text-white truncate">{testimonial.name}</div>
                        <div className="text-sm text-zinc-500 truncate">
                            {testimonial.title}
                            {testimonial.company && `, ${testimonial.company}`}
                        </div>
                    </div>
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )

    return (
        <section className="py-20 bg-zinc-900/50 overflow-hidden">
            <div className="container px-4 mx-auto mb-12">
                <div className="text-center space-y-4">
                    <p className="text-blue-400 text-sm uppercase tracking-widest">Müşteri Yorumları</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                        Müşterilerimiz Ne Diyor?
                    </h2>
                </div>
            </div>

            <div className="relative flex overflow-hidden group">
                {/* CSS-based infinite scroll */}
                <div
                    className="flex w-max animate-marquee-testimonial hover:[animation-play-state:paused]"
                    style={{ animationDuration: `${speed}s` }}
                >
                    {testimonials.map((t, i) => (
                        <TestimonialCard key={`a-${t.id}-${i}`} testimonial={t} />
                    ))}
                    {testimonials.map((t, i) => (
                        <TestimonialCard key={`b-${t.id}-${i}`} testimonial={t} />
                    ))}
                    {testimonials.map((t, i) => (
                        <TestimonialCard key={`c-${t.id}-${i}`} testimonial={t} />
                    ))}
                    {testimonials.map((t, i) => (
                        <TestimonialCard key={`d-${t.id}-${i}`} testimonial={t} />
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee-testimonial {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .animate-marquee-testimonial {
                    animation: marquee-testimonial linear infinite;
                }
            `}</style>
        </section>
    )
}
