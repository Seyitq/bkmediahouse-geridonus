import { siteConfig } from './seo'

// Organization JSON-LD
export function getOrganizationJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.shortName,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        description: siteConfig.description,
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Selçuklu',
            addressRegion: 'Konya',
            addressCountry: 'TR',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+90-545-209-0838',
            contactType: 'customer service',
            availableLanguage: ['Turkish', 'English'],
        },
        sameAs: [
            'https://instagram.com/bkmediahouse',
            'https://linkedin.com/company/bkmediahouse',
        ],
    }
}

// LocalBusiness JSON-LD (critical for Google Maps & local search)
export function getLocalBusinessJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': `${siteConfig.url}/#localbusiness`,
        name: siteConfig.shortName,
        url: siteConfig.url,
        image: `${siteConfig.url}/logo.png`,
        description: 'Konya Selçuklu merkezli dijital ajans. Emlak sosyal medya yönetimi, kurumsal video prodüksiyon, drone çekimi, web tasarım, marka kimliği, reklam kampanyası ve etkinlik yönetimi hizmetleri sunuyoruz.',
        telephone: '+90-545-209-0838',
        email: siteConfig.email,
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Selçuklu',
            addressRegion: 'Konya',
            addressCountry: 'TR',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 37.9181,
            longitude: 32.4846,
        },
        areaServed: [
            { '@type': 'City', name: 'Selçuklu' },
            { '@type': 'City', name: 'Konya' },
            { '@type': 'Country', name: 'Türkiye' },
        ],
        serviceArea: {
            '@type': 'GeoCircle',
            geoMidpoint: {
                '@type': 'GeoCoordinates',
                latitude: 37.9181,
                longitude: 32.4846,
            },
        },
        priceRange: '₺₺',
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
        },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Dijital Ajans Hizmetleri',
            itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sosyal Medya Yönetimi', description: 'Instagram, Facebook, TikTok, LinkedIn sosyal medya hesap yönetimi ve içerik üretimi. Emlak, gayrimenkul ve kurumsal firmalar için özel stratejiler.' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Video Prodüksiyon', description: 'Kurumsal tanıtım filmi, reklam filmi, sosyal medya video içerikleri, emlak tanıtım videoları.' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Drone Çekimi', description: 'Havadan fotoğraf ve video çekimi. İnşaat, emlak, etkinlik ve tanıtım amaçlı drone hizmetleri.' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Tasarım', description: 'Kurumsal web sitesi, e-ticaret sitesi, emlak web sitesi yapımı ve geliştirme.' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Marka Kimliği', description: 'Logo tasarımı, kurumsal kimlik, marka stratejisi ve görsel kimlik çalışmaları.' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Reklam Kampanyası', description: 'Google Ads, Meta (Facebook/Instagram) reklam yönetimi, dijital performans pazarlama.' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fotoğraf Çekimi', description: 'Ürün fotoğrafı, mekan fotoğrafı, emlak fotoğraf çekimi, kurumsal fotoğraf.' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Etkinlik Yönetimi', description: 'Kurumsal etkinlik organizasyonu, lansman, açılış, fuar organizasyonu.' } },
            ],
        },
    }
}

// WebSite JSON-LD with SearchAction for sitelinks search box
export function getWebsiteJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        name: siteConfig.shortName,
        url: siteConfig.url,
        description: siteConfig.description,
        inLanguage: 'tr-TR',
        publisher: {
            '@id': `${siteConfig.url}/#organization`,
        },
    }
}

// Service JSON-LD
export function getServiceJsonLd(service: {
    name: string
    description: string
    url: string
    keywords?: string[]
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.name,
        description: service.description,
        provider: {
            '@type': 'Organization',
            name: siteConfig.shortName,
            '@id': `${siteConfig.url}/#organization`,
        },
        areaServed: {
            '@type': 'City',
            name: 'Konya',
        },
        url: service.url,
    }
}

// FAQPage JSON-LD (AI search engines love FAQ structured data)
export function getFaqJsonLd(faqs: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    }
}

// Creative Work (Project) JSON-LD
export function getProjectJsonLd(project: {
    title: string
    description: string
    image?: string
    url: string
    dateCreated: string
    client: string
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        image: project.image,
        url: project.url,
        dateCreated: project.dateCreated,
        creator: {
            '@type': 'Organization',
            name: siteConfig.shortName,
            '@id': `${siteConfig.url}/#organization`,
        },
        client: {
            '@type': 'Organization',
            name: project.client,
        },
    }
}

// Breadcrumb JSON-LD
export function getBreadcrumbJsonLd(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    }
}
