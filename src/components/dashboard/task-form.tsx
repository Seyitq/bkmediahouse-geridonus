'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { createTask, updateTask } from '@/actions/tasks'

interface TaskFormProps {
    employees: { id: string; name: string | null; title: string | null }[]
    categories: { id: string; name: string; color: string }[]
    task?: {
        id: string
        title: string
        description?: string | null
        priority: string
        projectName?: string | null
        clientName?: string | null
        projectPart?: string | null
        deadline?: Date | string | null
        amount?: number | null
        assignedToId?: string | null
        categoryId?: string | null
    }
}

export function TaskForm({ employees, categories, task }: TaskFormProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const isEditing = !!task

    const deadlineValue = task?.deadline
        ? new Date(task.deadline).toISOString().split('T')[0]
        : ''

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        startTransition(async () => {
            const result = isEditing
                ? await updateTask(task!.id, formData)
                : await createTask(formData)

            if (result?.error) {
                toast.error(result.error)
            } else {
                toast.success(isEditing ? 'Görev güncellendi' : 'Görev oluşturuldu')
                router.push('/admin/gorevler')
            }
        })
    }

    return (
        <Card className="border-zinc-200 bg-white">
            <CardHeader>
                <CardTitle className="text-zinc-900">
                    {isEditing ? 'Görevi Düzenle' : 'Yeni Görev Oluştur'}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-zinc-700">Görev Başlığı *</Label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            required
                            defaultValue={task?.title}
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-100 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Görev başlığını girin..."
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-zinc-700">Açıklama</Label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            defaultValue={task?.description || ''}
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-100 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                            placeholder="Görev açıklaması..."
                        />
                    </div>

                    {/* Assigned To & Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="assignedToId" className="text-zinc-700">Atanan Kişi</Label>
                            <select
                                id="assignedToId"
                                name="assignedToId"
                                defaultValue={task?.assignedToId || ''}
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-100 px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="">Seçiniz...</option>
                                {employees.map((emp) => (
                                    <option key={emp.id} value={emp.id}>
                                        {emp.name} {emp.title ? `(${emp.title})` : ''}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="categoryId" className="text-zinc-700">Kategori</Label>
                            <select
                                id="categoryId"
                                name="categoryId"
                                defaultValue={task?.categoryId || ''}
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-100 px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="">Seçiniz...</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Project Name & Client Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="projectName" className="text-zinc-700">Proje Adı</Label>
                            <input
                                id="projectName"
                                name="projectName"
                                type="text"
                                defaultValue={task?.projectName || ''}
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-100 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Proje adı..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="clientName" className="text-zinc-700">Müşteri Adı</Label>
                            <input
                                id="clientName"
                                name="clientName"
                                type="text"
                                defaultValue={task?.clientName || ''}
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-100 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Müşteri adı..."
                            />
                        </div>
                    </div>

                    {/* Project Part */}
                    <div className="space-y-2">
                        <Label htmlFor="projectPart" className="text-zinc-700">Projenin Hangi Kısmı</Label>
                        <input
                            id="projectPart"
                            name="projectPart"
                            type="text"
                            defaultValue={task?.projectPart || ''}
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-100 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Örn: Logo tasarımı, Video montaj..."
                        />
                    </div>

                    {/* Priority, Deadline, Amount */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="priority" className="text-zinc-700">Öncelik</Label>
                            <select
                                id="priority"
                                name="priority"
                                defaultValue={task?.priority || 'NORMAL'}
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-100 px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="LOW">Düşük</option>
                                <option value="NORMAL">Normal</option>
                                <option value="HIGH">Yüksek</option>
                                <option value="URGENT">Acil</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="deadline" className="text-zinc-700">Son Tarih</Label>
                            <input
                                id="deadline"
                                name="deadline"
                                type="date"
                                defaultValue={deadlineValue}
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-100 px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="amount" className="text-zinc-700">Tutar (₺)</Label>
                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                step="0.01"
                                defaultValue={task?.amount || ''}
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-100 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex items-center gap-3 pt-2">
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {isPending ? 'Kaydediliyor...' : (isEditing ? 'Güncelle' : 'Oluştur')}
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => router.back()}
                            className="text-zinc-400 hover:text-zinc-900"
                        >
                            İptal
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
