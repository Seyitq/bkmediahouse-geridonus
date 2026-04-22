'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LayoutDashboard,
    FolderKanban,
    Calendar,
    Clock,
    MessageSquare,
    Settings,
    LogOut,
    ChevronRight,
    Building2,
    Quote,
    Layers,
    ClipboardList,
    Users,
    Tag,
    Menu,
    X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { logout } from '@/actions/auth'

interface SidebarLink {
    href: string
    label: string
    icon: React.ReactNode
    separator?: boolean
    adminOnly?: boolean
}

interface SidebarProps {
    userRole?: string
}

const sidebarLinks: SidebarLink[] = [
    {
        href: '/admin',
        label: 'Panel',
        icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
        href: '/admin/gorevler',
        label: 'Görevler',
        icon: <ClipboardList className="h-5 w-5" />,
        separator: true,
    },
    {
        href: '/admin/calisanlar',
        label: 'Çalışanlar',
        icon: <Users className="h-5 w-5" />,
        adminOnly: true,
    },
    {
        href: '/admin/kategoriler',
        label: 'Kategoriler',
        icon: <Tag className="h-5 w-5" />,
        adminOnly: true,
    },
    {
        href: '/admin/projeler',
        label: 'Projeler',
        icon: <FolderKanban className="h-5 w-5" />,
        separator: true,
        adminOnly: true,
    },
    {
        href: '/admin/randevular',
        label: 'Randevular',
        icon: <Calendar className="h-5 w-5" />,
        adminOnly: true,
    },
    {
        href: '/admin/slotlar',
        label: 'Uygun Zamanlar',
        icon: <Clock className="h-5 w-5" />,
        adminOnly: true,
    },
    {
        href: '/admin/talepler',
        label: 'Talepler',
        icon: <MessageSquare className="h-5 w-5" />,
        adminOnly: true,
    },
    {
        href: '/admin/firmalar',
        label: 'Referans Firmalar',
        icon: <Building2 className="h-5 w-5" />,
        separator: true,
        adminOnly: true,
    },
    {
        href: '/admin/yorumlar',
        label: 'Müşteri Yorumları',
        icon: <Quote className="h-5 w-5" />,
        adminOnly: true,
    },
    {
        href: '/admin/hizmetler',
        label: 'Hizmetler',
        icon: <Layers className="h-5 w-5" />,
        adminOnly: true,
    },
    {
        href: '/admin/ayarlar',
        label: 'Ayarlar',
        icon: <Settings className="h-5 w-5" />,
    },
]

export function Sidebar({ userRole }: SidebarProps) {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const isStaff = userRole === 'STAFF'
    const filteredLinks = isStaff
        ? sidebarLinks.filter((link) => !link.adminOnly)
        : sidebarLinks

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    // Prevent body scroll when sidebar is open on mobile
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    const handleLogout = async () => {
        await logout()
        window.location.href = '/giris'
    }

    const sidebarContent = (
        <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-6">
                <Link href="/admin" className="flex items-center gap-2">
                    <Image
                        src="/bk-logo.jpg"
                        alt="BK Media House"
                        width={40}
                        height={40}
                        className="h-10 w-auto object-contain"
                    />
                </Link>
                {/* Mobile close button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="lg:hidden p-1 text-zinc-400 hover:text-zinc-900 transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-0.5 px-3 py-4 overflow-y-auto">
                {filteredLinks.map((link, index) => {
                    const isActive = pathname === link.href ||
                        (link.href !== '/admin' && pathname.startsWith(link.href))

                    return (
                        <div key={link.href}>
                            {link.separator && index > 0 && (
                                <div className="my-2 border-t border-zinc-200" />
                            )}
                            <Link href={link.href}>
                                <motion.div
                                    whileHover={{ x: 4 }}
                                    className={cn(
                                        'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                                        isActive
                                            ? 'bg-zinc-100 text-zinc-900'
                                            : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                                    )}
                                >
                                    <span className={cn(
                                        'transition-colors',
                                        isActive ? 'text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-900'
                                    )}>
                                        {link.icon}
                                    </span>
                                    {link.label}
                                    {isActive && (
                                        <ChevronRight className="ml-auto h-4 w-4 text-zinc-400" />
                                    )}
                                </motion.div>
                            </Link>
                        </div>
                    )
                })}
            </nav>

            {/* Logout */}
            <div className="border-t border-zinc-200 p-3">
                <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start gap-3 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                >
                    <LogOut className="h-5 w-5" />
                    Çıkış Yap
                </Button>
            </div>
        </div>
    )

    return (
        <>
            {/* Mobile hamburger button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 transition-colors shadow-sm"
                aria-label="Menüyü aç"
            >
                <Menu className="h-5 w-5" />
            </button>

            {/* Desktop sidebar */}
            <aside className="hidden lg:block fixed left-0 top-0 z-40 h-screen w-64 border-r border-zinc-200 bg-white">
                {sidebarContent}
            </aside>

            {/* Mobile sidebar overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
                        />
                        {/* Sidebar */}
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed left-0 top-0 z-50 h-screen w-72 border-r border-zinc-200 bg-white lg:hidden"
                        >
                            {sidebarContent}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
