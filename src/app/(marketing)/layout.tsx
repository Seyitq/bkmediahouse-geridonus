import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SocialButtons } from '@/components/social-buttons'
import { getOrganizationJsonLd, getWebsiteJsonLd, getLocalBusinessJsonLd } from '@/lib/json-ld'

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const organizationJsonLd = getOrganizationJsonLd()
    const websiteJsonLd = getWebsiteJsonLd()
    const localBusinessJsonLd = getLocalBusinessJsonLd()

    return (
            <div className="flex min-h-screen flex-col bg-[#09090b] text-zinc-100 selection:bg-zinc-700 selection:text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
            />
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <div id="main-footer" className="relative z-50">
                <Footer />
            </div>
            <SocialButtons />
        </div>
    )
}
