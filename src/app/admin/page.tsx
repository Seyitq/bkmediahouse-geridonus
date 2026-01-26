import { Suspense } from 'react'
import {
    FolderKanban,
    Calendar,
    MessageSquare,
    TrendingUp,
    Clock,
    CheckCircle2,
    AlertCircle,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { db } from '@/lib/db'

// Force dynamic rendering to prevent build-time database calls
export const dynamic = 'force-dynamic'

async function getStats() {
    const [
        projectCount,
        bookingCount,
        pendingBookings,
        inquiryCount,
        unreadInquiries,
    ] = await Promise.all([
        db.project.count(),
        db.booking.count(),
        db.booking.count({ where: { status: 'PENDING' } }),
        db.inquiry.count(),
        db.inquiry.count({ where: { isRead: false } }),
    ])

    return {
        projectCount,
        bookingCount,
        pendingBookings,
        inquiryCount,
        unreadInquiries,
    }
}

async function getRecentBookings() {
    return db.booking.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
    })
}

async function getRecentInquiries() {
    return db.inquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
    })
}

function StatCard({
    title,
    value,
    description,
    icon: Icon,
    trend,
}: {
    title: string
    value: number | string
    description?: string
    icon: React.ComponentType<{ className?: string }>
    trend?: 'up' | 'down' | 'neutral'
}) {
    return (
        <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-zinc-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-white">{value}</div>
                {description && (
                    <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                        {trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500" />}
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}

function StatusBadge({ status }: { status: string }) {
    const styles = {
        PENDING: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        CONFIRMED: 'bg-green-500/10 text-green-500 border-green-500/20',
        REJECTED: 'bg-red-500/10 text-red-500 border-red-500/20',
        CANCELLED: 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20',
    }[status] || 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'

    const labels = {
        PENDING: 'Beklemede',
        CONFIRMED: 'Onaylandı',
        REJECTED: 'Reddedildi',
        CANCELLED: 'İptal',
    }[status] || status

    return (
        <Badge variant="outline" className={styles}>
            {labels}
        </Badge>
    )
}

async function DashboardContent() {
    const stats = await getStats()
    const recentBookings = await getRecentBookings()
    const recentInquiries = await getRecentInquiries()

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Toplam Proje"
                    value={stats.projectCount}
                    icon={FolderKanban}
                />
                <StatCard
                    title="Randevular"
                    value={stats.bookingCount}
                    description={`${stats.pendingBookings} beklemede`}
                    icon={Calendar}
                />
                <StatCard
                    title="Talepler"
                    value={stats.inquiryCount}
                    description={`${stats.unreadInquiries} okunmamış`}
                    icon={MessageSquare}
                />
                <StatCard
                    title="Bekleyen İşlem"
                    value={stats.pendingBookings + stats.unreadInquiries}
                    icon={AlertCircle}
                />
            </div>

            {/* Recent Activity */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Recent Bookings */}
                <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Son Randevular
                        </CardTitle>
                        <CardDescription className="text-zinc-500">
                            En son oluşturulan randevular
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {recentBookings.length === 0 ? (
                            <p className="text-sm text-zinc-500 text-center py-4">
                                Henüz randevu yok
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {recentBookings.map((booking) => (
                                    <div
                                        key={booking.id}
                                        className="flex items-center justify-between border-b border-zinc-800 pb-3 last:border-0 last:pb-0"
                                    >
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-white">
                                                {booking.clientName}
                                            </p>
                                            <p className="text-xs text-zinc-500 flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {new Date(booking.startTime).toLocaleDateString('tr-TR', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                        </div>
                                        <StatusBadge status={booking.status} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Recent Inquiries */}
                <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <MessageSquare className="h-5 w-5" />
                            Son Talepler
                        </CardTitle>
                        <CardDescription className="text-zinc-500">
                            En son gelen iletişim talepleri
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {recentInquiries.length === 0 ? (
                            <p className="text-sm text-zinc-500 text-center py-4">
                                Henüz talep yok
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {recentInquiries.map((inquiry) => (
                                    <div
                                        key={inquiry.id}
                                        className="flex items-center justify-between border-b border-zinc-800 pb-3 last:border-0 last:pb-0"
                                    >
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-white flex items-center gap-2">
                                                {inquiry.name}
                                                {!inquiry.isRead && (
                                                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                                                )}
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                                {inquiry.email}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {inquiry.isRead ? (
                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                                                    Yeni
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="border-zinc-800 bg-zinc-900/50">
                        <CardHeader className="pb-2">
                            <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
                        </CardHeader>
                        <CardContent>
                            <div className="h-8 w-16 bg-zinc-800 rounded animate-pulse" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default function AdminDashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Panel</h1>
                <p className="text-zinc-500">Hoş geldiniz! İşte genel bakış.</p>
            </div>

            <Suspense fallback={<DashboardSkeleton />}>
                <DashboardContent />
            </Suspense>
        </div>
    )
}
