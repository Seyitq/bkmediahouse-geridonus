import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { ServicesPageClient } from '@/components/marketing/services-page-client'

export const metadata: Metadata = generatePageMetadata({
    title: 'Dijital Ajans Hizmetleri Ankara | Sosyal Medya, Video, Web Tasarım, Reklam',
    description: 'New Social Agency Ankara hizmetleri: Emlak sosyal medya yönetimi, kurumsal video prodüksiyon, drone çekimi, web tasarım, marka kimliği, reklam kampanyası, fotoğraf çekimi, etkinlik yönetimi. Gayrimenkul ve kurumsal firmalar için dijital çözümler.',
    path: '/hizmetler',
    keywords: [
        'dijital ajans hizmetleri ankara', 'sosyal medya yönetimi ankara', 'video prodüksiyon ankara',
        'web tasarım ankara', 'drone çekimi ankara', 'marka kimliği ankara',
        'reklam kampanyası ankara', 'fotoğraf çekimi ankara', 'etkinlik yönetimi ankara',
        'emlak sosyal medya', 'gayrimenkul dijital pazarlama', 'en iyi dijital ajans ankara',
    ],
})

export default function ServicesPage() {
    return <ServicesPageClient />
}
