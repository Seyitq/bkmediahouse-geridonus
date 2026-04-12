import { Suspense } from 'react'
import Link from 'next/link'
import {
    FolderKanban,
    Calendar,
    MessageSquare,
    TrendingUp,
    Clock,
    CheckCircle2,
    AlertCircle,
    ClipboardList,
    CircleDot,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { db } from '@/lib/db'
import { auth } from '@/auth'

// Force dynamic rendering to prevent build-time database calls
export const dynamic = 'force-dynamic'

async function getStats() {
    try {
        const session = await auth()
        const isAdmin = session?.user?.role === 'ADMIN'
        const userId = session?.user?.id

        const taskWhere = isAdmin ? {} : { assignedToId: userId }

        const [
            projectCount,
            bookingCount,
            pendingBookings,
            inquiryCount,
            unreadInquiries,
            totalTasks,
            pendingTasks,
            inProgressTasks,
            completedTasks,
            paidTasks,
        ] = await Promise.all([
            db.project.count(),
            db.booking.count(),
            db.booking.count({ where: { status: 'PENDING' } }),
            db.inquiry.count(),
            db.inquiry.count({ where: { isRead: false } }),
            db.task.count({ where: taskWhere }),
            db.task.count({ where: { ...taskWhere, status: 'PENDING' } }),
            db.task.count({ where: { ...taskWhere, status: 'IN_PROGRESS' } }),
            db.task.count({ where: { ...taskWhere, status: 'COMPLETED' } }),
            db.task.count({ where: { ...taskWhere, status: 'PAID' } }),
        ])

        return {
            projectCount,
            bookingCount,
            pendingBookings,
            inquiryCount,
            unreadInquiries,
            totalTasks,
            pendingTasks,
            inProgressTasks,
            completedTasks,
            paidTasks,
            isAdmin,
        }
    } catch (error) {
        console.error('[AdminDashboard] Stats sorgusu ba\u015Far\u0131s\u0131z:', error)
        return {
            projectCount: 0,
            bookingCount: 0,
            pendingBookings: 0,
            inquiryCount: 0,
            unreadInquiries: 0,
            totalTasks: 0,
            pendingTasks: 0,
            inProgressTasks: 0,
            completedTasks: 0,
            paidTasks: 0,
            isAdmin: false,
        }
    }
}

async function getRecentTasks() {
    try {
        const session = await auth()
        const isAdmin = session?.user?.role === 'ADMIN'

        return db.task.findMany({
            where: isAdmin ? {} : { assignedToId: session?.user?.id },
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: {
                assignedTo: { select: { name: true, title: true } },
                category: true,
            },
        })
    } catch (error) {
        console.error('[AdminDashboard] RecentTasks sorgusu ba\u015Far\u0131s\u0131z:', error)
        return []
    }
}

async function getRecentBookings() {
    try {
        return await db.booking.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
        })
    } catch (error) {
        console.error('[AdminDashboard] RecentBookings sorgusu ba\u015Far\u0131s\u0131z:', error)
        return []
    }
}

async function getRecentInquiries() {
    try {
        return await db.inquiry.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
        })
    } catch (error) {
        console.error('[AdminDashboard] RecentInquiries sorgusu ba\u015Far\u0131s\u0131z:', error)
        return []
    }
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

const taskStatusConfig: Record<string, { label: string; color: string; bg: string }> = {
    PENDING: { label: 'Bekliyor', color: 'text-red-400', bg: 'bg-red-500/10' },
    IN_PROGRESS: { label: 'Devam Ediyor', color: 'text-green-400', bg: 'bg-green-500/10' },
    REVISION: { label: 'Revize', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    COMPLETED: { label: 'Ödeme Bekliyor', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    PAID: { label: 'Ödendi', color: 'text-orange-400', bg: 'bg-orange-500/10' },
}

async function DashboardContent() {
    const stats = await getStats()
    const recentTasks = await getRecentTasks()
    const recentBookings = await getRecentBookings()
    const recentInquiries = await getRecentInquiries()

    return (
        <div className="space-y-6">
            {/* Task Stats */}
            <div className="grid gap-3 grid-cols-2 lg:grid-cols-5">
                <StatCard
                    title="Toplam Görev"
                    value={stats.totalTasks}
                    icon={ClipboardList}
                />
                <Card className="border-zinc-800 bg-zinc-900/50 border-l-4 border-l-red-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Bekliyor</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-400">{stats.pendingTasks}</div>
                    </CardContent>
                </Card>
                <Card className="border-zinc-800 bg-zinc-900/50 border-l-4 border-l-green-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Devam Ediyor</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-400">{stats.inProgressTasks}</div>
                    </CardContent>
                </Card>
                <Card className="border-zinc-800 bg-zinc-900/50 border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Ödeme Bekliyor</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-400">{stats.completedTasks}</div>
                    </CardContent>
                </Card>
                <Card className="border-zinc-800 bg-zinc-900/50 border-l-4 border-l-orange-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Ödendi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-400">{stats.paidTasks}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Other Stats (Admin only) */}
            {stats.isAdmin && (
                <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
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
            )}

            {/* Recent Activity */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                {/* Recent Tasks */}
                <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-white flex items-center gap-2">
                                <ClipboardList className="h-5 w-5" />
                                Son Görevler
                            </CardTitle>
                            <Link href="/admin/gorevler" className="text-xs text-blue-400 hover:text-blue-300">
                                Tümünü gör →
                            </Link>
                        </div>
                        <CardDescription className="text-zinc-500">
                            En son oluşturulan görevler
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {recentTasks.length === 0 ? (
                            <p className="text-sm text-zinc-500 text-center py-4">
                                Henüz görev yok
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {recentTasks.map((task) => {
                                    const statusCfg = taskStatusConfig[task.status] || taskStatusConfig.PENDING
                                    return (
                                        <Link key={task.id} href={`/admin/gorevler/${task.id}`}>
                                            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 last:border-0 last:pb-0 hover:bg-zinc-800/30 -mx-2 px-2 py-1 rounded transition-colors">
                                                <div className="space-y-1 min-w-0 flex-1">
                                                    <p className="text-sm font-medium text-white truncate">
                                                        {task.title}
                                                    </p>
                                                    <p className="text-xs text-zinc-500 flex items-center gap-1">
                                                        {task.assignedTo?.name && (
                                                            <span>{task.assignedTo.name}</span>
                                                        )}
                                                        {task.category && (
                                                            <span className="text-zinc-600">• {task.category.name}</span>
                                                        )}
                                                    </p>
                                                </div>
                                                <Badge variant="outline" className={`${statusCfg.bg} ${statusCfg.color} border-transparent text-xs shrink-0 ml-2`}>
                                                    {statusCfg.label}
                                                </Badge>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Recent Bookings (Admin only) */}
                {stats.isAdmin && (
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
                )}
            </div>
        </div>
    )
}

function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            <div className="grid gap-3 grid-cols-2 lg:grid-cols-5">
                {[...Array(5)].map((_, i) => (
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

export default async function AdminDashboardPage() {
    const session = await auth()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Panel</h1>
                <p className="text-zinc-500">
                    Hoş geldiniz{session?.user?.name ? `, ${session.user.name}` : ''}! İşte genel bakış.
                </p>
            </div>

            <Suspense fallback={<DashboardSkeleton />}>
                <DashboardContent />
            </Suspense>
        </div>
    )
}
