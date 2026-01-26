import { db } from '@/lib/db'

// Force dynamic rendering to prevent build-time database calls
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Plus, Calendar, Clock, Trash2, Check, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { deleteAvailableSlot, toggleSlotBooked } from '@/actions/slots'
import { revalidatePath } from 'next/cache'

async function getSlots() {
    return await db.availableSlot.findMany({
        orderBy: { startTime: 'asc' },
    })
}

async function getStats() {
    const total = await db.availableSlot.count()
    const booked = await db.availableSlot.count({ where: { isBooked: true } })
    const available = await db.availableSlot.count({ where: { isBooked: false } })
    const upcoming = await db.availableSlot.count({
        where: {
            startTime: { gte: new Date() },
            isBooked: false,
        },
    })
    return { total, booked, available, upcoming }
}

export default async function SlotsPage() {
    const slots = await getSlots()
    const stats = await getStats()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Uygun Zamanlar</h1>
                    <p className="text-zinc-500">Randevu için uygun zaman dilimlerini yönetin</p>
                </div>
                <Link href="/admin/slotlar/yeni">
                    <Button className="bg-white text-zinc-900 hover:bg-zinc-200">
                        <Plus className="mr-2 h-4 w-4" />
                        Yeni Slot Ekle
                    </Button>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Toplam Slot</CardTitle>
                        <Calendar className="h-4 w-4 text-zinc-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Müsait</CardTitle>
                        <Check className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-500">{stats.available}</div>
                    </CardContent>
                </Card>
                <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Dolu</CardTitle>
                        <X className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-500">{stats.booked}</div>
                    </CardContent>
                </Card>
                <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Yaklaşan</CardTitle>
                        <Clock className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-500">{stats.upcoming}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Slots Table */}
            <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                    <CardTitle className="text-white">Tüm Zaman Dilimleri</CardTitle>
                    <CardDescription className="text-zinc-500">
                        Oluşturduğunuz uygun zamanların listesi
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {slots.length === 0 ? (
                        <div className="text-center py-12">
                            <Calendar className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
                            <p className="text-zinc-500">Henüz zaman dilimi eklenmemiş.</p>
                            <Link href="/admin/slotlar/yeni" className="mt-4 inline-block">
                                <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white">
                                    İlk Slotu Ekle
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="border-zinc-800 hover:bg-transparent">
                                    <TableHead className="text-zinc-400">Tarih</TableHead>
                                    <TableHead className="text-zinc-400">Saat</TableHead>
                                    <TableHead className="text-zinc-400">Süre</TableHead>
                                    <TableHead className="text-zinc-400">Durum</TableHead>
                                    <TableHead className="text-zinc-400 text-right">İşlemler</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {slots.map((slot) => {
                                    const start = new Date(slot.startTime)
                                    const end = new Date(slot.endTime)
                                    const duration = Math.round((end.getTime() - start.getTime()) / (1000 * 60))
                                    const isPast = start < new Date()

                                    return (
                                        <TableRow key={slot.id} className="border-zinc-800">
                                            <TableCell className="text-white">
                                                {format(start, 'd MMMM yyyy', { locale: tr })}
                                            </TableCell>
                                            <TableCell className="text-zinc-300">
                                                {format(start, 'HH:mm')} - {format(end, 'HH:mm')}
                                            </TableCell>
                                            <TableCell className="text-zinc-400">
                                                {duration} dk
                                            </TableCell>
                                            <TableCell>
                                                {isPast ? (
                                                    <Badge variant="outline" className="bg-zinc-800/50 text-zinc-500 border-zinc-700">
                                                        Geçmiş
                                                    </Badge>
                                                ) : slot.isBooked ? (
                                                    <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">
                                                        Dolu
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                                                        Müsait
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                                                        {!isPast && (
                                                            <form action={async () => {
                                                                'use server'
                                                                await toggleSlotBooked(slot.id, !slot.isBooked)
                                                                revalidatePath('/admin/slotlar')
                                                            }}>
                                                                <DropdownMenuItem asChild>
                                                                    <button className="w-full text-left">
                                                                        {slot.isBooked ? 'Müsait Yap' : 'Dolu İşaretle'}
                                                                    </button>
                                                                </DropdownMenuItem>
                                                            </form>
                                                        )}
                                                        <form action={async () => {
                                                            'use server'
                                                            await deleteAvailableSlot(slot.id)
                                                            revalidatePath('/admin/slotlar')
                                                        }}>
                                                            <DropdownMenuItem asChild className="text-red-400 focus:text-red-400">
                                                                <button className="w-full text-left">
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    Sil
                                                                </button>
                                                            </DropdownMenuItem>
                                                        </form>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
