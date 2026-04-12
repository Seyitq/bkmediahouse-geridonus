'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { updateTaskStatus } from '@/actions/tasks'

interface TaskStatusButtonsProps {
    taskId: string
    currentStatus: string
    userRole: string
}

const allStatuses = [
    { status: 'PENDING', label: 'Bekliyor', color: 'bg-red-500 hover:bg-red-600', dotColor: 'bg-red-500' },
    { status: 'IN_PROGRESS', label: 'Başla', color: 'bg-green-500 hover:bg-green-600', dotColor: 'bg-green-500' },
    { status: 'REVISION', label: 'Revize', color: 'bg-yellow-500 hover:bg-yellow-600', dotColor: 'bg-yellow-500', adminOnly: true },
    { status: 'COMPLETED', label: 'Tamamla', color: 'bg-blue-500 hover:bg-blue-600', dotColor: 'bg-blue-500' },
    { status: 'PAID', label: 'Ödendi', color: 'bg-orange-500 hover:bg-orange-600', dotColor: 'bg-orange-500', adminOnly: true },
]

export function TaskStatusButtons({ taskId, currentStatus, userRole }: TaskStatusButtonsProps) {
    const [isPending, startTransition] = useTransition()
    const isAdmin = userRole === 'ADMIN'
    const isStaff = userRole === 'STAFF'

    // STAFF cannot change status if PAID or REVISION
    const isLockedForStaff = isStaff && (currentStatus === 'PAID' || currentStatus === 'REVISION')

    const handleStatusChange = (newStatus: string) => {
        const formData = new FormData()
        formData.set('taskId', taskId)
        formData.set('status', newStatus)

        startTransition(async () => {
            const result = await updateTaskStatus(formData)
            if (result?.error) {
                toast.error(result.error)
            } else {
                const label = allStatuses.find(s => s.status === newStatus)?.label || newStatus
                toast.success(`Durum güncellendi: ${label}`)
            }
        })
    }

    if (isLockedForStaff) {
        return (
            <div className="text-sm text-zinc-500 flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${currentStatus === 'PAID' ? 'bg-orange-500' : 'bg-yellow-500'} animate-pulse`} />
                {currentStatus === 'PAID'
                    ? 'Ödemesi yapıldı — Durum değiştirilemez'
                    : 'Revize talep edildi — Admin tarafından güncellenir'
                }
            </div>
        )
    }

    return (
        <div className="flex flex-wrap gap-2">
            {allStatuses.map((item) => {
                const isActive = item.status === currentStatus
                const isDisabled = isPending || isActive

                // STAFF can only set IN_PROGRESS or COMPLETED
                if (isStaff && item.adminOnly) return null
                if (isStaff && item.status === 'PENDING') return null

                return (
                    <Button
                        key={item.status}
                        size="sm"
                        disabled={isDisabled}
                        onClick={() => handleStatusChange(item.status)}
                        className={`${isActive
                            ? `${item.color} text-white ring-2 ring-offset-2 ring-offset-zinc-900`
                            : 'bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700'
                            } transition-all text-xs`}
                    >
                        <span className={`h-2 w-2 rounded-full ${item.dotColor} mr-1.5 ${isActive ? 'animate-pulse' : 'opacity-50'}`} />
                        {item.label}
                    </Button>
                )
            })}
        </div>
    )
}
