import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Video, Share2, Fingerprint, Monitor, Camera, Megaphone, PenTool, Calendar, Check } from 'lucide-react'
import { generatePageMetadata } from '@/lib/seo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SERVICES, SERVICE_LABELS } from '@/lib/validations/inquiry'

export const metadata: Metadata = generatePageMetadata({
    title: 'Hizmetlerimiz',
    description: 'Video prodüksiyon, sosyal medya yönetimi, marka kimliği, web tasarım ve daha fazlası. Dijital dünyada markanızı öne taşıyacak kapsamlı çözümler.',
    path: '/hizmetler',
})

const serviceDetails: Record<string, { icon: any; description: string; features: string[] }> = {
    'video-produksiyon': {
        icon: Video,
        description: 'Markanızın hikayesini güçlü görseller ve profesyonel prodüksiyon ile anlatıyoruz.',
        features: ['Reklam Filmleri', 'Kurumsal Tanıtım', 'Sosyal Medya İçerikleri', 'Drone Çekimleri'],
    },
    'sosyal-medya-yonetimi': {
        icon: Share2,
        description: 'Sosyal medya varlığınızı stratejik içerik ve topluluk yönetimi ile güçlendiriyoruz.',
        features: ['İçerik Stratejisi', 'Paylaşım Planlaması', 'Topluluk Yönetimi', 'Performans Analizi'],
    },
    'marka-kimligi': {
        icon: Fingerprint,
        description: 'Markanızın özünü yansıtan, akılda kalıcı ve tutarlı bir kimlik oluşturuyoruz.',
        features: ['Logo Tasarımı', 'Renk Paleti', 'Tipografi', 'Marka Rehberi'],
    },
    'web-tasarim': {
        icon: Monitor,
        description: 'Kullanıcı deneyimini ön planda tutan, modern ve performanslı web siteleri tasarlıyoruz.',
        features: ['UI/UX Tasarım', 'Responsive Geliştirme', 'SEO Optimizasyonu', 'E-Ticaret Çözümleri'],
    },
    'fotograf-cekimi': {
        icon: Camera,
        description: 'Ürünlerinizi ve markanızı en iyi şekilde yansıtan profesyonel fotoğraflar çekiyoruz.',
        features: ['Ürün Fotoğrafçılığı', 'Kurumsal Çekimler', 'Etkinlik Fotoğrafları', 'Stüdyo Çekimleri'],
    },
    'reklam-kampanyasi': {
        icon: Megaphone,
        description: 'Hedef kitlenize ulaşan, dönüşüm odaklı dijital reklam kampanyaları yönetiyoruz.',
        features: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'Retargeting'],
    },
    'icerik-uretimi': {
        icon: PenTool,
        description: 'Markanızın sesini yansıtan, ilgi çekici ve değerli içerikler üretiyoruz.',
        features: ['Blog Yazıları', 'Copywriting', 'SEO İçerikleri', 'E-posta Pazarlama'],
    },
    'etkinlik-yonetimi': {
        icon: Calendar,
        description: 'Markanızı öne çıkaran, unutulmaz etkinlikler planlıyor ve yönetiyoruz.',
        features: ['Lansman Etkinlikleri', 'Kurumsal Toplantılar', 'Fuar Organizasyonu', 'Dijital Etkinlikler'],
    },
}

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-black pt-32 pb-24">
            <div className="container px-4 mx-auto">
                {/* Header */}
                <div className="text-center mb-20 space-y-6">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter">
                        Hizmetlerimiz
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Dijital dünyada markanızı bir adım öne taşıyacak kapsamlı çözümler sunuyoruz.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {SERVICES.map((serviceKey) => {
                        const service = serviceDetails[serviceKey]
                        const Icon = service.icon

                        return (
                            <Link key={serviceKey} href={`/hizmetler/${serviceKey}`}>
                                <Card className="h-full bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all duration-300 group hover:bg-zinc-900 hover:border-white/20 cursor-pointer">
                                    <CardHeader>
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-xl bg-zinc-800 text-zinc-400 group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-colors">
                                                <Icon size={28} strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                                                    {SERVICE_LABELS[serviceKey]}
                                                    <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                                </CardTitle>
                                                <CardDescription className="text-zinc-500 mt-2">
                                                    {service.description}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            {service.features.map((feature) => (
                                                <li key={feature} className="flex items-center text-zinc-400">
                                                    <Check className="h-4 w-4 mr-3 text-green-500" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                    })}
                </div>

                {/* CTA Section */}
                <div className="text-center bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-2xl p-12 md:p-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Projenizi Hayata Geçirelim
                    </h2>
                    <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-8">
                        İhtiyaçlarınızı anlayalım ve size özel bir çözüm sunalım. Hemen bizimle iletişime geçin.
                    </p>
                    <Link href="/booking">
                        <Button size="lg" className="h-14 px-10 text-lg bg-white text-black hover:bg-zinc-200 rounded-full">
                            Ücretsiz Danışmanlık Alın
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
