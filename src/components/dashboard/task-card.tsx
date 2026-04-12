'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, User, FolderKanban, MessageSquare, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

interface TaskCardProps {
    task: {
        id: string
        title: string
        description?: string | null
        status: string
        priority: string
        projectName?: string | null
        clientName?: string | null
        projectPart?: string | null
        deadline?: Date | string | null
        amount?: number | null
        assignedTo?: { id: string; name: string | null; title: string | null; image: string | null } | null
        category?: { id: string; name: string; color: string } | null
        _count?: { notes: number }
        createdAt: Date | string
    }
}

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
    PENDING: {
        label: 'Bekliyor',
        color: 'text-red-400',
        bg: 'bg-red-500/10',
        border: 'border-l-red-500',
    },
    IN_PROGRESS: {
        label: 'Devam Ediyor',
        color: 'text-green-400',
        bg: 'bg-green-500/10',
        border: 'border-l-green-500',
    },
    REVISION: {
        label: 'Revize',
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/10',
        border: 'border-l-yellow-500',
    },
    COMPLETED: {
        label: 'Ödeme Bekliyor',
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-l-blue-500',
    },
    PAID: {
        label: 'Ödendi',
        color: 'text-orange-400',
        bg: 'bg-orange-500/10',
        border: 'border-l-orange-500',
    },
}

const priorityConfig: Record<string, { label: string; color: string }> = {
    LOW: { label: 'Düşük', color: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20' },
    NORMAL: { label: 'Normal', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    HIGH: { label: 'Yüksek', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
    URGENT: { label: 'Acil', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
}

export function TaskCard({ task }: TaskCardProps) {
    const status = statusConfig[task.status] || statusConfig.PENDING
    const priority = priorityConfig[task.priority] || priorityConfig.NORMAL
    const deadline = task.deadline ? new Date(task.deadline) : null
    const isOverdue = deadline && deadline < new Date() && task.status !== 'COMPLETED' && task.status !== 'PAID'

    return (
        <Link href={`/admin/gorevler/${task.id}`}>
            <Card className={`border-zinc-800 bg-zinc-900/50 border-l-4 ${status.border} hover:bg-zinc-900/80 transition-all duration-200 cursor-pointer group`}>
                <CardContent className="p-4">
                    <div className="flex flex-col gap-3">
                        {/* Header Row */}
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
                                    {task.title}
                                </h3>
                                {task.description && (
                                    <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                                        {task.description}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <Badge variant="outline" className={`${status.bg} ${status.color} border-transparent text-xs`}>
                                    {status.label}
                                </Badge>
                            </div>
                        </div>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500">
                            {task.assignedTo && (
                                <span className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    <span className="text-zinc-400">{task.assignedTo.name}</span>
                                    {task.assignedTo.title && (
                                        <span className="text-zinc-600">({task.assignedTo.title})</span>
                                    )}
                                </span>
                            )}
                            {task.projectName && (
                                <span className="flex items-center gap-1">
                                    <FolderKanban className="h-3 w-3" />
                                    {task.projectName}
                                    {task.projectPart && <span className="text-zinc-600">/ {task.projectPart}</span>}
                                </span>
                            )}
                            {deadline && (
                                <span className={`flex items-center gap-1 ${isOverdue ? 'text-red-400' : ''}`}>
                                    {isOverdue ? <AlertTriangle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                                    {deadline.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                                </span>
                            )}
                            {(task._count?.notes ?? 0) > 0 && (
                                <span className="flex items-center gap-1">
                                    <MessageSquare className="h-3 w-3" />
                                    {task._count?.notes}
                                </span>
                            )}
                        </div>

                        {/* Bottom Row: Priority + Category + Amount */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className={`${priority.color} text-xs`}>
                                {priority.label}
                            </Badge>
                            {task.category && (
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
                            )}
                            {task.clientName && (
                                <span className="text-xs text-zinc-600 ml-auto">
                                    {task.clientName}
                                </span>
                            )}
                            {task.amount && (
                                <span className="text-xs font-medium text-emerald-400">
                                    ₺{task.amount.toLocaleString('tr-TR')}
                                </span>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
