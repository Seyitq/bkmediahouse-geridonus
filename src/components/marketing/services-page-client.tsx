'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    ArrowRight,
    Video,
    Share2,
    Fingerprint,
    Monitor,
    Camera,
    Megaphone,
    PenTool,
    Calendar,
    Check,
    Clock,
    FileCheck,
    Target,
    Sparkles,
    TrendingUp,
    Shield,
    Users,
    Rocket
} from 'lucide-react'

// Goal mapping - hangi hedef hangi hizmetleri highlight eder
const goalMapping: Record<string, string[]> = {
    'satis': ['reklam-kampanyasi', 'web-tasarim', 'icerik-uretimi'],
    'guven': ['marka-kimligi', 'fotograf-cekimi', 'video-produksiyon'],
    'sosyal': ['sosyal-medya-yonetimi', 'icerik-uretimi', 'video-produksiyon'],
    'lansman': ['etkinlik-yonetimi', 'reklam-kampanyasi', 'video-produksiyon'],
}

const goals = [
    { id: 'satis', label: 'Satış artır', icon: TrendingUp },
    { id: 'guven', label: 'Marka güveni', icon: Shield },
    { id: 'sosyal', label: 'Sosyal büyüme', icon: Users },
    { id: 'lansman', label: 'Lansman', icon: Rocket },
]

const proofChips = [
    { icon: Clock, text: '24 saat içinde dönüş' },
    { icon: FileCheck, text: 'Net kapsam + teklif' },
    { icon: Target, text: 'Ölçülebilir sonuç' },
]

// Featured service (Reklam Kampanyası)
const featuredService = {
    id: 'reklam-kampanyasi',
    title: 'Reklam Kampanyası',
    icon: Megaphone,
    tagline: '7 günde ölçüm altyapısı + ilk kampanya seti.',
    features: [
        'Dönüşüm/ölçüm kurulumu + hedefleme',
        'Kreatif set + A/B test planı',
        'Haftalık optimizasyon + rapor',
    ],
    platforms: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'Retargeting'],
}

// Service type
interface ServiceType {
    id: string
    title: string
    icon: typeof Video
    tagline: string
    features: string[]
    platforms?: string[]
}

// Diğer 7 hizmet
const services: ServiceType[] = [
    {
        id: 'video-produksiyon',
        title: 'Video Prodüksiyon',
        icon: Video,
        tagline: '2–4 haftada reklam filmi + sosyal medya cut\'ları.',
        features: [
            'Senaryo / çekim planı / prodüksiyon',
            'Kurgu + renk + altyazı setleri',
        ],
    },
    {
        id: 'web-tasarim',
        title: 'Web Tasarım',
        icon: Monitor,
        tagline: 'Hızlı, modern ve dönüşüm odaklı web sitesi.',
        features: [
            'UI/UX + responsive geliştirme',
            'SEO temeli + performans optimizasyonu',
        ],
    },
    {
        id: 'sosyal-medya-yonetimi',
        title: 'Sosyal Medya Yönetimi',
        icon: Share2,
        tagline: 'Aylık içerik planı + topluluk + raporlama.',
        features: [
            'İçerik stratejisi + paylaşım takvimi',
            'Topluluk yönetimi + performans analizi',
        ],
    },
    {
        id: 'marka-kimligi',
        title: 'Marka Kimliği',
        icon: Fingerprint,
        tagline: '2–3 haftada tutarlı kimlik: logo + rehber.',
        features: [
            'Logo + renk paleti + tipografi',
            'Marka rehberi + kullanım kuralları',
        ],
    },
    {
        id: 'fotograf-cekimi',
        title: 'Fotoğraf Çekimi',
        icon: Camera,
        tagline: '1–2 günde ürün/katalog çekimi + retouch.',
        features: [
            'Ürün & stüdyo çekimleri',
            'Kurumsal & etkinlik fotoğrafları',
        ],
    },
    {
        id: 'icerik-uretimi',
        title: 'İçerik Üretimi',
        icon: PenTool,
        tagline: 'Haftalık içerik üretimi + SEO uyumlu metinler.',
        features: [
            'Blog + SEO içerikleri',
            'Copywriting + e-posta pazarlama',
        ],
    },
    {
        id: 'etkinlik-yonetimi',
        title: 'Etkinlik Yönetimi',
        icon: Calendar,
        tagline: 'Uçtan uca planlama + operasyon + içerik desteği.',
        features: [
            'Lansman & kurumsal toplantılar',
            'Fuar organizasyonu & dijital etkinlikler',
        ],
    },
]

// Service Card Component
function ServiceCard({
    service,
    isHighlighted,
    isFaded,
    isFeatured = false
}: {
    service: ServiceType
    isHighlighted: boolean
    isFaded: boolean
    isFeatured?: boolean
}) {
    const Icon = service.icon

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`
                relative group h-full
                ${isFeatured ? 'md:col-span-2' : ''}
                ${isFaded ? 'opacity-40' : 'opacity-100'}
                transition-opacity duration-300
            `}
        >
            <div className={`
                relative h-full p-6 rounded-2xl overflow-hidden
                bg-white
                border border-zinc-200
                hover:border-blue-300
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5
                ${isHighlighted ? 'ring-2 ring-blue-400 border-blue-300' : ''}
                ${isFeatured ? 'bg-gradient-to-br from-blue-50 via-white to-purple-50 border-blue-200' : ''}
            `}>
                {/* Gradient border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Featured badge */}
                {isFeatured && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-xs font-medium text-white">
                        <Sparkles className="w-3 h-3" />
                        Önerilen
                    </div>
                )}

                {/* Icon with glow */}
                <div className="relative mb-4">
                    <div className={`
                        inline-flex p-3 rounded-xl
                        bg-zinc-100
                        ${isFeatured ? 'bg-blue-50' : ''}
                        group-hover:bg-blue-50
                        transition-all duration-300
                    `}>
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Icon className={`
                            relative w-7 h-7 
                            ${isFeatured ? 'text-blue-500' : 'text-zinc-500'}
                            group-hover:text-blue-500 
                            transition-colors duration-300
                        `} strokeWidth={1.5} />
                    </div>
                </div>

                {/* Content */}
                <h3 className={`
                    text-xl font-bold text-zinc-900 mb-2 
                    group-hover:text-blue-600 transition-colors duration-300
                    ${isFeatured ? 'text-2xl' : ''}
                `}>
                    {service.title}
                </h3>

                <p className="text-zinc-500 mb-4 leading-relaxed">
                    {service.tagline}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-zinc-500">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                {/* Platforms (only for featured) */}
                {service.platforms && service.platforms.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {service.platforms.map((platform) => (
                            <span key={platform} className="px-2 py-1 text-xs bg-zinc-100 text-zinc-500 rounded-md">
                                {platform}
                            </span>
                        ))}
                    </div>
                )}

                {/* CTA Buttons */}
                <div className="relative z-20 flex items-center gap-3 pt-4 mt-auto">
                    <Link
                        href={`/hizmetler/${service.id}`}
                        className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium rounded-lg border border-zinc-300 text-zinc-600 bg-zinc-50 hover:bg-zinc-100 hover:text-zinc-900 hover:border-zinc-400 transition-all duration-200"
                    >
                        Detay
                    </Link>
                    <Link
                        href="/booking"
                        className={`inline-flex items-center justify-center h-9 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${isFeatured
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25'
                            : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm'
                            }`}
                    >
                        Teklif Al
                        <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

export function ServicesPageClient() {
    const [selectedGoal, setSelectedGoal] = useState<string | null>(null)

    const getHighlightedServices = () => {
        if (!selectedGoal) return []
        return goalMapping[selectedGoal] || []
    }

    const highlightedServices = getHighlightedServices()

    // Filtrele: hedef seçiliyse sadece eşleşenleri göster
    const filteredServices = selectedGoal
        ? services.filter(s => highlightedServices.includes(s.id))
        : services

    const showFeatured = !selectedGoal || highlightedServices.includes(featuredService.id)

    return (
        <div className="min-h-screen bg-white pt-32 pb-24">
            <div className="container px-4 mx-auto">
                {/* Mini Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12 space-y-6"
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-zinc-900 tracking-tighter">
                        Hizmetler
                    </h1>
                    <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
                        İhtiyacına göre 8 hizmetten doğru kombinasyonu önerelim.
                    </p>

                    {/* Proof Chips */}
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                        {proofChips.map((chip, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-2 px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-full text-sm text-zinc-500"
                            >
                                <chip.icon className="w-4 h-4 text-blue-400" />
                                {chip.text}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Goal Chips */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-16"
                >
                    <p className="text-center text-zinc-500 mb-4">Hedefin ne?</p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {goals.map((goal) => (
                            <button
                                key={goal.id}
                                onClick={() => setSelectedGoal(selectedGoal === goal.id ? null : goal.id)}
                                className={`
                                    flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium
                                    border transition-all duration-300
                                    ${selectedGoal === goal.id
                                        ? 'bg-blue-50 border-blue-400 text-blue-600'
                                        : 'bg-zinc-50 border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-900'
                                    }
                                `}
                            >
                                <goal.icon className="w-4 h-4" />
                                {goal.label}
                            </button>
                        ))}

                        {/* Tümünü Göster butonu - sadece hedef seçiliyken göster */}
                        {selectedGoal && (
                            <button
                                onClick={() => setSelectedGoal(null)}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-zinc-300 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-all duration-300"
                            >
                                Tümünü Göster
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
                >
                    {/* Featured Service - her zaman göster ama eşleşmiyorsa soluk */}
                    {showFeatured && (
                        <ServiceCard
                            service={featuredService}
                            isHighlighted={highlightedServices.includes(featuredService.id)}
                            isFaded={false}
                            isFeatured={true}
                        />
                    )}

                    {/* Other Services - sadece eşleşenleri göster */}
                    {filteredServices.map((service) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            isHighlighted={highlightedServices.includes(service.id)}
                            isFaded={false}
                        />
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-12 md:p-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
                        Projenizi Hayata Geçirelim
                    </h2>
                    <p className="text-lg text-zinc-500 max-w-xl mx-auto mb-8">
                        İhtiyaçlarınızı anlayalım ve size özel bir çözüm sunalım. Hemen bizimle iletişime geçin.
                    </p>
                    <Link
                        href="/booking"
                        className="inline-flex items-center justify-center h-14 px-10 text-lg bg-zinc-900 text-white hover:bg-zinc-800 rounded-full font-medium transition-colors"
                    >
                        Ücretsiz Danışmanlık Alın
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}
