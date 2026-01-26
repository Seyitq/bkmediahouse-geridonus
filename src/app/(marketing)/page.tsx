import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { db } from '@/lib/db'
import { Hero } from '@/components/marketing/hero'
import { FeaturedProjects } from '@/components/marketing/featured-projects'
import { LogoMarquee } from '@/components/marketing/logo-marquee'
import { TestimonialMarquee } from '@/components/marketing/testimonial-marquee'
import { ServicesMarquee } from '@/components/marketing/services-marquee'
import { CTASection } from '@/components/marketing/cta-section'

// Force dynamic rendering to prevent build-time database calls
export const dynamic = 'force-dynamic'

export const metadata: Metadata = generatePageMetadata({
  title: 'BK Media House | Dijital Ajans İstanbul',
  description: 'Markanızın dijital dünyadaki potansiyelini modern tasarım, video prodüksiyon ve stratejik içerik ile açığa çıkarıyoruz. İstanbul merkezli dijital ajans.',
  path: '/',
})

async function getHomePageData() {
  const [companies, testimonials, services] = await Promise.all([
    db.trustedCompany.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    }),
    db.testimonial.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    }),
    db.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    }),
  ])
  return { companies, testimonials, services }
}

export default async function HomePage() {
  const { companies, testimonials, services } = await getHomePageData()

  return (
    <>
      <Hero />
      <LogoMarquee companies={companies} />
      <FeaturedProjects />
      <ServicesMarquee services={services} />
      <TestimonialMarquee testimonials={testimonials} />
      <CTASection />
    </>
  )
}

