import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { generatePageMetadata } from '@/lib/seo'
import { getServiceDetailContent } from '@/lib/service-detail-content'
import { ServiceDetailPageClient } from '@/components/marketing/service-detail-page-client'

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params
    const content = getServiceDetailContent(resolvedParams.slug)

    if (!content) {
        return generatePageMetadata({
            title: 'Hizmet Bulunamadı',
            description: 'Aradığınız hizmet bulunamadı.',
            path: '/hizmetler',
        })
    }

    return generatePageMetadata({
        title: `${content.title} | BK Media House`,
        description: content.heroPromise,
        path: `/hizmetler/${content.slug}`,
    })
}

export default async function ServiceDetailPage({ params }: PageProps) {
    const resolvedParams = await params
    const content = getServiceDetailContent(resolvedParams.slug)

    if (!content) {
        notFound()
    }

    return <ServiceDetailPageClient content={content} />
}
