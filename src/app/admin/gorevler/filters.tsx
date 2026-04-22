'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'

interface TaskFiltersProps {
    employees: { id: string; name: string | null; title: string | null }[]
    categories: { id: string; name: string; color: string }[]
}

const statuses = [
    { value: '', label: 'Tümü' },
    { value: 'PENDING', label: 'Bekliyor', color: 'bg-red-500' },
    { value: 'IN_PROGRESS', label: 'Devam Ediyor', color: 'bg-green-500' },
    { value: 'REVISION', label: 'Revize', color: 'bg-yellow-500' },
    { value: 'COMPLETED', label: 'Ödeme Bekliyor', color: 'bg-blue-500' },
    { value: 'PAID', label: 'Ödendi', color: 'bg-orange-500' },
]

export function TaskFilters({ employees, categories }: TaskFiltersProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentStatus = searchParams.get('status') || ''
    const currentAssignee = searchParams.get('assignedToId') || ''
    const currentCategory = searchParams.get('categoryId') || ''

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value) {
            params.set(key, value)
        } else {
            params.delete(key)
        }
        router.push(`/admin/gorevler?${params.toString()}`)
    }

    return (
        <div className="space-y-3">
            {/* Status Filter Pills */}
            <div className="flex flex-wrap gap-2">
                {statuses.map((s) => (
                    <button
                        key={s.value}
                        onClick={() => updateFilter('status', s.value)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${currentStatus === s.value
                            ? 'bg-zinc-700 text-white ring-1 ring-zinc-600'
                            : 'bg-zinc-100/50 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900'
                            }`}
                    >
                        {s.color && <span className={`h-2 w-2 rounded-full ${s.color}`} />}
                        {s.label}
                    </button>
                ))}
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-wrap gap-3">
                {employees.length > 0 && (
                    <select
                        value={currentAssignee}
                        onChange={(e) => updateFilter('assignedToId', e.target.value)}
                        className="rounded-lg border border-zinc-700 bg-zinc-100 px-3 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                    >
                        <option value="">Tüm Çalışanlar</option>
                        {employees.map((emp) => (
                            <option key={emp.id} value={emp.id}>
                                {emp.name} {emp.title ? `(${emp.title})` : ''}
                            </option>
                        ))}
                    </select>
                )}
                {categories.length > 0 && (
                    <select
                        value={currentCategory}
                        onChange={(e) => updateFilter('categoryId', e.target.value)}
                        className="rounded-lg border border-zinc-700 bg-zinc-100 px-3 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                    >
                        <option value="">Tüm Kategoriler</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>
        </div>
    )
}
