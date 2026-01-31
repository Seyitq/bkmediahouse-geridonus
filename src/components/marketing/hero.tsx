'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-80" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] mix-blend-screen" />
            </div>

            <div className="container relative z-10 px-4 mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-400 mb-6 backdrop-blur-sm">
                        ✨ Dijital Geleceği Tasarlıyoruz
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-8"
                >
                    Sınırları <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Aşan</span><br />
                    Dijital Deneyimler
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed"
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
                        <Button size="lg" className="relative h-14 px-8 text-lg rounded-full group overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 border-0 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300">
                            <span className="relative z-10 flex items-center">
                                Projenizi Başlatın
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Button>
                    </Link>
                    <Link href="/calismalar">
                        <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full bg-transparent backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white hover:text-black hover:border-white hover:scale-105 transition-all duration-300 group">
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
                <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </motion.div>
        </section>
    )
}
