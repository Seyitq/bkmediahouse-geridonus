import { Metadata } from 'next'

// Base metadata for the site
export const siteConfig = {
    name: 'New Social Agency | Ankara Dijital Ajans',
    shortName: 'New Social Agency',
    description: 'Ankara\'nın lider dijital ajansı. Emlak sosyal medya yönetimi, kurumsal video prodüksiyon, drone çekimi, web tasarım, marka kimliği ve reklam kampanyası hizmetleri. Gayrimenkul, inşaat ve kurumsal firmalar için etkili dijital çözümler.',
    url: 'https://newsocialankara.com',
    ogImage: '/og-image.jpg',
    locale: 'tr_TR',
    phone: '+905309303276',
    email: 'info@newsocialankara.com',
    address: {
        city: 'Ankara',
        country: 'TR',
        region: 'İç Anadolu',
    },
    keywords: [
        // Ana anahtar kelimeler
        'dijital ajans ankara',
        'ankara dijital ajans',
        'reklam ajansı ankara',
        'sosyal medya ajansı ankara',
        'medya ajansı ankara',
        'kreatif ajans ankara',
        'ankara reklam ajansı',

        // Emlak & gayrimenkul sosyal medya
        'emlak sosyal medya yönetimi',
        'emlak sosyal medya ankara',
        'gayrimenkul sosyal medya yönetimi',
        'gayrimenkul dijital pazarlama',
        'emlak reklam ajansı',
        'emlak dijital pazarlama ankara',
        'inşaat firması sosyal medya',
        'inşaat sosyal medya yönetimi',
        'müteahhit sosyal medya',
        'konut projesi tanıtımı',
        'emlak video çekimi',
        'gayrimenkul drone çekimi',
        'emlak fotoğraf çekimi',
        'konut projesi reklam filmi',

        // Video prodüksiyon
        'video prodüksiyon ankara',
        'kurumsal video çekimi ankara',
        'tanıtım filmi ankara',
        'reklam filmi çekimi ankara',
        'sosyal medya video çekimi',
        'ürün tanıtım videosu',
        'firma tanıtım filmi ankara',

        // Drone
        'drone çekimi ankara',
        'havadan çekim ankara',
        'drone video ankara',
        'havadan fotoğraf çekimi ankara',
        'inşaat drone çekimi',
        'şantiye drone çekimi',

        // Fotoğraf
        'fotoğraf çekimi ankara',
        'ürün fotoğrafı ankara',
        'kurumsal fotoğraf çekimi ankara',
        'profesyonel fotoğraf ankara',
        'mekan fotoğraf çekimi',
        'iç mekan fotoğraf çekimi',

        // Web tasarım
        'web tasarım ankara',
        'web sitesi yapımı ankara',
        'kurumsal web sitesi ankara',
        'e-ticaret sitesi ankara',
        'landing page tasarımı',
        'emlak web sitesi',
        'inşaat firması web sitesi',

        // Logo & marka
        'logo tasarımı ankara',
        'marka kimliği ankara',
        'kurumsal kimlik ankara',
        'grafik tasarım ankara',
        'marka stratejisi',

        // Sosyal medya yönetimi
        'sosyal medya yönetimi ankara',
        'instagram yönetimi ankara',
        'sosyal medya danışmanlığı ankara',
        'içerik üretimi ankara',
        'sosyal medya içerik üretimi',
        'dijital pazarlama ankara',
        'google ads ankara',
        'meta reklam yönetimi',
        'tiktok yönetimi ankara',

        // Reklam kampanyası
        'reklam kampanyası ankara',
        'dijital reklam ankara',
        'performans pazarlama ankara',
        'google ads yönetimi',
        'facebook reklam yönetimi',
        'instagram reklam yönetimi',

        // Etkinlik
        'etkinlik yönetimi ankara',
        'kurumsal etkinlik ankara',
        'etkinlik video çekimi',
        'etkinlik fotoğraf çekimi',

        // Sektörel
        'ankara kurumsal hizmetler',
        'ankara dijital pazarlama',
        'ankara marka danışmanlığı',
        'startup dijital ajans',
        'kobilere dijital pazarlama',
        'restoran sosyal medya yönetimi',
        'otel sosyal medya yönetimi',
        'sağlık sektörü dijital pazarlama',
        'eğitim kurumu sosyal medya',

        // AI & modern search
        'en iyi dijital ajans ankara',
        'ankara en iyi reklam ajansı',
        'ankara sosyal medya firması',
        'ankara web tasarım firması',
        'ankara video prodüksiyon firması',
    ],
}

export const baseMetadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: `${siteConfig.shortName} | Dijital Ajans Ankara - Sosyal Medya, Video, Web Tasarım`,
        template: `%s | ${siteConfig.shortName}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: 'New Social Agency', url: siteConfig.url }],
    creator: 'New Social Agency',
    publisher: 'New Social Agency',
    category: 'technology',
    openGraph: {
        type: 'website',
        locale: siteConfig.locale,
        url: siteConfig.url,
        siteName: siteConfig.shortName,
        title: `${siteConfig.shortName} | Dijital Ajans Ankara`,
        description: siteConfig.description,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: 'New Social Agency - Ankara Dijital Ajans',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: `${siteConfig.shortName} | Dijital Ajans Ankara`,
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
    alternates: {
        canonical: siteConfig.url,
    },
}

// Helper to generate page metadata
export function generatePageMetadata({
    title,
    description,
    path = '',
    image,
    keywords,
}: {
    title: string
    description: string
    path?: string
    image?: string
    keywords?: string[]
}): Metadata {
    const url = `${siteConfig.url}${path}`
    const ogImage = image || siteConfig.ogImage

    return {
        title,
        description,
        keywords: keywords || siteConfig.keywords,
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
