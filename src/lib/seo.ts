import { Metadata } from 'next'

// Base metadata for the site
export const siteConfig = {
    name: 'BK Media House',
    description: 'Markanızın dijital dünyadaki potansiyelini modern tasarım ve stratejik içerik ile açığa çıkarıyoruz.',
    url: 'https://bkmediahouse.com.tr',
    ogImage: '/og-image.jpg',
    locale: 'tr_TR',
    keywords: [
        // Genel ajans
        'dijital ajans',
        'dijital ajans konya',
        'reklam ajansı',
        'reklam ajansı konya',
        'medya ajansı konya',
        'kreatif ajans konya',

        // Video prodüksiyon
        'video prodüksiyon',
        'video prodüksiyon konya',
        'kurumsal video',
        'kurumsal video çekimi konya',
        'tanıtım filmi',
        'tanıtım filmi konya',
        'reklam filmi',
        'reklam filmi çekimi',

        // Drone
        'drone çekimi',
        'drone çekimi konya',
        'havadan çekim',
        'havadan çekim konya',
        'drone video',

        // Fotoğraf
        'fotoğraf çekimi',
        'fotoğraf çekimi konya',
        'ürün fotoğrafı',
        'ürün fotoğrafı konya',
        'kurumsal fotoğraf çekimi',
        'profesyonel fotoğraf',

        // Web & Site tasarım
        'web tasarım',
        'web tasarım konya',
        'site tasarımı',
        'site tasarımı konya',
        'web sitesi yapımı',
        'web sitesi yapımı konya',
        'kurumsal web sitesi',
        'e-ticaret sitesi konya',

        // Logo & Marka
        'logo tasarımı',
        'logo tasarımı konya',
        'marka kimliği',
        'marka kimliği tasarımı',
        'kurumsal kimlik',
        'kurumsal kimlik konya',
        'grafik tasarım',
        'grafik tasarım konya',

        // Sosyal medya
        'sosyal medya yönetimi',
        'sosyal medya yönetimi konya',
        'instagram yönetimi',
        'sosyal medya danışmanlığı',
        'içerik üretimi',

        // Diğer hizmetler
        'katalog tasarımı',
        'broşür tasarımı',
        'afiş tasarımı',
        'packaging tasarım',
        'ambalaj tasarımı',
        'sunum tasarımı',

        // Lokasyon
        'konya',
        'konya dijital hizmetler',
    ],
}

export const baseMetadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: 'BK Media House' }],
    creator: 'BK Media House',
    openGraph: {
        type: 'website',
        locale: siteConfig.locale,
        url: siteConfig.url,
        siteName: siteConfig.name,
        title: siteConfig.name,
        description: siteConfig.description,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.name,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'U-b8-M-PPMJvYGIPD9AGEM8EW7iSolK2Nv4Co_gwyT4',
    },
}

// Helper to generate page metadata
export function generatePageMetadata({
    title,
    description,
    path = '',
    image,
}: {
    title: string
    description: string
    path?: string
    image?: string
}): Metadata {
    const url = `${siteConfig.url}${path}`
    const ogImage = image || siteConfig.ogImage

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            images: [{ url: ogImage, width: 1200, height: 630 }],
        },
        twitter: {
            title,
            description,
            images: [ogImage],
        },
        alternates: {
            canonical: url,
        },
    }
}
