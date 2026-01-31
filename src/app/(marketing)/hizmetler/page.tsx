import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { ServicesPageClient } from '@/components/marketing/services-page-client'

export const metadata: Metadata = generatePageMetadata({
    title: 'Hizmetlerimiz | Video Prodüksiyon, Web Tasarım, Reklam Kampanyası',
    description: 'Reklam kampanyası, video prodüksiyon, web tasarım, sosyal medya yönetimi, marka kimliği ve daha fazlası. Konya merkezli dijital ajans BK Media House ile markanızı büyütün.',
    path: '/hizmetler',
})

export default function ServicesPage() {
    return <ServicesPageClient />
}
