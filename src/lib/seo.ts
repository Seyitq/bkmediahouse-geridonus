import { Metadata } from 'next'

// Base metadata for the site
export const siteConfig = {
    name: 'BK Media House | Konya Dijital Ajans',
    shortName: 'BK Media House',
    description: 'Konya Selçuklu merkezli dijital ajans. Emlak sosyal medya yönetimi, kurumsal video prodüksiyon, drone çekimi, web tasarım, marka kimliği ve reklam kampanyası hizmetleri. Gayrimenkul, inşaat ve kurumsal firmalar için etkili dijital çözümler.',
    url: 'https://bkmediahouse.com.tr',
    ogImage: '/og-image.jpg',
    locale: 'tr_TR',
    phone: '+905452090838',
    email: 'info@bkmediahouse.com.tr',
    address: {
        city: 'Selçuklu',
        country: 'TR',
        region: 'İç Anadolu',
    },
    keywords: [
        // Ana marka
        'BK Media House',
        'bkmediahouse',
        'bk media house konya',

        // Ana anahtar kelimeler
        'dijital ajans konya',
        'konya dijital ajans',
        'reklam ajansı konya',
        'sosyal medya ajansı konya',
        'medya ajansı konya',
        'kreatif ajans konya',
        'konya reklam ajansı',
        'konya medya şirketi',

        // Konya ilçeleri / semtleri
        'dijital ajans selçuklu',
        'reklam ajansı selçuklu',
        'dijital ajans meram',
        'reklam ajansı meram',
        'dijital ajans karatay',
        'web tasarım selçuklu',
        'sosyal medya yönetimi selçuklu',
        'video çekimi selçuklu konya',
        'konya teknokent dijital ajans',
        'konya organize sanayi dijital pazarlama',
        'konya ereğli dijital ajans',
        'konya akşehir reklam ajansı',
        'konya seydişehir dijital ajans',

        // Emlak & gayrimenkul sosyal medya
        'emlak sosyal medya yönetimi',
        'emlak sosyal medya konya',
        'gayrimenkul sosyal medya yönetimi',
        'gayrimenkul dijital pazarlama',
        'emlak reklam ajansı',
        'emlak dijital pazarlama konya',
        'inşaat firması sosyal medya',
        'inşaat sosyal medya yönetimi',
        'müteahhit sosyal medya',
        'konut projesi tanıtımı',
        'emlak video çekimi',
        'gayrimenkul drone çekimi',
        'emlak fotoğraf çekimi',
        'konut projesi reklam filmi',
        'konya emlak ajansı',
        'konya inşaat firması tanıtım',
        'konya gayrimenkul dijital pazarlama',

        // Video prodüksiyon
        'video prodüksiyon konya',
        'kurumsal video çekimi konya',
        'tanıtım filmi konya',
        'reklam filmi çekimi konya',
        'sosyal medya video çekimi',
        'ürün tanıtım videosu',
        'firma tanıtım filmi konya',
        'konya kurumsal tanıtım filmi',
        'konya reklam filmi yapımı',

        // Drone
        'drone çekimi konya',
        'havadan çekim konya',
        'drone video konya',
        'havadan fotoğraf çekimi konya',
        'inşaat drone çekimi',
        'şantiye drone çekimi',
        'konya drone hizmetleri',

        // Fotoğraf
        'fotoğraf çekimi konya',
        'ürün fotoğrafı konya',
        'kurumsal fotoğraf çekimi konya',
        'profesyonel fotoğraf konya',
        'mekan fotoğraf çekimi',
        'iç mekan fotoğraf çekimi',
        'konya ticari fotoğraf',

        // Web tasarım
        'web tasarım konya',
        'web sitesi yapımı konya',
        'kurumsal web sitesi konya',
        'e-ticaret sitesi konya',
        'landing page tasarımı',
        'emlak web sitesi',
        'inşaat firması web sitesi',
        'konya yazılım ve web ajansı',
        'konya next.js web sitesi',

        // Logo & marka
        'logo tasarımı konya',
        'marka kimliği konya',
        'kurumsal kimlik konya',
        'grafik tasarım konya',
        'marka stratejisi',
        'konya logo tasarım firması',
        'konya kurumsal kimlik tasarımı',

        // Sosyal medya yönetimi
        'sosyal medya yönetimi konya',
        'instagram yönetimi konya',
        'sosyal medya danışmanlığı konya',
        'içerik üretimi konya',
        'sosyal medya içerik üretimi',
        'dijital pazarlama konya',
        'google ads konya',
        'meta reklam yönetimi',
        'tiktok yönetimi konya',
        'konya instagram yönetimi',
        'konya linkedin yönetimi',
        'konya facebook reklam ajansı',

        // Reklam kampanyası
        'reklam kampanyası konya',
        'dijital reklam konya',
        'performans pazarlama konya',
        'google ads yönetimi',
        'facebook reklam yönetimi',
        'instagram reklam yönetimi',
        'konya google reklam ajansı',
        'konya meta ads ajansı',

        // Etkinlik
        'etkinlik yönetimi konya',
        'kurumsal etkinlik konya',
        'etkinlik video çekimi',
        'etkinlik fotoğraf çekimi',
        'konya fuar çekimi',
        'konya organizasyon çekimi',

        // Sektörel – Konya özelinde
        'konya kurumsal hizmetler',
        'konya dijital pazarlama',
        'konya marka danışmanlığı',
        'kobilere dijital pazarlama',
        'konya restoran sosyal medya',
        'konya otel sosyal medya',
        'konya sağlık sektörü dijital pazarlama',
        'konya eğitim kurumu sosyal medya',
        'konya tekstil firması tanıtım',
        'konya mobilya firması dijital pazarlama',
        'konya otomotiv sosyal medya',
        'konya tarım sektörü dijital ajans',
        'konya perakende dijital pazarlama',
        'konya hukuk bürosu web sitesi',
        'konya muhasebe firması web sitesi',

        // AI & modern arama
        'en iyi dijital ajans konya',
        'konya en iyi reklam ajansı',
        'konya sosyal medya firması',
        'konya web tasarım firması',
        'konya video prodüksiyon firması',
        'konya profesyonel dijital ajans',
        'konya uygun fiyatlı dijital ajans',
        'konya kurumsal medya çözümleri',
    ],
}

export const baseMetadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: `${siteConfig.shortName} | Dijital Ajans Konya - Sosyal Medya, Video, Web Tasarım`,
        template: `%s | ${siteConfig.shortName}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: 'BK Media House', url: siteConfig.url }],
    creator: 'BK Media House',
    publisher: 'BK Media House',
    category: 'technology',
    openGraph: {
        type: 'website',
        locale: siteConfig.locale,
        url: siteConfig.url,
        siteName: siteConfig.shortName,
        title: `${siteConfig.shortName} | Dijital Ajans Konya`,
        description: siteConfig.description,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: 'BK Media House - Konya Dijital Ajans',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: `${siteConfig.shortName} | Dijital Ajans Konya`,
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
