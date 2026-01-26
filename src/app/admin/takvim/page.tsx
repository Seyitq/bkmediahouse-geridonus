import { db } from '@/lib/db'

// Force dynamic rendering to prevent build-time database calls
export const dynamic = 'force-dynamic'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns'
import { tr } from 'date-fns/locale'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Calendar, Clock, User, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

async function getBookingsAndSlots(month: Date) {
    const start = startOfMonth(month)
    const end = endOfMonth(month)

    const [bookings, slots] = await Promise.all([
        db.booking.findMany({
            where: {
                startTime: { gte: start, lte: end },
            },
            orderBy: { startTime: 'asc' },
        }),
        db.availableSlot.findMany({
            where: {
                startTime: { gte: start, lte: end },
            },
            orderBy: { startTime: 'asc' },
        }),
    ])

    return { bookings, slots }
}

interface CalendarPageProps {
    searchParams: Promise<{ month?: string }>
}

export default async function CalendarPage({ searchParams }: CalendarPageProps) {
    const params = await searchParams
    const currentMonth = params.month ? new Date(params.month) : new Date()
    const { bookings, slots } = await getBookingsAndSlots(currentMonth)

    const days = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
    })

    // Get first day of week offset (Monday = 0)
    const firstDayOfMonth = startOfMonth(currentMonth)
    const startOffset = (firstDayOfMonth.getDay() + 6) % 7

    const prevMonth = format(subMonths(currentMonth, 1), 'yyyy-MM')
    const nextMonth = format(addMonths(currentMonth, 1), 'yyyy-MM')

    const getEventsForDay = (day: Date) => {
        const dayBookings = bookings.filter(b => isSameDay(new Date(b.startTime), day))
        const daySlots = slots.filter(s => isSameDay(new Date(s.startTime), day))
        return { bookings: dayBookings, slots: daySlots }
    }

    // Upcoming events for sidebar
    const upcomingBookings = bookings
        .filter(b => new Date(b.startTime) >= new Date())
        .slice(0, 5)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Takvim</h1>
                    <p className="text-zinc-500">Randevular ve uygun zamanların takvim görünümü</p>
                </div>
                <div className="flex items-center gap-2">
                    <Link href="/admin/slotlar/yeni">
                        <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                            <Plus className="mr-2 h-4 w-4" />
                            Yeni Slot
                        </Button>
                    </Link>
                    <Link href="/admin/randevular/yeni">
                        <Button className="bg-white text-zinc-900 hover:bg-zinc-200">
                            <Plus className="mr-2 h-4 w-4" />
                            Yeni Randevu
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-4">
                {/* Calendar */}
                <Card className="lg:col-span-3 border-zinc-800 bg-zinc-900/50">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-white flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            {format(currentMonth, 'MMMM yyyy', { locale: tr })}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            <Link href={`/admin/takvim?month=${prevMonth}`}>
                                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                                    <ChevronLeft className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href={`/admin/takvim?month=${format(new Date(), 'yyyy-MM')}`}>
                                <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                                    Bugün
                                </Button>
                            </Link>
                            <Link href={`/admin/takvim?month=${nextMonth}`}>
                                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                                    <ChevronRight className="h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {/* Day Headers */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(day => (
                                <div key={day} className="text-center text-sm font-medium text-zinc-500 py-2">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1">
                            {/* Empty cells for offset */}
                            {Array.from({ length: startOffset }).map((_, i) => (
                                <div key={`empty-${i}`} className="aspect-square bg-zinc-900/30 rounded-lg" />
                            ))}

                            {/* Day cells */}
                            {days.map(day => {
                                const { bookings: dayBookings, slots: daySlots } = getEventsForDay(day)
                                const isToday = isSameDay(day, new Date())
                                const hasEvents = dayBookings.length > 0 || daySlots.length > 0

                                return (
                                    <div
                                        key={day.toISOString()}
                                        className={`aspect-square rounded-lg p-1 ${isToday
                                            ? 'bg-white/10 border border-white/20'
                                            : 'bg-zinc-900/50 hover:bg-zinc-800/50'
                                            }`}
                                    >
                                        <div className={`text-sm font-medium mb-1 ${isToday ? 'text-white' : 'text-zinc-400'}`}>
                                            {format(day, 'd')}
                                        </div>
                                        <div className="space-y-0.5 overflow-hidden">
                                            {daySlots.slice(0, 2).map(slot => (
                                                <div
                                                    key={slot.id}
                                                    className={`text-xs truncate px-1 py-0.5 rounded ${slot.isBooked
                                                        ? 'bg-red-500/20 text-red-400'
                                                        : 'bg-green-500/20 text-green-400'
                                                        }`}
                                                >
                                                    {format(new Date(slot.startTime), 'HH:mm')}
                                                </div>
                                            ))}
                                            {dayBookings.slice(0, 1).map(booking => (
                                                <div
                                                    key={booking.id}
                                                    className="text-xs truncate px-1 py-0.5 rounded bg-blue-500/20 text-blue-400"
                                                >
                                                    {booking.clientName}
                                                </div>
                                            ))}
                                            {(daySlots.length + dayBookings.length) > 3 && (
                                                <div className="text-xs text-zinc-500">
                                                    +{daySlots.length + dayBookings.length - 3}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Legend */}
                        <div className="flex items-center gap-6 mt-6 pt-4 border-t border-zinc-800">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded bg-green-500/40" />
                                <span className="text-sm text-zinc-400">Müsait Slot</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded bg-red-500/40" />
                                <span className="text-sm text-zinc-400">Dolu Slot</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded bg-blue-500/40" />
                                <span className="text-sm text-zinc-400">Randevu</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Sidebar - Upcoming */}
                <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader>
                        <CardTitle className="text-white text-base flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Yaklaşan Randevular
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {upcomingBookings.length === 0 ? (
                            <p className="text-sm text-zinc-500 text-center py-4">Yaklaşan randevu yok</p>
                        ) : (
                            upcomingBookings.map(booking => (
                                <div key={booking.id} className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                                    <div className="flex items-center gap-2 mb-2">
                                        <User className="h-3 w-3 text-zinc-500" />
                                        <span className="text-sm font-medium text-white">{booking.clientName}</span>
                                    </div>
                                    <div className="text-xs text-zinc-400">
                                        {format(new Date(booking.startTime), 'd MMM, HH:mm', { locale: tr })}
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className={`mt-2 text-xs ${booking.status === 'CONFIRMED'
                                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                            : booking.status === 'PENDING'
                                                ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                                            }`}
                                    >
                                        {booking.status === 'CONFIRMED' ? 'Onaylı' : booking.status === 'PENDING' ? 'Beklemede' : booking.status}
                                    </Badge>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
