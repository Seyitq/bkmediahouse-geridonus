import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { generatePageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/seo'
import { getServiceDetailContent, ServiceDetailContent } from '@/lib/service-detail-content'
import { ServiceDetailPageClient } from '@/components/marketing/service-detail-page-client'
import { getServiceJsonLd, getFaqJsonLd, getBreadcrumbJsonLd } from '@/lib/json-ld'
import { getServiceBySlug } from '@/actions/services'

// Force dynamic rendering to allow DB fallback
export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{ slug: string }>
}

// Service-specific keywords for SEO
const serviceKeywords: Record<string, string[]> = {
    'video-produksiyon': ['video prodüksiyon konya', 'kurumsal video çekimi konya', 'tanıtım filmi konya', 'reklam filmi çekimi', 'emlak tanıtım videosu', 'konut projesi reklam filmi', 'sosyal medya video çekimi'],
    'sosyal-medya-yonetimi': ['sosyal medya yönetimi konya', 'instagram yönetimi konya', 'emlak sosyal medya yönetimi', 'gayrimenkul sosyal medya', 'inşaat sosyal medya', 'dijital pazarlama konya', 'tiktok yönetimi konya'],
    'marka-kimligi': ['marka kimliği konya', 'logo tasarımı konya', 'kurumsal kimlik konya', 'grafik tasarım konya', 'marka stratejisi konya'],
    'web-tasarim': ['web tasarım konya', 'web sitesi yapımı konya', 'kurumsal web sitesi konya', 'e-ticaret sitesi konya', 'emlak web sitesi', 'inşaat firması web sitesi'],
    'fotograf-cekimi': ['fotoğraf çekimi konya', 'emlak fotoğraf çekimi', 'ürün fotoğrafı konya', 'mekan fotoğraf çekimi', 'kurumsal fotoğraf konya', 'gayrimenkul fotoğraf çekimi'],
    'reklam-kampanyasi': ['reklam kampanyası konya', 'google ads konya', 'dijital reklam konya', 'facebook reklam yönetimi', 'instagram reklam yönetimi', 'performans pazarlama konya'],
    'icerik-uretimi': ['içerik üretimi konya', 'sosyal medya içerik üretimi', 'blog yazarlığı', 'copywriting konya', 'marka içerik stratejisi'],
    'etkinlik-yonetimi': ['etkinlik yönetimi konya', 'kurumsal etkinlik konya', 'lansman organizasyonu', 'açılış organizasyonu', 'etkinlik video çekimi'],
}

// Build service detail content from DB service as fallback
function buildContentFromDbService(dbService: { name: string; slug: string; description: string; longDescription?: string | null; features?: string | null }): ServiceDetailContent {
    const features = dbService.features ? dbService.features.split(',').map(f => f.trim()).filter(Boolean) : []
    return {
        slug: dbService.slug,
        title: dbService.name,
        heroPromise: dbService.description,
        heroImage: '',
        proofChips: ['24 saat içinde dönüş', 'Net kapsam + teklif', 'Ölçülebilir sonuç'],
        deliverables: features.length > 0 ? features : ['Profesyonel hizmet', 'Zamanında teslimat', 'Detaylı raporlama'],
        timeline: 'Projeye göre değişir',
        processSteps: ['Keşif & Analiz', 'Strateji & Planlama', 'Uygulama & Teslimat'],
        outcomes: features.length > 0 ? features : ['Profesyonel sonuçlar', 'Ölçülebilir başarı'],
        packages: [],
        process: [
            { title: 'Keşif', description: 'İhtiyaçlarınızı analiz ediyoruz.', youDo: 'Brifing paylaşırsınız', weDo: 'Analiz & araştırma yaparız' },
            { title: 'Planlama', description: 'Strateji belirliyoruz.', youDo: 'Geri bildirim verirsiniz', weDo: 'Plan & takvim oluştururuz' },
            { title: 'Uygulama', description: 'Projeyi hayata geçiriyoruz.', youDo: 'Onay verirsiniz', weDo: 'Üretim & teslimat yaparız' },
        ],
        caseStudies: [],
        faqs: [],
    }
}

async function getContent(slug: string): Promise<ServiceDetailContent | null> {
    // First try hardcoded detailed content
    const hardcoded = getServiceDetailContent(slug)
    if (hardcoded) return hardcoded

    // Fallback to database service
    const result = await getServiceBySlug(slug)
    if (result.success && result.data) {
        return buildContentFromDbService(result.data)
    }

    return null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params
    const content = await getContent(resolvedParams.slug)

    if (!content) {
        return generatePageMetadata({
            title: 'Hizmet Bulunamadı',
            description: 'Aradığınız hizmet bulunamadı.',
            path: '/hizmetler',
        })
    }

    const keywords = serviceKeywords[content.slug] || []

    return generatePageMetadata({
        title: `${content.title} Konya | BK Media House`,
        description: `${content.heroPromise} Konya Selçuklu merkezli BK Media House ile ${content.title.toLowerCase()} hizmetinden yararlanın.`,
        path: `/hizmetler/${content.slug}`,
        keywords,
    })
}

export default async function ServiceDetailPage({ params }: PageProps) {
    const resolvedParams = await params
    const content = await getContent(resolvedParams.slug)

    if (!content) {
        notFound()
    }

    const serviceJsonLd = getServiceJsonLd({
        name: `${content.title} Konya`,
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
