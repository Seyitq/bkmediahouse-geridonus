'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Calendar, Sparkles, Zap, Aperture, Sliders } from 'lucide-react'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ServiceContent } from '@/lib/service-content'

// Register GSAP
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP)
}

// Dynamic Import for 3D Viewer
const Service3DViewer = dynamic(() => import('@/components/marketing/service-3d-viewer').then(mod => mod.Service3DViewer), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-transparent" />
})

interface ServiceDetailViewProps {
    service: any
    content: ServiceContent
}

export function ServiceDetailView({ service, content }: ServiceDetailViewProps) {
    const mainWrapperRef = useRef<HTMLDivElement>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLDivElement>(null)
    const flashRef = useRef<HTMLDivElement>(null)

    // Scroll-driven Theme Switch (Flash Effect)
    useGSAP(() => {
        // Hide global footer explicitly for this page to use custom minimal footer
        gsap.set("#main-footer", { display: "none" })

        if (!triggerRef.current || !flashRef.current) return

        ScrollTrigger.create({
            trigger: triggerRef.current,
            start: "top 70%",
            onEnter: () => {
                const tl = gsap.timeline()

                // 1. Flash (One way - No flicker)
                tl.to(flashRef.current, {
                    opacity: 1,
                    duration: 0.1,
                    onComplete: () => {
                        // 2. Theme Switch (White)
                        gsap.to([document.body, mainWrapperRef.current], {
                            backgroundColor: '#ffffff',
                            duration: 0.3,
                            overwrite: 'auto'
                        })
                        // Include Footer elements in color switch
                        gsap.to(["h1", "h2", "p", "button", "span", ".text-zinc-500", "#main-footer", "#main-footer *"], {
                            color: '#000000',
                            duration: 0.3,
                            overwrite: 'auto'
                        })

                        // 3. Fade out flash overlay to reveal white theme
                        gsap.to(flashRef.current, {
                            opacity: 0,
                            duration: 0.5,
                            delay: 0.1
                        })
                    }
                })
            },
            onLeaveBack: () => {
                // Reverse (Black)
                gsap.to([document.body, mainWrapperRef.current], {
                    backgroundColor: '#000000',
                    duration: 0.3
                })
                gsap.to(["h1", "h2", "p", "button", "span", ".text-zinc-500", "#main-footer", "#main-footer *"], {
                    clearProps: "color",
                    duration: 0.3
                })
            }
        })

        return () => {
            gsap.set("#main-footer", { clearProps: "display" })
        }
    }, [])

    return (
        <div ref={mainWrapperRef} className="relative w-full bg-black min-h-screen transition-colors duration-500 overflow-x-hidden font-sans text-white">

            {/* Flash Overlay */}
            <div ref={flashRef} className="fixed inset-0 bg-white z-[9999] opacity-0 pointer-events-none mix-blend-screen" />

            {/* 3D Background - Fixed */}
            <Service3DViewer modelUrl={content.modelUrl || '/models/canoncam/camera.obj'} />

            {/* Scrollable Content Overlay */}
            <div ref={scrollContainerRef} className="relative z-10 w-full">

                {/* 1. HERO SECTION (Centered) */}
                <section className="h-screen w-full flex flex-col items-center justify-center px-6">
                    <div className="text-center max-w-5xl mx-auto">
                        <h1 className="text-[8rem] font-bold tracking-tighter mb-8">
                            {content.heroTitle.split('\n').map((line, i) => (
                                <span key={i} className="highlight-text">
                                    {line}
                                    {i < content.heroTitle.split('\n').length - 1 && <br />}
                                </span>
                            ))}
                        </h1>
                        <p className="text-2xl font-light tracking-wide">
                            <span className="highlight-text-sm">
                                {content.heroSubtitle}
                            </span>
                        </p>
                    </div>
                </section>

                {/* 2. SECTION 2 (Left Aligned) */}
                <section className="h-screen w-full flex items-center justify-start px-[10%]">
                    <div className="max-w-xl text-left">
                        <h2 className="text-[4rem] font-bold mb-4 tracking-tight">
                            {content.section2Title.split('\n').map((line, i) => (
                                <span key={i} className="highlight-text">
                                    {line}
                                    {i < content.section2Title.split('\n').length - 1 && <br />}
                                </span>
                            ))}
                        </h2>
                        <p className="text-lg font-light">
                            <span className="highlight-text-sm">
                                {content.section2Description}
                            </span>
                        </p>
                    </div>
                </section>

                {/* 3. SECTION 3 (Right Aligned) */}
                <section className="h-screen w-full flex items-center justify-end px-[10%]">
                    <div className="max-w-xl text-right">
                        <h2 className="text-[4rem] font-bold mb-4 tracking-tight">
                            {content.section3Title.split('\n').map((line, i) => (
                                <span key={i} className="highlight-text">
                                    {line}
                                    {i < content.section3Title.split('\n').length - 1 && <br />}
                                </span>
                            ))}
                        </h2>
                        <p className="text-lg font-light">
                            <span className="highlight-text-sm">
                                {content.section3Description}
                            </span>
                        </p>
                    </div>
                </section>

                {/* 4. SECTION 4 (Centered) */}
                <section className="h-screen w-full flex items-center justify-center px-6">
                    <div className="text-center max-w-3xl">
                        <h2 className="text-[4rem] font-bold mb-6 tracking-tight">
                            {content.section4Title.split('\n').map((line, i) => (
                                <span key={i} className="highlight-text">
                                    {line}
                                    {i < content.section4Title.split('\n').length - 1 && <br />}
                                </span>
                            ))}
                        </h2>
                        <p className="text-lg font-light max-w-2xl mx-auto">
                            <span className="highlight-text-sm">
                                {content.section4Description}
                            </span>
                        </p>
                    </div>
                </section>

                {/* 5. CTA / FINAL TRIGGER (Centered) */}
                <section ref={triggerRef} className="h-screen w-full flex flex-col items-center justify-center px-6 pb-20">
                    <div className="text-center mt-96">
                        <h2 className="text-[5rem] font-bold leading-none mb-10 tracking-tighter">
                            {content.ctaTitle.split('\n').map((line, i) => (
                                <span key={i}>{line}{i < content.ctaTitle.split('\n').length - 1 && <br />}</span>
                            ))}
                        </h2>
                        <div className="flex gap-4 justify-center">
                            <Link href="/booking">
                                <button className="border-2 border-black bg-transparent text-black px-8 py-4 rounded-full text-xl font-medium hover:bg-black hover:!text-white hover:scale-105 transition-all duration-300 flex items-center gap-2">
                                    Randevu Al <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>
                            <Link href="/calismalar">
                                <button className="border-2 border-black bg-transparent text-black px-8 py-4 rounded-full text-xl font-medium hover:bg-black hover:!text-white hover:scale-105 transition-all duration-300">
                                    Çalışmalarımızı İncele
                                </button>
                            </Link>
                        </div>

                        {/* More Services Link */}
                        <div className="mt-12">
                            <Link href="/hizmetler">
                                <button className="text-sm font-medium text-gray-500 hover:text-black transition-colors flex items-center gap-2 mx-auto group">
                                    Diğer Hizmetlerimize Göz At <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Custom Minimal Footer defined here to replace Global Footer */}
                <footer className="w-full py-12 px-6 flex flex-col md:flex-row justify-between items-end md:items-center gap-8 text-black pb-20">
                    {/* Logo & Copyright */}
                    <div className="flex flex-col gap-2">
                        <span className="text-2xl font-bold tracking-tighter">
                            BK<span className="font-light">MediaHouse</span>
                        </span>
                        <p className="text-xs text-black/60">
                            © {new Date().getFullYear()} BK Media House. Tüm hakları saklıdır.
                        </p>
                    </div>

                    {/* Nav */}
                    <nav className="flex items-center gap-8">
                        <a href="/" className="text-sm font-medium hover:text-gray-600 transition-colors">Anasayfa</a>
                        <a href="/calismalar" className="text-sm font-medium hover:text-gray-600 transition-colors">Çalışmalar</a>
                        <a href="/hizmetler" className="text-sm font-medium hover:text-gray-600 transition-colors">Hizmetler</a>
                        <a href="/iletisim" className="text-sm font-medium hover:text-gray-600 transition-colors">İletişim</a>
                    </nav>
                </footer>
            </div>
        </div>
    )
}
