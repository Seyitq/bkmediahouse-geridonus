'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ArrowRight,
    Clock,
    Package,
    Zap,
    Check,
    ChevronDown,
    ChevronUp,
    Star,
    MessageCircle,
    Phone
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ServiceDetailContent } from '@/lib/service-detail-content'

interface ServiceDetailPageClientProps {
    content: ServiceDetailContent
}

export function ServiceDetailPageClient({ content }: ServiceDetailPageClientProps) {
    const [openFaq, setOpenFaq] = useState<number | null>(null)
    const [isStickyCTAVisible, setIsStickyCTAVisible] = useState(false)

    // Show sticky CTA after scrolling past hero
    useEffect(() => {
        const handleScroll = () => {
            setIsStickyCTAVisible(window.scrollY > 600)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="min-h-screen bg-white text-zinc-900">
            {/* 1. HERO SECTION */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-white" />

                <div className="container mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6">
                                {content.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-zinc-500 mb-8 leading-relaxed">
                                {content.heroPromise}
                            </p>

                            {/* Proof Chips */}
                            <div className="flex flex-wrap gap-3 mb-10">
                                {content.proofChips.map((chip, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2 px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-full text-sm text-zinc-600"
                                    >
                                        <Check className="w-4 h-4 text-green-400" />
                                        {chip}
                                    </div>
                                ))}
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    size="lg"
                                    className="h-14 px-8 text-lg bg-zinc-900 text-white hover:bg-zinc-800 rounded-full"
                                    asChild
                                >
                                    <Link href="/booking">
                                        Teklif Al
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-14 px-8 text-lg border-green-500 text-green-600 hover:bg-green-50 rounded-full"
                                    asChild
                                >
                                    <a
                                        href="https://wa.me/905412717795"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <MessageCircle className="mr-2 h-5 w-5" />
                                        WhatsApp
                                    </a>
                                </Button>
                            </div>
                        </motion.div>

                        {/* Right: Hero Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="hidden lg:block"
                        >
                            <div className="relative aspect-square rounded-3xl overflow-hidden border border-zinc-200">
                                <Image
                                    src={content.heroImage}
                                    alt={content.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. QUICK SUMMARY BLOCKS */}
            <section className="py-20 px-4 bg-zinc-50">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Deliverables */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm"
                        >
                            <Package className="w-10 h-10 text-blue-500 mb-4" />
                            <h3 className="text-xl font-bold mb-4">Teslimatlar</h3>
                            <ul className="space-y-2">
                                {content.deliverables.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-zinc-500">
                                        <Check className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Timeline */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm"
                        >
                            <Clock className="w-10 h-10 text-purple-500 mb-4" />
                            <h3 className="text-xl font-bold mb-4">Süre</h3>
                            <p className="text-3xl font-bold text-zinc-900 mb-2">{content.timeline}</p>
                            <p className="text-zinc-500">Tipik proje süresi</p>
                        </motion.div>

                        {/* Process Steps */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm"
                        >
                            <Zap className="w-10 h-10 text-yellow-500 mb-4" />
                            <h3 className="text-xl font-bold mb-4">Süreç</h3>
                            <div className="flex items-center gap-2">
                                {content.processSteps.map((step, idx) => (
                                    <div key={idx} className="flex items-center">
                                        <span className="text-zinc-400 text-sm">{step}</span>
                                        {idx < content.processSteps.length - 1 && (
                                            <ArrowRight className="w-4 h-4 text-zinc-600 mx-2" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. WHAT YOU GET */}
            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Ne Elde Edeceksiniz?</h2>
                        <p className="text-zinc-500 text-lg">Ölçülebilir ve somut çıktılar</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        {content.outcomes.map((outcome, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex items-center gap-3 p-4 rounded-xl bg-zinc-50 border border-zinc-200"
                            >
                                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                                    <Check className="w-4 h-4 text-green-500" />
                                </div>
                                <span className="text-zinc-600">{outcome}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. PACKAGES */}
            <section className="py-20 px-4 bg-zinc-50">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Paketler</h2>
                        <p className="text-zinc-500 text-lg">İhtiyacınıza uygun paketi seçin</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {content.packages.map((pkg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`relative p-6 rounded-2xl border transition-all duration-300 ${pkg.popular
                                    ? 'bg-gradient-to-b from-blue-50 to-white border-blue-300 ring-1 ring-blue-200'
                                    : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm'
                                    }`}
                            >
                                {pkg.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-xs font-medium text-white">
                                            <Star className="w-3 h-3" />
                                            En Popüler
                                        </span>
                                    </div>
                                )}

                                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                                <p className="text-zinc-500 mb-6">{pkg.description}</p>

                                <ul className="space-y-3 mb-6">
                                    {pkg.features.map((feature, fidx) => (
                                        <li key={fidx} className="flex items-start gap-2 text-sm">
                                            <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                            <span className="text-zinc-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="p-3 rounded-lg bg-zinc-50 mb-6">
                                    <p className="text-xs text-zinc-400 uppercase tracking-wide mb-1">Kimler için?</p>
                                    <p className="text-sm text-zinc-500">{pkg.forWho}</p>
                                </div>

                                <Button
                                    className={`w-full ${pkg.popular
                                        ? 'bg-zinc-900 text-white hover:bg-zinc-800'
                                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900'
                                        }`}
                                    asChild
                                >
                                    <Link href="/booking">
                                        Teklif Al
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. PROCESS TIMELINE */}
            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Süreç</h2>
                        <p className="text-zinc-500 text-lg">Adım adım nasıl çalışıyoruz</p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        {content.process.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative pl-8 pb-12 last:pb-0 border-l-2 border-zinc-200 last:border-transparent"
                            >
                                {/* Step number */}
                                <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold">
                                    {idx + 1}
                                </div>

                                <div className="ml-4">
                                    <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                                    <p className="text-zinc-500 mb-4">{step.description}</p>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200">
                                            <p className="text-xs text-blue-500 uppercase tracking-wide mb-2">Sizden</p>
                                            <p className="text-sm text-zinc-500">{step.youDo}</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200">
                                            <p className="text-xs text-purple-500 uppercase tracking-wide mb-2">Bizden</p>
                                            <p className="text-sm text-zinc-500">{step.weDo}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. CASE STUDIES */}
            <section className="py-20 px-4 bg-zinc-50">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Örnek Çalışmalar</h2>
                        <p className="text-zinc-500 text-lg">Gerçek sonuçlar, gerçek markalar</p>
                    </motion.div>

                    <div className={`grid gap-6 max-w-6xl mx-auto ${content.caseStudies.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
                        {content.caseStudies.map((study, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-6 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 shadow-sm transition-all"
                            >
                                {/* Case study image */}
                                <div className="aspect-[3/4] rounded-lg bg-zinc-100 mb-4 overflow-hidden relative">
                                    {study.image ? (
                                        <Image
                                            src={study.image}
                                            alt={study.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                                    )}
                                </div>

                                <h3 className="text-lg font-bold mb-1">{study.title}</h3>
                                <p className="text-zinc-500 text-sm mb-3">{study.client}</p>

                                {study.metric && (
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                                        <Zap className="w-4 h-4 text-green-400" />
                                        <span className="text-sm text-green-400 font-medium">{study.metric}</span>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Button variant="outline" className="border-zinc-300 text-zinc-600 hover:bg-zinc-100" asChild>
                            <Link href="/calismalar">
                                Tüm Çalışmaları Gör
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* 7. FAQ */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Sık Sorulan Sorular</h2>
                        <p className="text-zinc-500 text-lg">Merak ettiklerinize yanıtlar</p>
                    </motion.div>

                    <div className="space-y-4">
                        {content.faqs.map((faq, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="border border-zinc-200 rounded-xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-5 text-left hover:bg-zinc-50 transition-colors"
                                >
                                    <span className="font-medium">{faq.question}</span>
                                    {openFaq === idx ? (
                                        <ChevronUp className="w-5 h-5 text-zinc-500 shrink-0" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-zinc-500 shrink-0" />
                                    )}
                                </button>
                                <AnimatePresence>
                                    {openFaq === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="px-5 pb-5 text-zinc-500">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-20 px-4 bg-gradient-to-b from-zinc-50 to-white">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Projenizi Başlatalım
                        </h2>
                        <p className="text-xl text-zinc-500 mb-10">
                            Size özel teklif için hemen iletişime geçin.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                size="lg"
                                className="h-14 px-10 text-lg bg-zinc-900 text-white hover:bg-zinc-800 rounded-full"
                                asChild
                            >
                                <Link href="/booking">
                                    Teklif Al
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-14 px-10 text-lg border-green-500 text-green-600 hover:bg-green-50 rounded-full"
                                asChild
                            >
                                <a
                                    href="https://wa.me/905412717795"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <MessageCircle className="mr-2 h-5 w-5" />
                                    WhatsApp
                                </a>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 8. STICKY CTA BAR */}
            <AnimatePresence>
                {isStickyCTAVisible && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-zinc-200 py-4 px-4"
                    >
                        <div className="container mx-auto flex items-center justify-between">
                            <div className="hidden md:block">
                                <p className="font-medium">{content.title}</p>
                                <p className="text-sm text-zinc-500">Hemen teklif alın</p>
                            </div>
                            <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
                                <Button
                                    className="bg-zinc-900 text-white hover:bg-zinc-800"
                                    asChild
                                >
                                    <Link href="/booking">
                                        Teklif Al
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-green-500 text-green-600 hover:bg-green-50"
                                    asChild
                                >
                                    <a
                                        href="https://wa.me/905412717795"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
