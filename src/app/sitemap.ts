import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://bkmediahouse.com.tr'

    // Service detail page slugs
    const serviceSlugs = [
        'video-produksiyon',
        'sosyal-medya-yonetimi',
        'marka-kimligi',
        'web-tasarim',
        'fotograf-cekimi',
        'reklam-kampanyasi',
        'icerik-uretimi',
        'etkinlik-yonetimi',
    ]

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/hizmetler`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/calismalar`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/hakkimizda`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/iletisim`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/booking`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
    ]

    // Service detail pages
    const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
        url: `${baseUrl}/hizmetler/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    return [...staticPages, ...servicePages]
}
