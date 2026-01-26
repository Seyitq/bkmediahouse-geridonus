import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/', '/giris'],
            },
        ],
        sitemap: 'https://bkmediahouse.com.tr/sitemap.xml',
    }
}
