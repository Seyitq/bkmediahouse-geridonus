'use client'

import { useState, useEffect, useCallback } from 'react'
import { Star, Quote, User, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Testimonial {
    id: string
    name: string
    title: string
    company?: string | null
    content: string
    photoUrl?: string | null
    rating: number
}

interface TestimonialSliderProps {
    testimonials: Testimonial[]
    autoPlayInterval?: number
}

export function TestimonialSlider({
    testimonials,
    autoPlayInterval = 5000
}: TestimonialSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    const totalSlides = testimonials.length

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides)
        setProgress(0)
    }, [totalSlides])

    const goToPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
        setProgress(0)
    }, [totalSlides])

    const goToSlide = useCallback((index: number) => {
        setCurrentIndex(index)
        setProgress(0)
    }, [])

    // Auto-play with progress animation
    useEffect(() => {
        if (isPaused || totalSlides <= 1) return

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    return 0
                }
                return prev + (100 / (autoPlayInterval / 50))
            })
        }, 50)

        return () => clearInterval(progressInterval)
    }, [isPaused, autoPlayInterval, totalSlides])

    // Handle slide change when progress completes
    useEffect(() => {
        if (progress >= 100) {
            goToNext()
        }
    }, [progress, goToNext])

    if (testimonials.length === 0) return null

    return (
        <section
            className="py-20 bg-[#09090b] overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="container px-4 mx-auto">
                {/* Header */}
                <div className="text-center space-y-4 mb-12">
                    <p className="text-blue-400 text-sm uppercase tracking-widest">Müşteri Yorumları</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                        Müşterilerimiz Ne Diyor?
                    </h2>
                </div>

                {/* Slider Container */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Navigation Buttons */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={goToPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-10 h-12 w-12 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 shadow-sm transition-all hover:scale-110"
                        aria-label="Önceki yorum"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-10 h-12 w-12 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 shadow-sm transition-all hover:scale-110"
                        aria-label="Sonraki yorum"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </Button>

                    {/* Testimonial Card */}
                    <div className="overflow-hidden">
                        <div
                            className="transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            <div className="flex">
                                {testimonials.map((testimonial, index) => (
                                    <div
                                        key={testimonial.id}
                                        className="w-full flex-shrink-0 px-4"
                                    >
                                        <Card className={cn(
                                            "bg-zinc-900/80 border-zinc-800 shadow-sm transition-all duration-500",
                                            index === currentIndex ? "opacity-100 scale-100" : "opacity-50 scale-95"
                                        )}>
                                            <CardContent className="p-8 md:p-12">
                                                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                                                    {/* Photo */}
                                                    <div className="flex-shrink-0">
                                                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-zinc-800 flex items-center justify-center overflow-hidden ring-4 ring-zinc-700">
                                                            {testimonial.photoUrl ? (
                                                                /* eslint-disable-next-line @next/next/no-img-element */
                                                                <img
                                                                    src={testimonial.photoUrl}
                                                                    alt={testimonial.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <User className="h-12 w-12 md:h-16 md:w-16 text-zinc-500" />
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 text-center md:text-left">
                                                        <Quote className="h-10 w-10 text-blue-400/20 mb-4 mx-auto md:mx-0" />

                                                        <p className="text-zinc-300 text-lg md:text-xl leading-relaxed mb-6">
                                                            &ldquo;{testimonial.content}&rdquo;
                                                        </p>

                                                        {/* Rating */}
                                                        <div className="flex items-center gap-1 justify-center md:justify-start mb-4">
                                                            {Array.from({ length: 5 }).map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={cn(
                                                                        "h-5 w-5",
                                                                        i < testimonial.rating
                                                                            ? "fill-yellow-500 text-yellow-500"
                                                                            : "fill-zinc-700 text-zinc-700"
                                                                    )}
                                                                />
                                                            ))}
                                                        </div>

                                                        {/* Author Info */}
                                                        <div>
                                                            <div className="font-semibold text-white text-lg">
                                                                {testimonial.name}
                                                            </div>
                                                            <div className="text-blue-400">
                                                                {testimonial.title}
                                                                {testimonial.company && `, ${testimonial.company}`}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Indicators */}
                <div className="flex items-center justify-center gap-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={cn(
                                "h-2 rounded-full transition-all duration-300 relative overflow-hidden",
                                index === currentIndex
                                    ? "w-16 bg-zinc-700"
                                    : "w-2 bg-zinc-700 hover:bg-zinc-600"
                            )}
                            aria-label={`Yorum ${index + 1}'e git`}
                        >
                            {index === currentIndex && (
                                <div
                                    className="absolute inset-y-0 left-0 bg-blue-500 rounded-full transition-all duration-50"
                                    style={{ width: `${progress}%` }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Slide Counter */}
                <div className="text-center mt-4">
                    <span className="text-zinc-500 text-sm">
                        {currentIndex + 1} / {totalSlides}
                    </span>
                </div>
            </div>
        </section>
    )
}
