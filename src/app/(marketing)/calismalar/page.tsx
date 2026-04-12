import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { db } from '@/lib/db'
import { generatePageMetadata } from '@/lib/seo'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SERVICE_LABELS } from '@/lib/validations/inquiry'

// Force dynamic rendering to prevent build-time database calls
export const dynamic = 'force-dynamic'

export const metadata: Metadata = generatePageMetadata({
    title: 'Çalışmalarımız | Ankara Dijital Ajans Portföy & Referanslar',
    description: 'New Social Agency Ankara portföyü. Emlak, gayrimenkul, inşaat ve kurumsal firmalar için gerçekleştirdiğimiz sosyal medya, video prodüksiyon, web tasarım ve marka kimliği çalışmaları.',
    path: '/calismalar',
    keywords: [
        'dijital ajans portföy ankara', 'ankara reklam ajansı çalışmaları', 'sosyal medya çalışmaları',
        'video prodüksiyon portföy', 'web tasarım portföy ankara', 'emlak sosyal medya örnekleri',
    ],
})

async function getProjects() {
    try {
        return await db.project.findMany({
            where: { publishedAt: { not: null } },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                title: true,
                slug: true,
                coverImage: true,
                servicesProvided: true,
                clientName: true,
                description: true,
            }
        })
    } catch (error) {
        console.error('[PortfolioPage] Veritabanı sorgusu başarısız:', error)
        return []
    }
}

export default async function PortfolioPage() {
    const projects = await getProjects()

    return (
        <div className="min-h-screen bg-white pt-32 pb-24">
            <div className="container px-4 mx-auto">
                {/* Header */}
                <div className="text-center mb-16 space-y-6">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-zinc-900 tracking-tighter">
                        Çalışmalarımız
                    </h1>
                    <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
                        Markalar için yarattığımız dijital deneyimler ve başarı hikayeleri.
                    </p>
                </div>

                {/* Projects Grid */}
                {projects.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-zinc-500 text-lg">Henüz yayınlanmış proje bulunmuyor.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.map((project, index) => {
                            const services = JSON.parse(project.servicesProvided as unknown as string || '[]') as string[]
                            return (
                                <Link
                                    key={project.id}
                                    href={`/calismalar/${project.slug}`}
                                    className="group block"
                                >
                                    <Card className={`bg-white border-zinc-200 overflow-hidden transition-all duration-500 hover:border-zinc-300 hover:shadow-lg ${index === 0 ? 'md:col-span-2' : ''}`}>
                                        <div className={`relative overflow-hidden bg-zinc-100 ${index === 0 ? 'aspect-[16/9]' : 'aspect-video'}`}>
                                            {project.coverImage ? (
                                                <Image
                                                    src={project.coverImage}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                    unoptimized
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-zinc-400 text-lg">
                                                    Görsel Yok
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                            {/* Overlay Content */}
                                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="text-sm font-medium text-blue-400">
                                                        {project.clientName}
                                                    </span>
                                                    <ArrowRight className="h-4 w-4 text-white opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                                                </div>
                                                <h2 className={`font-bold text-white mb-3 group-hover:text-blue-400 transition-colors ${index === 0 ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                                                    {project.title}
                                                </h2>
                                                <p className="text-zinc-300 line-clamp-2 mb-4 max-w-2xl">
                                                    {project.description}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {services.slice(0, 3).map((service) => (
                                                        <Badge
                                                            key={service}
                                                            variant="outline"
                                                            className="text-xs text-white border-white/30 bg-white/10 backdrop-blur-sm"
                                                        >
                                                            {SERVICE_LABELS[service as keyof typeof SERVICE_LABELS] || service}
                                                        </Badge>
                                                    ))}
                                                    {services.length > 3 && (
                                                        <Badge variant="outline" className="text-xs text-white/60 border-white/20">
                                                            +{services.length - 3}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
