import { db } from '@/lib/db'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { TaskForm } from '@/components/dashboard/task-form'

export const dynamic = 'force-dynamic'

export default async function YeniGorevPage() {
    const session = await auth()
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'STAFF')) {
        redirect('/giris')
    }

    const [employees, categories] = await Promise.all([
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

    return (
        <div className="space-y-6 max-w-3xl">
            <div>
                <h1 className="text-2xl font-bold text-white">Yeni Görev</h1>
                <p className="text-zinc-500">Yeni bir görev oluşturun</p>
            </div>

            <TaskForm employees={employees} categories={categories} />
        </div>
    )
}
