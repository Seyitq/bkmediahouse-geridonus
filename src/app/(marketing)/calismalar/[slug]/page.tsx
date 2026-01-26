import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { db } from '@/lib/db'
import { siteConfig, generatePageMetadata } from '@/lib/seo'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { SERVICE_LABELS } from '@/lib/validations/inquiry'

// Force dynamic rendering to prevent build-time database calls
export const dynamic = 'force-dynamic'

async function getProject(slug: string) {
    return await db.project.findUnique({
        where: { slug },
    })
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const project = await getProject(slug)

    if (!project) {
        return { title: 'Proje Bulunamadı' }
    }

    return generatePageMetadata({
        title: `${project.title} | ${project.clientName}`,
        description: project.description.slice(0, 160),
        path: `/calismalar/${slug}`,
        image: project.coverImage || undefined,
    })
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = await getProject(slug)

    if (!project) {
        notFound()
    }

    const services = JSON.parse(project.servicesProvided as unknown as string || '[]') as string[]
    const images = JSON.parse(project.images as unknown as string || '[]') as string[]
    const stats = project.stats ? JSON.parse(project.stats as unknown as string) : null

    return (
        <article className="min-h-screen bg-black pt-24 pb-24">
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
                {project.coverImage ? (
                    <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                        <span className="text-zinc-700 text-2xl">Görsel Yok</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                    <div className="container mx-auto">
                        <Link href="/calismalar" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors mb-6">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Tüm Çalışmalar
                        </Link>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {services.map((service) => (
                                <Badge
                                    key={service}
                                    variant="outline"
                                    className="text-sm text-white border-white/20 bg-white/10 backdrop-blur-sm"
                                >
                                    {SERVICE_LABELS[service as keyof typeof SERVICE_LABELS] || service}
                                </Badge>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter mb-4">
                            {project.title}
                        </h1>
                        <p className="text-xl text-blue-400 font-medium">
                            {project.clientName}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-3 gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Description */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6">Proje Hakkında</h2>
                            <p className="text-lg text-zinc-400 leading-relaxed">
                                {project.description}
                            </p>
                        </section>

                        {/* Challenge */}
                        {project.challenge && (
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-6">Zorluk</h2>
                                <p className="text-lg text-zinc-400 leading-relaxed">
                                    {project.challenge}
                                </p>
                            </section>
                        )}

                        {/* Solution */}
                        {project.solution && (
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-6">Çözüm</h2>
                                <p className="text-lg text-zinc-400 leading-relaxed">
                                    {project.solution}
                                </p>
                            </section>
                        )}

                        {/* Result */}
                        {project.result && (
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-6">Sonuç</h2>
                                <p className="text-lg text-zinc-400 leading-relaxed">
                                    {project.result}
                                </p>
                            </section>
                        )}

                        {/* Gallery */}
                        {images.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-6">Galeri</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {images.map((image, index) => (
                                        <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-zinc-900">
                                            <Image
                                                src={image}
                                                alt={`${project.title} - Görsel ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Stats */}
                        {stats && Object.keys(stats).length > 0 && (
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-white mb-6">Sonuçlar</h3>
                                <div className="space-y-4">
                                    {Object.entries(stats).map(([key, value]) => (
                                        <div key={key}>
                                            <div className="text-3xl font-bold text-white">{String(value)}</div>
                                            <div className="text-sm text-zinc-500">{key}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Services */}
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-6">Sunulan Hizmetler</h3>
                            <div className="flex flex-wrap gap-2">
                                {services.map((service) => (
                                    <Badge
                                        key={service}
                                        className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                                    >
                                        {SERVICE_LABELS[service as keyof typeof SERVICE_LABELS] || service}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-3">Benzer Bir Proje mi?</h3>
                            <p className="text-zinc-400 mb-6">
                                Markanız için de böyle bir proje oluşturmak ister misiniz?
                            </p>
                            <Link href="/booking">
                                <Button className="w-full bg-white text-black hover:bg-zinc-200">
                                    Hemen İletişime Geçin
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Separator className="bg-zinc-900" />

            {/* Back to Portfolio */}
            <div className="container mx-auto px-4 py-16 text-center">
                <Link href="/calismalar">
                    <Button variant="outline" size="lg" className="border-zinc-800 text-white hover:bg-zinc-900">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Tüm Çalışmalara Dön
                    </Button>
                </Link>
            </div>
        </article>
    )
}
