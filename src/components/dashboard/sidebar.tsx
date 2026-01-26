'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
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
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { logout } from '@/actions/auth'

interface SidebarLink {
    href: string
    label: string
    icon: React.ReactNode
}

const sidebarLinks: SidebarLink[] = [
    {
        href: '/admin',
        label: 'Panel',
        icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
        href: '/admin/projeler',
        label: 'Projeler',
        icon: <FolderKanban className="h-5 w-5" />,
    },
    {
        href: '/admin/randevular',
        label: 'Randevular',
        icon: <Calendar className="h-5 w-5" />,
    },
    {
        href: '/admin/slotlar',
        label: 'Uygun Zamanlar',
        icon: <Clock className="h-5 w-5" />,
    },
    {
        href: '/admin/talepler',
        label: 'Talepler',
        icon: <MessageSquare className="h-5 w-5" />,
    },
    {
        href: '/admin/firmalar',
        label: 'Referans Firmalar',
        icon: <Building2 className="h-5 w-5" />,
    },
    {
        href: '/admin/yorumlar',
        label: 'Müşteri Yorumları',
        icon: <Quote className="h-5 w-5" />,
    },
    {
        href: '/admin/hizmetler',
        label: 'Hizmetler',
        icon: <Layers className="h-5 w-5" />,
    },
    {
        href: '/admin/ayarlar',
        label: 'Ayarlar',
        icon: <Settings className="h-5 w-5" />,
    },
]

export function Sidebar() {
    const pathname = usePathname()

    const handleLogout = async () => {
        await logout()
        window.location.href = '/giris'
    }

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-zinc-800 bg-zinc-950">
            <div className="flex h-full flex-col">
                {/* Logo */}
                <div className="flex h-16 items-center border-b border-zinc-800 px-6">
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                            <span className="text-sm font-bold text-zinc-900">BK</span>
                        </div>
                        <span className="text-lg font-semibold text-white">Media House</span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 px-3 py-4">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href ||
                            (link.href !== '/admin' && pathname.startsWith(link.href))

                        return (
                            <Link key={link.href} href={link.href}>
                                <motion.div
                                    whileHover={{ x: 4 }}
                                    className={cn(
                                        'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                                        isActive
                                            ? 'bg-zinc-800 text-white'
                                            : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                                    )}
                                >
                                    <span className={cn(
                                        'transition-colors',
                                        isActive ? 'text-white' : 'text-zinc-500 group-hover:text-white'
                                    )}>
                                        {link.icon}
                                    </span>
                                    {link.label}
                                    {isActive && (
                                        <ChevronRight className="ml-auto h-4 w-4 text-zinc-500" />
                                    )}
                                </motion.div>
                            </Link>
                        )
                    })}
                </nav>

                {/* Logout */}
                <div className="border-t border-zinc-800 p-3">
                    <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full justify-start gap-3 text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    >
                        <LogOut className="h-5 w-5" />
                        Çıkış Yap
                    </Button>
                </div>
            </div>
        </aside>
    )
}
