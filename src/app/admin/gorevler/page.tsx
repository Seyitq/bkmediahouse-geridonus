import { Suspense } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { TaskCard } from '@/components/dashboard/task-card'
import { TaskFilters } from './filters'

export const dynamic = 'force-dynamic'

async function getTasksData(searchParams: Promise<Record<string, string | string[] | undefined>>) {
    const session = await auth()
    if (!session?.user) return { tasks: [], employees: [], categories: [] }

    const params = await searchParams
    const where: Record<string, unknown> = {}

    if (session.user.role === 'STAFF') {
        where.assignedToId = session.user.id
    }

    if (params.status) where.status = params.status as string
    if (params.priority) where.priority = params.priority as string
    if (params.assignedToId && session.user.role === 'ADMIN') where.assignedToId = params.assignedToId as string
    if (params.categoryId) where.categoryId = params.categoryId as string

    const [tasks, employees, categories] = await Promise.all([
        db.task.findMany({
            where,
            include: {
                assignedTo: { select: { id: true, name: true, title: true, image: true } },
                createdBy: { select: { id: true, name: true } },
                category: true,
                _count: { select: { notes: true } },
            },
            orderBy: [{ createdAt: 'desc' }],
        }),
        session.user.role === 'ADMIN'
            ? db.user.findMany({ where: { role: 'STAFF' }, select: { id: true, name: true, title: true } })
            : [],
        db.taskCategory.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
    ])

    return { tasks, employees, categories }
}

async function TaskList({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
    const { tasks, employees, categories } = await getTasksData(searchParams)
    const session = await auth()

    return (
        <div className="space-y-4">
            {/* Filters */}
            {session?.user.role === 'ADMIN' && (
                <TaskFilters employees={employees} categories={categories} />
            )}

            {/* Task Count */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-500">{tasks.length} görev</p>
            </div>

            {/* Tasks Grid */}
            {tasks.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-zinc-500">Henüz görev yok</p>
                    <Link href="/admin/gorevler/yeni">
                        <Button variant="ghost" className="mt-2 text-blue-400 hover:text-blue-300">
                            İlk görevi oluştur →
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid gap-3">
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            )}
        </div>
    )
}

function TaskListSkeleton() {
    return (
        <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="h-24 rounded-lg bg-zinc-100/50 animate-pulse" />
            ))}
        </div>
    )
}

export default function GorevlerPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Görevler</h1>
                    <p className="text-zinc-500">Tüm görevleri yönetin ve takip edin</p>
                </div>
                <Link href="/admin/gorevler/yeni">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                        <Plus className="h-4 w-4" />
                        <span className="hidden sm:inline">Yeni Görev</span>
                    </Button>
                </Link>
            </div>

            <Suspense fallback={<TaskListSkeleton />}>
                <TaskList searchParams={searchParams} />
            </Suspense>
        </div>
    )
}
