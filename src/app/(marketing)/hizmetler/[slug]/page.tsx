import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { db } from '@/lib/db'
import { generatePageMetadata } from '@/lib/seo'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import * as Icons from 'lucide-react'
import { ServiceDetailView } from '@/components/marketing/service-detail-view'
import { getServiceContent } from '@/lib/service-content'

// Force dynamic rendering to prevent build-time database calls
export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{ slug: string }>
}

async function getService(slug: string) {
    return await db.service.findUnique({
        where: { slug },
    })
}

async function getOtherServices(currentSlug: string) {
    return await db.service.findMany({
        where: {
            isActive: true,
            slug: { not: currentSlug }
        },
        orderBy: { order: 'asc' },
        take: 4,
    })
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params
    const service = await getService(resolvedParams.slug)

    if (!service) {
        return generatePageMetadata({
            title: 'Hizmet Bulunamadı',
            description: 'Aradığınız hizmet bulunamadı.',
            path: '/hizmetler',
        })
    }

    return generatePageMetadata({
        title: `${service.name} | BK Media House`,
        description: service.description,
        path: `/hizmetler/${service.slug}`,
    })
}

// Dynamic icon component
function DynamicIcon({ name, className }: { name: string; className?: string }) {
    const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name]
    if (!IconComponent) return <Icons.Layers className={className} />
    return <IconComponent className={className} />
}

export default async function ServiceDetailPage({ params }: PageProps) {
    const resolvedParams = await params
    const service = await getService(resolvedParams.slug)

    if (!service) {
        notFound()
    }

    // Get hardcoded content for this service
    const content = getServiceContent(service.slug)

    if (!content) {
        // If no custom content exists for this service, show 404
        notFound()
    }

    const otherServices = await getOtherServices(service.slug)
    const features = service.features ? service.features.split(',').map(f => f.trim()).filter(Boolean) : []

    return (
        <div className="min-h-screen bg-zinc-950">
            {/* Hero Section with 3D Viewer */}
            <ServiceDetailView service={service} content={content} />
        </div>
    )
}

