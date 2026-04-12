import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
    title: 'İletişim | Ankara Dijital Ajans - New Social Agency',
    description: 'New Social Agency Ankara ile iletişime geçin. Emlak sosyal medya yönetimi, video prodüksiyon, web tasarım, reklam kampanyası ve tüm dijital hizmetler için ücretsiz teklif alın. Ankara merkezli dijital ajans.',
    path: '/iletisim',
    keywords: [
        'dijital ajans iletişim ankara', 'reklam ajansı ankara iletişim', 'sosyal medya ajansı ankara',
        'ankara dijital ajans teklif', 'web tasarım teklif ankara', 'video prodüksiyon teklif ankara',
    ],
})

export default function IletisimLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
