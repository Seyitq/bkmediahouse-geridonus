import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
    title: 'Randevu Al | Konya Dijital Ajans - BK Media House',
    description: 'BK Media House Konya\'dan online randevu alın. Sosyal medya yönetimi, video prodüksiyon, web tasarım, marka kimliği projeleri için ücretsiz danışmanlık görüşmesi planlayın.',
    path: '/booking',
    keywords: [
        'dijital ajans randevu konya', 'sosyal medya danışmanlığı konya', 'ücretsiz dijital danışmanlık',
        'reklam ajansı görüşme konya', 'web tasarım danışmanlık konya',
    ],
})

export default function BookingLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
