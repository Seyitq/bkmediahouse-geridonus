import { Suspense } from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Briefcase, Pencil, Trash2 } from 'lucide-react'
import { EmployeeForm } from '@/components/dashboard/employee-form'
import { EmployeeActions } from './employee-actions'

export const dynamic = 'force-dynamic'

async function EmployeeList() {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
        redirect('/admin')
    }

    const employees = await db.user.findMany({
        where: { role: 'STAFF' },
        include: {
            _count: {
                select: { assignedTasks: true },
            },
            assignedTasks: {
                where: { status: { not: 'PAID' } },
                select: { status: true },
            },
        },
        orderBy: { createdAt: 'desc' },
    })

    return (
        <div className="space-y-6">
            {/* Add Employee Form */}
            <EmployeeForm />

            {/* Employee List */}
            <div className="space-y-3">
                <h2 className="text-lg font-semibold text-zinc-900">Mevcut Çalışanlar ({employees.length})</h2>

                {employees.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-zinc-500">Henüz çalışan eklenmemiş</p>
                    </div>
                ) : (
                    <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                        {employees.map((emp) => {
                            const activeTasks = emp.assignedTasks.length
                            const pendingCount = emp.assignedTasks.filter(t => t.status === 'PENDING').length
                            const inProgressCount = emp.assignedTasks.filter(t => t.status === 'IN_PROGRESS').length
                            const completedCount = emp.assignedTasks.filter(t => t.status === 'COMPLETED').length

                            return (
                                <Card key={emp.id} className="border-zinc-200 bg-white hover:bg-zinc-50/80 transition-colors">
                                    <CardContent className="p-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
                                                <User className="h-5 w-5 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div>
                                                        <h3 className="text-sm font-semibold text-zinc-900">{emp.name}</h3>
                                                        {emp.title && (
                                                            <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                                                                <Briefcase className="h-3 w-3" />
                                                                {emp.title}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <EmployeeActions employee={emp} />
                                                </div>
                                                <p className="text-xs text-zinc-500 mt-1">{emp.email}</p>
                                                {emp.phone && (
                                                    <p className="text-xs text-zinc-500">{emp.phone}</p>
                                                )}

                                                {/* Task Stats */}
                                                <div className="flex items-center gap-2 mt-2 flex-wrap">
                                                    <Badge variant="outline" className="text-xs bg-zinc-100 text-zinc-400 border-zinc-700">
                                                        {emp._count.assignedTasks} görev
                                                    </Badge>
                                                    {pendingCount > 0 && (
                                                        <Badge variant="outline" className="text-xs bg-red-500/10 text-red-400 border-transparent">
                                                            {pendingCount} bekliyor
                                                        </Badge>
                                                    )}
                                                    {inProgressCount > 0 && (
                                                        <Badge variant="outline" className="text-xs bg-green-500/10 text-green-400 border-transparent">
                                                            {inProgressCount} devam
                                                        </Badge>
                                                    )}
                                                    {completedCount > 0 && (
                                                        <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-transparent">
                                                            {completedCount} ödeme bekliyor
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

function EmployeeSkeleton() {
    return (
        <div className="space-y-6">
            <div className="h-64 rounded-lg bg-zinc-100/50 animate-pulse" />
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-32 rounded-lg bg-zinc-100/50 animate-pulse" />
                ))}
            </div>
        </div>
    )
}

export default function CalisanlarPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-zinc-900">Çalışanlar</h1>
                <p className="text-zinc-500">Çalışanları yönetin ve görev atayın</p>
            </div>

            <Suspense fallback={<EmployeeSkeleton />}>
                <EmployeeList />
            </Suspense>
        </div>
    )
}
