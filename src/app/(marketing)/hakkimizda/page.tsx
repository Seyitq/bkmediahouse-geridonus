import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { AboutPageClient } from '@/components/marketing/about-page-client'

export const metadata: Metadata = generatePageMetadata({
    title: 'Hakkımızda | BK Media House Konya',
    description: 'BK Media House, Konya merkezli dijital ajans olarak markaların dijital dünyada güçlü bir şekilde var olmasını sağlıyoruz. Video prodüksiyon, sosyal medya yönetimi, web tasarım ve marka kimliği hizmetleri sunuyoruz.',
    path: '/hakkimizda',
    keywords: [
        'bk media house', 'konya dijital ajans', 'hakkımızda',
        'dijital ajans ekibi', 'konya reklam ajansı', 'medya ajansı konya',
    ],
})

export default function AboutPage() {
    return <AboutPageClient />
}
