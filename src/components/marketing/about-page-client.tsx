'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Zap, Users, Award, ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const values = [
    {
        icon: Target,
        title: 'Sonuç Odaklı',
        description: 'Her projede ölçülebilir sonuçlar hedefliyoruz. Stratejilerimiz veriye dayalı, çıktılarımız somut.',
    },
    {
        icon: Zap,
        title: 'Hızlı Teslimat',
        description: 'Zaman sizin için değerli. Projelerinizi belirlenen sürede, kaliteden ödün vermeden teslim ediyoruz.',
    },
    {
        icon: Users,
        title: 'İşbirliği',
        description: 'Sizi sadece müşteri değil, iş ortağı olarak görüyoruz. Her adımda şeffaf iletişim kuruyoruz.',
    },
    {
        icon: Award,
        title: 'Kalite Standartları',
        description: 'Uluslararası standartlarda tasarım ve içerik üretiyoruz. Her detay özenle ele alınır.',
    },
]

const stats = [
    { number: '50+', label: 'Tamamlanan Proje' },
    { number: '30+', label: 'Mutlu Müşteri' },
    { number: '3+', label: 'Yıllık Deneyim' },
    { number: '8', label: 'Hizmet Alanı' },
]

const services = [
    'Video Prodüksiyon & Drone Çekimi',
    'Sosyal Medya Yönetimi',
    'Marka Kimliği & Logo Tasarımı',
    'Web Tasarım & Geliştirme',
    'Profesyonel Fotoğraf Çekimi',
    'Dijital Reklam Kampanyası',
    'İçerik Üretimi & SEO',
    'Etkinlik Yönetimi',
]

export function AboutPageClient() {
    return (
        <div className="pt-32 pb-20">
            {/* Hero Section */}
            <section className="container mx-auto px-4 mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <span className="inline-block px-4 py-1.5 bg-zinc-100 text-zinc-600 text-sm font-medium rounded-full mb-6">
                        Hakkımızda
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight mb-6">
                        Markanızı dijital dünyada
                        <span className="text-zinc-400"> güçlü kılıyoruz</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
                        BK Media House olarak, Konya merkezli dijital ajans kimliğimizle
                        markaların hikayelerini etkili bir şekilde anlatıyor, dijital varlıklarını
                        stratejik ve yaratıcı çözümlerle güçlendiriyoruz.
                    </p>
                </motion.div>
            </section>

            {/* Stats Section */}
            <section className="container mx-auto px-4 mb-24">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-zinc-900 mb-2">
                                {stat.number}
                            </div>
                            <div className="text-zinc-500 text-sm md:text-base">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="bg-zinc-50 border-y border-zinc-200 py-24 mb-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900">
                                    <Target className="h-5 w-5 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-zinc-900">Misyonumuz</h2>
                            </div>
                            <p className="text-zinc-600 leading-relaxed">
                                İşletmelerin dijital dünyada fark yaratmasını sağlamak. Her ölçekteki markaya,
                                stratejik düşünce ve yaratıcı uygulamalarla güçlü bir dijital kimlik kazandırıyoruz.
                                Müşterilerimizin hedeflerini kendi hedeflerimiz olarak benimsiyor, her projede
                                ölçülebilir sonuçlar üretiyoruz.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900">
                                    <Eye className="h-5 w-5 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-zinc-900">Vizyonumuz</h2>
                            </div>
                            <p className="text-zinc-600 leading-relaxed">
                                Konya&apos;nın ve Türkiye&apos;nin en güvenilir dijital ajansı olmak.
                                Teknoloji, tasarım ve stratejiyi bir araya getirerek markaların dijital
                                dönüşümüne öncülük etmek. Her sektörde, her ölçekte fark yaratan
                                çözümler sunarak sektörün referans noktası olmayı hedefliyoruz.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="container mx-auto px-4 mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight mb-4">
                        Değerlerimiz
                    </h2>
                    <p className="text-zinc-500 max-w-xl mx-auto">
                        Her projemizde bu değerleri temel alarak çalışıyoruz.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                    {values.map((value, index) => {
                        const Icon = value.icon
                        return (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center p-6 rounded-2xl border border-zinc-200 hover:border-zinc-300 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-100 mb-4">
                                    <Icon className="h-6 w-6 text-zinc-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-zinc-900 mb-2">{value.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">{value.description}</p>
                            </motion.div>
                        )
                    })}
                </div>
            </section>

            {/* Services Overview */}
            <section className="container mx-auto px-4 mb-24">
                <div className="max-w-3xl mx-auto bg-zinc-50 rounded-2xl border border-zinc-200 p-8 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-8 text-center">
                        Neler Yapıyoruz?
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {services.map((service, index) => (
                            <motion.div
                                key={service}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="flex items-center gap-3"
                            >
                                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                                <span className="text-zinc-700">{service}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight mb-4">
                        Projenizi konuşalım
                    </h2>
                    <p className="text-zinc-500 mb-8 max-w-xl mx-auto">
                        Markanız için en doğru stratejiyi birlikte belirleyelim.
                        Ücretsiz ön görüşme için hemen randevu alın.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/booking">
                            <Button size="lg" className="bg-zinc-900 text-white hover:bg-zinc-800 group">
                                Randevu Al
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                        <Link href="/iletisim">
                            <Button size="lg" variant="outline" className="border-zinc-300 text-zinc-700 hover:bg-zinc-50">
                                İletişime Geç
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    )
}
