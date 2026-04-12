import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
    title: 'Randevu Al | Ankara Dijital Ajans - New Social Agency',
    description: 'New Social Agency Ankara\'dan online randevu alın. Sosyal medya yönetimi, video prodüksiyon, web tasarım, marka kimliği projeleri için ücretsiz danışmanlık görüşmesi planlayın.',
    path: '/booking',
    keywords: [
        'dijital ajans randevu ankara', 'sosyal medya danışmanlığı ankara', 'ücretsiz dijital danışmanlık',
        'reklam ajansı görüşme ankara', 'web tasarım danışmanlık ankara',
    ],
})

export default function BookingLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
