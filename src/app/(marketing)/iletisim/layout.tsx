import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
    title: 'İletişim | Konya Dijital Ajans - BK Media House',
    description: 'BK Media House Konya ile iletişime geçin. Emlak sosyal medya yönetimi, video prodüksiyon, web tasarım, reklam kampanyası ve tüm dijital hizmetler için ücretsiz teklif alın. Konya merkezli dijital ajans.',
    path: '/iletisim',
    keywords: [
        'dijital ajans iletişim konya', 'reklam ajansı konya iletişim', 'sosyal medya ajansı konya',
        'konya dijital ajans teklif', 'web tasarım teklif konya', 'video prodüksiyon teklif konya',
    ],
})

export default function IletisimLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
