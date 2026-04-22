import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { ServicesPageClient } from '@/components/marketing/services-page-client'

export const metadata: Metadata = generatePageMetadata({
    title: 'Dijital Ajans Hizmetleri Konya | Sosyal Medya, Video, Web Tasarım, Reklam',
    description: 'BK Media House Konya hizmetleri: Emlak sosyal medya yönetimi, kurumsal video prodüksiyon, drone çekimi, web tasarım, marka kimliği, reklam kampanyası, fotoğraf çekimi, etkinlik yönetimi. Gayrimenkul ve kurumsal firmalar için dijital çözümler.',
    path: '/hizmetler',
    keywords: [
        'dijital ajans hizmetleri konya', 'sosyal medya yönetimi konya', 'video prodüksiyon konya',
        'web tasarım konya', 'drone çekimi konya', 'marka kimliği konya',
        'reklam kampanyası konya', 'fotoğraf çekimi konya', 'etkinlik yönetimi konya',
        'emlak sosyal medya', 'gayrimenkul dijital pazarlama', 'en iyi dijital ajans konya',
    ],
})

export default function ServicesPage() {
    return <ServicesPageClient />
}
