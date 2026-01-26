import { siteConfig } from './seo'

// Organization JSON-LD
export function getOrganizationJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        description: siteConfig.description,
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'İstanbul',
            addressCountry: 'TR',
        },
        sameAs: [
            'https://instagram.com/bkmediahouse',
            'https://linkedin.com/company/bkmediahouse',
        ],
    }
}

// WebSite JSON-LD
export function getWebsiteJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        inLanguage: 'tr-TR',
    }
}

// Service JSON-LD
export function getServiceJsonLd(service: {
    name: string
    description: string
    url: string
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.name,
        description: service.description,
        provider: {
            '@type': 'Organization',
            name: siteConfig.name,
        },
        url: service.url,
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
            name: siteConfig.name,
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
