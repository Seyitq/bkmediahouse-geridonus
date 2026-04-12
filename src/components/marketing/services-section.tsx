'use client'

import { useState } from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface Service {
    id: string
    name: string
    slug: string
    description: string
    icon: string
    color: string
}

interface ServicesSectionProps {
    services: Service[]
}

// Dynamic icon component
function DynamicIcon({ name, className }: { name: string; className?: string }) {
    const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number; strokeWidth?: number }>>)[name]
    if (!IconComponent) return <Icons.Layers className={className} />
    return <IconComponent className={className} />
}

export function ServicesSection({ services }: ServicesSectionProps) {
    const [selectedService, setSelectedService] = useState<Service | null>(
        services.length > 0 ? services[0] : null
    )

    if (services.length === 0) {
        return null
    }

    return (
        <section className="py-24 bg-zinc-50 border-y border-zinc-200 overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tighter">
                        Hizmet <span className="text-zinc-400">Alanı</span>
                    </h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
                        Markanızın ihtiyacı olan tüm dijital çözümleri tek bir çatı altında sunuyoruz.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Icon Section */}
                    <div className="relative order-2 lg:order-1">
                        <div className="aspect-square max-w-lg mx-auto relative">
                            {/* Glow effect */}
                            <div
                                className="absolute inset-0 rounded-full blur-3xl opacity-20 transition-colors duration-500"
                                style={{ backgroundColor: selectedService?.color || '#3b82f6' }}
                            />

                            {/* Icon Display */}
                            <div className="relative z-10 w-full h-full">
                                {selectedService && (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <DynamicIcon
                                            name={selectedService.icon}
                                            className="w-32 h-32 transition-colors duration-300"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Selected Service Info */}
                        {selectedService && (
                            <div className="text-center mt-8 space-y-4">
                                <h3
                                    className="text-2xl font-bold transition-colors duration-300"
                                    style={{ color: selectedService.color }}
                                >
                                    {selectedService.name}
                                </h3>
                                <p className="text-zinc-500 max-w-md mx-auto">
                                    {selectedService.description}
                                </p>
                                <Link href={`/hizmetler/${selectedService.slug}`}>
                                    <Button
                                        className="group"
                                        style={{
                                            backgroundColor: selectedService.color,
                                            color: '#fff'
                                        }}
                                    >
                                        Detayları İncele
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Service Cards Grid */}
                    <div className="order-1 lg:order-2">
                        <div className="grid grid-cols-2 gap-4">
                            {services.map((service) => {
                                const isSelected = selectedService?.id === service.id
                                return (
                                    <Card
                                        key={service.id}
                                        className={`
                                            bg-white border-zinc-200 transition-all duration-300 cursor-pointer group
                                            ${isSelected ? 'border-2 scale-105 shadow-lg' : 'hover:border-zinc-300 hover:shadow-md'}
                                        `}
                                        style={{
                                            borderColor: isSelected ? service.color : undefined,
                                            boxShadow: isSelected ? `0 0 30px ${service.color}20` : undefined,
                                        }}
                                        onClick={() => setSelectedService(service)}
                                    >
                                        <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                                            <div
                                                className="p-4 rounded-full transition-colors"
                                                style={{
                                                    backgroundColor: isSelected ? `${service.color}20` : 'rgb(244 244 245)',
                                                    color: isSelected ? service.color : 'rgb(113 113 122)',
                                                }}
                                            >
                                                <DynamicIcon name={service.icon} className="h-8 w-8" />
                                            </div>
                                            <h3
                                                className="font-medium transition-colors"
                                                style={{ color: isSelected ? service.color : '#18181b' }}
                                            >
                                                {service.name}
                                            </h3>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
