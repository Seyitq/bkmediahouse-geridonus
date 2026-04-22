import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { db } from '@/lib/db'
import { Hero } from '@/components/marketing/hero'
import { FeaturedProjects } from '@/components/marketing/featured-projects'
import { LogoMarquee } from '@/components/marketing/logo-marquee'
import { TestimonialSlider } from '@/components/marketing/testimonial-slider'
import { ServicesMarquee } from '@/components/marketing/services-marquee'
import { PortfolioSlider } from '@/components/marketing/portfolio-slider'
import { CTASection } from '@/components/marketing/cta-section'

// Force dynamic rendering to prevent build-time database calls
export const dynamic = 'force-dynamic'

export const metadata: Metadata = generatePageMetadata({
  title: 'Konya Dijital Ajans | Sosyal Medya Yönetimi, Video Prodüksiyon, Web Tasarım',
  description: 'Konya\'nın lider dijital ajansı BK Media House. Emlak sosyal medya yönetimi, kurumsal video prodüksiyon, drone çekimi, web tasarım, marka kimliği, reklam kampanyası. Gayrimenkul, inşaat ve kurumsal firmalar için dijital çözümler.',
  path: '/',
  keywords: [
    'dijital ajans konya', 'sosyal medya yönetimi konya', 'video prodüksiyon konya',
    'web tasarım konya', 'emlak sosyal medya yönetimi', 'gayrimenkul dijital pazarlama',
    'drone çekimi konya', 'reklam ajansı konya', 'marka kimliği konya',
    'kurumsal video çekimi konya', 'konya reklam ajansı', 'en iyi dijital ajans konya',
  ],
})

async function getHomePageData() {
  try {
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
  } catch (error) {
    console.error('[HomePage] Veritabanı sorgusu başarısız:', error)
    return { companies: [], testimonials: [], services: [], projects: [] }
  }
}

export default async function HomePage() {
  const { companies, testimonials, services, projects } = await getHomePageData()

  return (
    <>
      <Hero />
      <LogoMarquee companies={companies} />
      <FeaturedProjects />
      <ServicesMarquee services={services} />
      <TestimonialSlider testimonials={testimonials} />
      <PortfolioSlider projects={projects} />
      <CTASection />
    </>
  )
}
