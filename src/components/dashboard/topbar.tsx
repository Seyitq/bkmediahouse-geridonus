'use client'

import { Bell, Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { logout } from '@/actions/auth'

interface TopbarProps {
    user?: {
        name: string | null
        email: string
        image: string | null
    }
}

export function Topbar({ user }: TopbarProps) {
    const handleLogout = async () => {
        await logout()
        window.location.href = '/giris'
    }

    const userInitials = user?.name
        ? user.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
        : 'UK'

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-zinc-800 bg-zinc-950/80 px-4 sm:px-6 pl-14 lg:pl-6 backdrop-blur-xl">
            {/* Search */}
            <div className="flex-1">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                    <Input
                        placeholder="Ara..."
                        className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-zinc-700"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                {/* Notifications */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="flex items-center gap-2 text-zinc-400 hover:text-white hover:bg-zinc-800"
                        >
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user?.image || undefined} />
                                <AvatarFallback className="bg-zinc-800 text-zinc-300 text-xs">
                                    {userInitials}
                                </AvatarFallback>
                            </Avatar>
                            <span className="hidden md:inline-block text-sm">
                                {user?.name || user?.email || 'Kullanıcı'}
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className="w-56 bg-zinc-900 border-zinc-800"
                    >
                        <DropdownMenuLabel className="text-zinc-300">
                            Hesabım
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-zinc-800" />
                        <DropdownMenuItem className="text-zinc-400 focus:bg-zinc-800 focus:text-white cursor-pointer">
                            <User className="mr-2 h-4 w-4" />
                            Profil
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-zinc-800" />
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="text-red-400 focus:bg-zinc-800 focus:text-red-400 cursor-pointer"
                        >
                            Çıkış Yap
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
