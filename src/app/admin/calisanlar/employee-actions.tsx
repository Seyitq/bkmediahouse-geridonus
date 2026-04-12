'use client'

import { useState, useTransition } from 'react'
import { Pencil, Trash2, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { deleteEmployee, updateEmployee } from '@/actions/employees'

interface EmployeeActionsProps {
    employee: {
        id: string
        name: string | null
        email: string
        title: string | null
        phone: string | null
    }
}

export function EmployeeActions({ employee }: EmployeeActionsProps) {
    const [isPending, startTransition] = useTransition()
    const [showEdit, setShowEdit] = useState(false)

    const handleDelete = () => {
        if (!confirm(`${employee.name} adlı çalışanı silmek istediğinize emin misiniz?`)) return

        startTransition(async () => {
            const result = await deleteEmployee(employee.id)
            if (result?.success) {
                toast.success('Çalışan silindi')
            }
        })
    }

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        startTransition(async () => {
            const result = await updateEmployee(employee.id, formData)
            if (result?.error) {
                toast.error(result.error)
            } else {
                toast.success('Çalışan güncellendi')
                setShowEdit(false)
            }
        })
    }

    if (showEdit) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-white">Çalışanı Düzenle</h3>
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs text-zinc-400">İsim</label>
                                <input
                                    name="name"
                                    defaultValue={employee.name || ''}
                                    required
                                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-zinc-400">E-posta</label>
                                <input
                                    name="email"
                                    type="email"
                                    defaultValue={employee.email}
                                    required
                                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs text-zinc-400">Unvan</label>
                                <input
                                    name="title"
                                    defaultValue={employee.title || ''}
                                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-zinc-400">Telefon</label>
                                <input
                                    name="phone"
                                    defaultValue={employee.phone || ''}
                                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-zinc-400">Şifre (boş bırakırsanız değişmez)</label>
                            <input
                                name="password"
                                type="password"
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                        <div className="flex gap-2 justify-end pt-2">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setShowEdit(false)}
                                className="text-zinc-400"
                            >
                                İptal
                            </Button>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                {isPending ? 'Kaydediliyor...' : 'Güncelle'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-1">
            <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowEdit(true)}
                className="h-7 w-7 p-0 text-zinc-500 hover:text-white"
            >
                <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
                size="sm"
                variant="ghost"
                disabled={isPending}
                onClick={handleDelete}
                className="h-7 w-7 p-0 text-zinc-500 hover:text-red-400"
            >
                <Trash2 className="h-3.5 w-3.5" />
            </Button>
        </div>
    )
}
