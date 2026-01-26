import Link from 'next/link'
import { Plus, Calendar, Clock, User, Mail, Phone, MoreHorizontal, Check, X } from 'lucide-react'
import { db } from '@/lib/db'

// Force dynamic rendering to prevent build-time database calls
export const dynamic = 'force-dynamic'

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
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { revalidatePath } from 'next/cache'

async function getBookings() {
    return db.booking.findMany({
        orderBy: { startTime: 'desc' },
        include: { createdBy: true },
    })
}

async function updateBookingStatus(id: string, status: string) {
    'use server'
    await db.booking.update({
        where: { id },
        data: { status },
    })
    revalidatePath('/admin/randevular')
}

async function deleteBooking(id: string) {
    'use server'
    await db.booking.delete({ where: { id } })
    revalidatePath('/admin/randevular')
}

const statusLabels: Record<string, string> = {
    PENDING: 'Beklemede',
    CONFIRMED: 'Onaylandı',
    REJECTED: 'Reddedildi',
    CANCELLED: 'İptal Edildi',
}

const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    CONFIRMED: 'bg-green-500/10 text-green-500 border-green-500/20',
    REJECTED: 'bg-red-500/10 text-red-400 border-red-500/20',
    CANCELLED: 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20',
}

function BookingActions({ booking }: { booking: { id: string; status: string } }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                {booking.status === 'PENDING' && (
                    <>
                        <form action={async () => {
                            'use server'
                            await updateBookingStatus(booking.id, 'CONFIRMED')
                        }}>
                            <DropdownMenuItem asChild className="cursor-pointer text-green-400 focus:bg-zinc-800 focus:text-green-400">
                                <button type="submit" className="w-full flex items-center">
                                    <Check className="mr-2 h-4 w-4" />
                                    Onayla
                                </button>
                            </DropdownMenuItem>
                        </form>
                        <form action={async () => {
                            'use server'
                            await updateBookingStatus(booking.id, 'REJECTED')
                        }}>
                            <DropdownMenuItem asChild className="cursor-pointer text-red-400 focus:bg-zinc-800 focus:text-red-400">
                                <button type="submit" className="w-full flex items-center">
                                    <X className="mr-2 h-4 w-4" />
                                    Reddet
                                </button>
                            </DropdownMenuItem>
                        </form>
                        <DropdownMenuSeparator className="bg-zinc-800" />
                    </>
                )}
                {booking.status === 'CONFIRMED' && (
                    <>
                        <form action={async () => {
                            'use server'
                            await updateBookingStatus(booking.id, 'CANCELLED')
                        }}>
                            <DropdownMenuItem asChild className="cursor-pointer text-zinc-400 focus:bg-zinc-800 focus:text-white">
                                <button type="submit" className="w-full flex items-center">
                                    <X className="mr-2 h-4 w-4" />
                                    İptal Et
                                </button>
                            </DropdownMenuItem>
                        </form>
                        <DropdownMenuSeparator className="bg-zinc-800" />
                    </>
                )}
                <form action={async () => {
                    'use server'
                    await deleteBooking(booking.id)
                }}>
                    <DropdownMenuItem asChild className="cursor-pointer text-red-400 focus:bg-zinc-800 focus:text-red-400">
                        <button type="submit" className="w-full flex items-center">
                            <X className="mr-2 h-4 w-4" />
                            Sil
                        </button>
                    </DropdownMenuItem>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default async function BookingsPage() {
    const bookings = await getBookings()

    const stats = {
        total: bookings.length,
        pending: bookings.filter(b => b.status === 'PENDING').length,
        confirmed: bookings.filter(b => b.status === 'CONFIRMED').length,
        today: bookings.filter(b => {
            const today = new Date()
            const bookingDate = new Date(b.startTime)
            return bookingDate.toDateString() === today.toDateString()
        }).length,
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Randevular</h1>
                    <p className="text-zinc-500">Randevu taleplerini yönetin</p>
                </div>
                <Link href="/admin/randevular/yeni">
                    <Button className="bg-white text-zinc-900 hover:bg-zinc-200">
                        <Plus className="mr-2 h-4 w-4" />
                        Yeni Randevu
                    </Button>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Toplam</CardTitle>
                        <Calendar className="h-4 w-4 text-zinc-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Beklemede</CardTitle>
                        <Clock className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-500">{stats.pending}</div>
                    </CardContent>
                </Card>
                <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Onaylanan</CardTitle>
                        <Check className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-500">{stats.confirmed}</div>
                    </CardContent>
                </Card>
                <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Bugün</CardTitle>
                        <Calendar className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-500">{stats.today}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Bookings Table */}
            <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                    <CardTitle className="text-white">Tüm Randevular</CardTitle>
                    <CardDescription className="text-zinc-500">
                        Toplam {bookings.length} randevu
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {bookings.length === 0 ? (
                        <div className="text-center py-12">
                            <Calendar className="h-12 w-12 mx-auto text-zinc-700 mb-4" />
                            <p className="text-zinc-500 mb-4">Henüz randevu yok</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="border-zinc-800 hover:bg-transparent">
                                    <TableHead className="text-zinc-400">Müşteri</TableHead>
                                    <TableHead className="text-zinc-400">Tarih & Saat</TableHead>
                                    <TableHead className="text-zinc-400">İletişim</TableHead>
                                    <TableHead className="text-zinc-400">Durum</TableHead>
                                    <TableHead className="text-zinc-400 w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bookings.map((booking) => (
                                    <TableRow key={booking.id} className="border-zinc-800 hover:bg-zinc-800/50">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-zinc-800 flex items-center justify-center">
                                                    <User className="h-4 w-4 text-zinc-400" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-white">{booking.clientName}</div>
                                                    {booking.notes && (
                                                        <div className="text-xs text-zinc-500 truncate max-w-[200px]">{booking.notes}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-white">
                                                {new Date(booking.startTime).toLocaleDateString('tr-TR', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </div>
                                            <div className="text-xs text-zinc-500">
                                                {new Date(booking.startTime).toLocaleTimeString('tr-TR', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })} - {new Date(booking.endTime).toLocaleTimeString('tr-TR', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1 text-sm text-zinc-300">
                                                    <Mail className="h-3 w-3" />
                                                    {booking.clientEmail}
                                                </div>
                                                {booking.clientPhone && (
                                                    <div className="flex items-center gap-1 text-sm text-zinc-500">
                                                        <Phone className="h-3 w-3" />
                                                        {booking.clientPhone}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={statusColors[booking.status] || statusColors.PENDING}>
                                                {statusLabels[booking.status] || booking.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <BookingActions booking={booking} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
