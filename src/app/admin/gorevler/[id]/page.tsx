import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, User, FolderKanban, Tag, DollarSign, Pencil, Trash2 } from 'lucide-react'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TaskStatusButtons } from '@/components/dashboard/task-status-button'
import { TaskNotes } from '@/components/dashboard/task-notes'
import { DeleteTaskButton } from './delete-button'

export const dynamic = 'force-dynamic'

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
    PENDING: { label: 'Bekliyor', color: 'text-red-400', bg: 'bg-red-500/10' },
    IN_PROGRESS: { label: 'Devam Ediyor', color: 'text-green-400', bg: 'bg-green-500/10' },
    REVISION: { label: 'Revize Talep Edildi', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    COMPLETED: { label: 'Ödeme Bekliyor', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    PAID: { label: 'Ödendi', color: 'text-orange-400', bg: 'bg-orange-500/10' },
}

const priorityConfig: Record<string, { label: string; color: string }> = {
    LOW: { label: 'Düşük', color: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20' },
    NORMAL: { label: 'Normal', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    HIGH: { label: 'Yüksek', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
    URGENT: { label: 'Acil', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
}

export default async function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session?.user) redirect('/giris')

    const { id } = await params

    const task = await db.task.findUnique({
        where: { id },
        include: {
            assignedTo: { select: { id: true, name: true, title: true, image: true, email: true } },
            createdBy: { select: { id: true, name: true } },
            category: true,
            notes: {
                include: {
                    author: { select: { id: true, name: true, role: true, image: true } },
                },
                orderBy: { createdAt: 'desc' },
            },
        },
    })

    if (!task) notFound()

    // STAFF can only see their own tasks
    if (session.user.role === 'STAFF' && task.assignedToId !== session.user.id) {
        redirect('/admin/gorevler')
    }

    const status = statusConfig[task.status] || statusConfig.PENDING
    const priority = priorityConfig[task.priority] || priorityConfig.NORMAL
    const isAdmin = session.user.role === 'ADMIN'

    return (
        <div className="space-y-6 max-w-4xl">
            {/* Back Button */}
            <Link href="/admin/gorevler" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-900 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Görevlere Dön
            </Link>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900">{task.title}</h1>
                        <Badge variant="outline" className={`${status.bg} ${status.color} border-transparent`}>
                            {status.label}
                        </Badge>
                        <Badge variant="outline" className={`${priority.color}`}>
                            {priority.label}
                        </Badge>
                    </div>
                    {task.description && (
                        <p className="text-sm text-zinc-400">{task.description}</p>
                    )}
                </div>

                {isAdmin && (
                    <div className="flex items-center gap-2 shrink-0">
                        <Link href={`/admin/gorevler/${task.id}/duzenle`}>
                            <Button size="sm" variant="ghost" className="text-zinc-400 hover:text-zinc-900 gap-1.5">
                                <Pencil className="h-4 w-4" />
                                <span className="hidden sm:inline">Düzenle</span>
                            </Button>
                        </Link>
                        <DeleteTaskButton taskId={task.id} />
                    </div>
                )}
            </div>

            {/* Status Buttons */}
            <Card className="border-zinc-200 bg-white">
                <CardHeader className="pb-3">
                    <CardTitle className="text-white text-base">Durum Değiştir</CardTitle>
                </CardHeader>
                <CardContent>
                    <TaskStatusButtons
                        taskId={task.id}
                        currentStatus={task.status}
                        userRole={session.user.role}
                    />
                </CardContent>
            </Card>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Task Info */}
                <Card className="border-zinc-200 bg-white">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-white text-base">Görev Bilgileri</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {task.assignedTo && (
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center shrink-0">
                                    <User className="h-4 w-4 text-zinc-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-zinc-900">{task.assignedTo.name}</p>
                                    <p className="text-xs text-zinc-500">{task.assignedTo.title || 'Çalışan'}</p>
                                </div>
                            </div>
                        )}

                        {task.projectName && (
                            <div className="flex items-center gap-2 text-sm">
                                <FolderKanban className="h-4 w-4 text-zinc-500 shrink-0" />
                                <span className="text-zinc-700">{task.projectName}</span>
                                {task.projectPart && (
                                    <span className="text-zinc-600">/ {task.projectPart}</span>
                                )}
                            </div>
                        )}

                        {task.clientName && (
                            <div className="flex items-center gap-2 text-sm">
                                <User className="h-4 w-4 text-zinc-500 shrink-0" />
                                <span className="text-zinc-400">Müşteri:</span>
                                <span className="text-zinc-700">{task.clientName}</span>
                            </div>
                        )}

                        {task.category && (
                            <div className="flex items-center gap-2 text-sm">
                                <Tag className="h-4 w-4 text-zinc-500 shrink-0" />
                                <Badge
                                    variant="outline"
                                    className="text-xs border-transparent"
                                    style={{
                                        backgroundColor: `${task.category.color}15`,
                                        color: task.category.color,
                                    }}
                                >
                                    {task.category.name}
                                </Badge>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Dates & Payment */}
                <Card className="border-zinc-200 bg-white">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-white text-base">Tarih & Ödeme</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {task.deadline && (
                            <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-zinc-500 shrink-0" />
                                <span className="text-zinc-400">Son Tarih:</span>
                                <span className={`text-zinc-700 ${new Date(task.deadline) < new Date() && task.status !== 'COMPLETED' && task.status !== 'PAID' ? 'text-red-400' : ''}`}>
                                    {new Date(task.deadline).toLocaleDateString('tr-TR', {
                                        day: 'numeric', month: 'long', year: 'numeric'
                                    })}
                                </span>
                            </div>
                        )}

                        <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-zinc-500 shrink-0" />
                            <span className="text-zinc-400">Oluşturulma:</span>
                            <span className="text-zinc-700">
                                {new Date(task.createdAt).toLocaleDateString('tr-TR', {
                                    day: 'numeric', month: 'long', year: 'numeric',
                                    hour: '2-digit', minute: '2-digit'
                                })}
                            </span>
                        </div>

                        {task.completedAt && (
                            <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-blue-500 shrink-0" />
                                <span className="text-zinc-400">Tamamlanma:</span>
                                <span className="text-zinc-700">
                                    {new Date(task.completedAt).toLocaleDateString('tr-TR', {
                                        day: 'numeric', month: 'long', year: 'numeric',
                                        hour: '2-digit', minute: '2-digit'
                                    })}
                                </span>
                            </div>
                        )}

                        {task.paidAt && (
                            <div className="flex items-center gap-2 text-sm">
                                <DollarSign className="h-4 w-4 text-orange-500 shrink-0" />
                                <span className="text-zinc-400">Ödeme Tarihi:</span>
                                <span className="text-zinc-700">
                                    {new Date(task.paidAt).toLocaleDateString('tr-TR', {
                                        day: 'numeric', month: 'long', year: 'numeric'
                                    })}
                                </span>
                            </div>
                        )}

                        {task.amount && (
                            <div className="flex items-center gap-2 text-sm">
                                <DollarSign className="h-4 w-4 text-emerald-500 shrink-0" />
                                <span className="text-zinc-400">Tutar:</span>
                                <span className="text-emerald-400 font-medium">₺{task.amount.toLocaleString('tr-TR')}</span>
                            </div>
                        )}

                        <div className="text-xs text-zinc-600 pt-2">
                            Oluşturan: {task.createdBy?.name || 'Bilinmeyen'}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Notes */}
            <TaskNotes taskId={task.id} notes={task.notes} />
        </div>
    )
}
