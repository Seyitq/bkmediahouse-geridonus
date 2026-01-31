import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SocialButtons } from '@/components/social-buttons'

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen flex-col bg-black text-white selection:bg-white selection:text-black">
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
