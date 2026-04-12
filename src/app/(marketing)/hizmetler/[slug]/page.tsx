import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { generatePageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/seo'
import { getServiceDetailContent } from '@/lib/service-detail-content'
import { ServiceDetailPageClient } from '@/components/marketing/service-detail-page-client'
import { getServiceJsonLd, getFaqJsonLd, getBreadcrumbJsonLd } from '@/lib/json-ld'

interface PageProps {
    params: Promise<{ slug: string }>
}

// Service-specific keywords for SEO
const serviceKeywords: Record<string, string[]> = {
    'video-produksiyon': ['video prodüksiyon ankara', 'kurumsal video çekimi ankara', 'tanıtım filmi ankara', 'reklam filmi çekimi', 'emlak tanıtım videosu', 'konut projesi reklam filmi', 'sosyal medya video çekimi'],
    'sosyal-medya-yonetimi': ['sosyal medya yönetimi ankara', 'instagram yönetimi ankara', 'emlak sosyal medya yönetimi', 'gayrimenkul sosyal medya', 'inşaat sosyal medya', 'dijital pazarlama ankara', 'tiktok yönetimi ankara'],
    'marka-kimligi': ['marka kimliği ankara', 'logo tasarımı ankara', 'kurumsal kimlik ankara', 'grafik tasarım ankara', 'marka stratejisi ankara'],
    'web-tasarim': ['web tasarım ankara', 'web sitesi yapımı ankara', 'kurumsal web sitesi ankara', 'e-ticaret sitesi ankara', 'emlak web sitesi', 'inşaat firması web sitesi'],
    'fotograf-cekimi': ['fotoğraf çekimi ankara', 'emlak fotoğraf çekimi', 'ürün fotoğrafı ankara', 'mekan fotoğraf çekimi', 'kurumsal fotoğraf ankara', 'gayrimenkul fotoğraf çekimi'],
    'reklam-kampanyasi': ['reklam kampanyası ankara', 'google ads ankara', 'dijital reklam ankara', 'facebook reklam yönetimi', 'instagram reklam yönetimi', 'performans pazarlama ankara'],
    'icerik-uretimi': ['içerik üretimi ankara', 'sosyal medya içerik üretimi', 'blog yazarlığı', 'copywriting ankara', 'marka içerik stratejisi'],
    'etkinlik-yonetimi': ['etkinlik yönetimi ankara', 'kurumsal etkinlik ankara', 'lansman organizasyonu', 'açılış organizasyonu', 'etkinlik video çekimi'],
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

    const keywords = serviceKeywords[content.slug] || []

    return generatePageMetadata({
        title: `${content.title} Ankara | New Social Agency`,
        description: `${content.heroPromise} Ankara'nın lider dijital ajansı New Social Agency ile ${content.title.toLowerCase()} hizmetinden yararlanın.`,
        path: `/hizmetler/${content.slug}`,
        keywords,
    })
}

export default async function ServiceDetailPage({ params }: PageProps) {
    const resolvedParams = await params
    const content = getServiceDetailContent(resolvedParams.slug)

    if (!content) {
        notFound()
    }

    const serviceJsonLd = getServiceJsonLd({
        name: `${content.title} Ankara`,
        description: content.heroPromise,
        url: `${siteConfig.url}/hizmetler/${content.slug}`,
    })

    const faqJsonLd = content.faqs.length > 0
        ? getFaqJsonLd(content.faqs)
        : null

    const breadcrumbJsonLd = getBreadcrumbJsonLd([
        { name: 'Anasayfa', url: siteConfig.url },
        { name: 'Hizmetler', url: `${siteConfig.url}/hizmetler` },
        { name: content.title, url: `${siteConfig.url}/hizmetler/${content.slug}` },
    ])

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
            />
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            )}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <ServiceDetailPageClient content={content} />
        </>
    )
}
