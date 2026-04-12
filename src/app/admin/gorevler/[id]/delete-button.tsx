'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { deleteTask } from '@/actions/tasks'

export function DeleteTaskButton({ taskId }: { taskId: string }) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleDelete = () => {
        if (!confirm('Bu görevi silmek istediğinize emin misiniz?')) return

        startTransition(async () => {
            const result = await deleteTask(taskId)
            if (result?.success) {
                toast.success('Görev silindi')
                router.push('/admin/gorevler')
            }
        })
    }

    return (
        <Button
            size="sm"
            variant="ghost"
            disabled={isPending}
            onClick={handleDelete}
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-1.5"
        >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Sil</span>
        </Button>
    )
}
