'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 bg-white">
            {/* Subtle Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-white" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-zinc-100/60 rounded-full blur-[100px]" />
            </div>

            <div className="container relative z-10 px-4 mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block py-1.5 px-4 rounded-full bg-zinc-100 border border-zinc-200 text-sm text-zinc-600 mb-6 font-medium">
                        Dijital Geleceği Tasarlıyoruz
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-900 mb-8"
                >
                    Sınırları <span className="text-blue-600">Aşan</span><br />
                    Dijital Deneyimler
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-500 mb-10 leading-relaxed"
                >
                    Markanızın potansiyelini modern tasarım, stratejik içerik ve yenilikçi teknoloji ile açığa çıkarıyoruz.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href="/booking">
                        <Button size="lg" className="relative h-14 px-8 text-lg rounded-full group overflow-hidden bg-zinc-900 hover:bg-zinc-800 border-0 text-white shadow-lg shadow-zinc-900/20 hover:shadow-zinc-900/30 hover:scale-105 transition-all duration-300">
                            <span className="relative z-10 flex items-center">
                                Projenizi Başlatın
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </span>
                        </Button>
                    </Link>
                    <Link href="/calismalar">
                        <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full bg-transparent border-2 border-zinc-300 text-zinc-700 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 hover:scale-105 transition-all duration-300 group">
                            <Play className="mr-2 h-4 w-4 fill-current group-hover:scale-110 transition-transform" />
                            Projelerimizi İnceleyin
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-zinc-300 to-transparent" />
            </motion.div>
        </section>
    )
}
