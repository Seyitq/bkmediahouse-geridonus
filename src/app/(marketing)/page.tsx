import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { db } from '@/lib/db'
import { Hero } from '@/components/marketing/hero'
import { FeaturedProjects } from '@/components/marketing/featured-projects'
import { LogoMarquee } from '@/components/marketing/logo-marquee'
import { TestimonialMarquee } from '@/components/marketing/testimonial-marquee'
import { ServicesMarquee } from '@/components/marketing/services-marquee'
import { PortfolioSlider } from '@/components/marketing/portfolio-slider'
import { CTASection } from '@/components/marketing/cta-section'

// Force dynamic rendering to prevent build-time database calls
export const dynamic = 'force-dynamic'

export const metadata: Metadata = generatePageMetadata({
  title: 'BK Media House | Dijital Ajans Konya - Video Prodüksiyon & Web Tasarım',
  description: 'Konya merkezli dijital ajans. Kurumsal video prodüksiyon, drone çekimi, web tasarım, logo & marka kimliği, sosyal medya yönetimi hizmetleri. Markanızı dijitalde güçlendiriyoruz.',
  path: '/',
})

async function getHomePageData() {
  const [companies, testimonials, services, projects] = await Promise.all([
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
    db.project.findMany({
      orderBy: { createdAt: 'desc' },
      take: 8,
      select: {
        id: true,
        title: true,
        slug: true,
        coverImage: true,
        clientName: true,
        servicesProvided: true,
      }
    }),
  ])
  return { companies, testimonials, services, projects }
}

export default async function HomePage() {
  const { companies, testimonials, services, projects } = await getHomePageData()

  return (
    <>
      <Hero />
      <LogoMarquee companies={companies} />
      <FeaturedProjects />
      <ServicesMarquee services={services} />
      <TestimonialMarquee testimonials={testimonials} />
      <PortfolioSlider projects={projects} />
      <CTASection />
    </>
  )
}
