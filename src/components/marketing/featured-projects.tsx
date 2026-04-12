import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { db } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

async function getFeaturedProjects() {
    return await db.project.findMany({
        where: { featured: true },
        orderBy: { createdAt: 'desc' },
        take: 3,
        select: {
            id: true,
            title: true,
            slug: true,
            coverImage: true,
            servicesProvided: true,
            clientName: true,
        }
    })
}

export async function FeaturedProjects() {
    const projects = await getFeaturedProjects()

    if (projects.length === 0) return null

    return (
        <section className="py-24 bg-white">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tighter">
                            Seçilmiş <span className="text-zinc-400">Çalışmalar</span>
                        </h2>
                        <p className="text-zinc-500 max-w-xl text-lg">
                            Markaları dönüştüren ve kalıcı etki bırakan projelerimizden bazıları.
                        </p>
                    </div>
                    <Link href="/calismalar">
                        <Button variant="outline" className="border-zinc-300 text-zinc-700 hover:bg-zinc-100 group">
                            Tüm Çalışmalar
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <Link key={project.id} href={`/calismalar/${project.slug}`} className="group block">
                            <Card className="bg-white border-zinc-200 overflow-hidden transition-all duration-300 hover:border-zinc-300 hover:shadow-lg">
                                <div className="aspect-video relative overflow-hidden bg-zinc-100">
                                    {project.coverImage ? (
                                        <Image
                                            src={project.coverImage}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-zinc-400">
                                            Görsel Yok
                                        </div>
                                    )}
                                </div>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-medium text-blue-600">
                                            {project.clientName}
                                        </span>
                                        <ArrowRight className="h-5 w-5 text-zinc-900 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                                    </div>
                                    <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {project.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {/* Only show first 2 services to keep card clean */}
                                        {JSON.parse(project.servicesProvided as unknown as string || '[]').slice(0, 2).map((service: string) => (
                                            <span key={service} className="text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded">
                                                {service.replace('-', ' ')}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
