import { notFound, redirect } from 'next/navigation'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { TaskForm } from '@/components/dashboard/task-form'

export const dynamic = 'force-dynamic'

export default async function EditTaskPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
        redirect('/admin/gorevler')
    }

    const { id } = await params

    const [task, employees, categories] = await Promise.all([
        db.task.findUnique({ where: { id } }),
        db.user.findMany({
            where: { role: 'STAFF' },
            select: { id: true, name: true, title: true },
            orderBy: { name: 'asc' },
        }),
        db.taskCategory.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' },
        }),
    ])

    if (!task) notFound()

    return (
        <div className="space-y-6 max-w-3xl">
            <div>
                <h1 className="text-2xl font-bold text-white">Görevi Düzenle</h1>
                <p className="text-zinc-500">{task.title}</p>
            </div>

            <TaskForm
                employees={employees}
                categories={categories}
                task={task}
            />
        </div>
    )
}
