'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
    { name: 'Anasayfa', href: '/' },
    { name: 'Çalışmalar', href: '/calismalar' },
    { name: 'Hizmetler', href: '/hizmetler' },
    { name: 'İletişim', href: '/iletisim' },
]

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [pathname])

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800 py-4 shadow-sm shadow-black/20'
                    : 'bg-transparent py-6'
                    }`}
            >
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <Link href="/" className="relative z-50 group">
                        <Image
                            src="/bk-logo.png"
                            alt="BK Media House"
                            width={56}
                            height={56}
                            className="h-14 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm font-medium transition-colors hover:text-white ${pathname === item.href ? 'text-white' : 'text-zinc-400'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link href="/booking">
                            <Button
                                className="bg-white text-zinc-900 hover:bg-zinc-200 transition-all"
                            >
                                Randevu Al
                            </Button>
                        </Link>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden relative z-50 text-white p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-[#09090b] pt-24 px-4 md:hidden"
                    >
                        <nav className="flex flex-col gap-6">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        className={`text-3xl font-bold tracking-tight ${pathname === item.href ? 'text-white' : 'text-zinc-500'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-8"
                            >
                                <Link href="/booking">
                                    <Button className="w-full bg-white text-zinc-900 hover:bg-zinc-200 text-lg py-6">
                                        Randevu Oluştur
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
