import { Suspense } from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CategoryActions } from './category-actions'

export const dynamic = 'force-dynamic'

async function CategoryList() {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
        redirect('/admin')
    }

    const categories = await db.taskCategory.findMany({
        orderBy: { order: 'asc' },
        include: {
            _count: { select: { tasks: true } },
        },
    })

    return (
        <div className="space-y-6">
            {/* Add Category Form */}
            <CategoryActions categories={categories} />
        </div>
    )
}

function CategorySkeleton() {
    return (
        <div className="space-y-4">
            <div className="h-24 rounded-lg bg-zinc-800/50 animate-pulse" />
            {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 rounded-lg bg-zinc-800/50 animate-pulse" />
            ))}
        </div>
    )
}

export default function KategorilerPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Görev Kategorileri</h1>
                <p className="text-zinc-500">Görev kategorilerini yönetin</p>
            </div>

            <Suspense fallback={<CategorySkeleton />}>
                <CategoryList />
            </Suspense>
        </div>
    )
}
