'use client'

import { useState, useTransition } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { createCategory, updateCategory, deleteCategory } from '@/actions/task-categories'

interface Category {
    id: string
    name: string
    color: string
    isActive: boolean
    _count: { tasks: number }
}

interface CategoryActionsProps {
    categories: Category[]
}

const presetColors = [
    '#3b82f6', '#8b5cf6', '#ec4899', '#ef4444',
    '#f97316', '#eab308', '#22c55e', '#06b6d4',
]

export function CategoryActions({ categories }: CategoryActionsProps) {
    const [isPending, startTransition] = useTransition()
    const [editingId, setEditingId] = useState<string | null>(null)
    const [newName, setNewName] = useState('')
    const [newColor, setNewColor] = useState('#3b82f6')

    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        formData.set('name', newName)
        formData.set('color', newColor)

        startTransition(async () => {
            const result = await createCategory(formData)
            if (result?.error) {
                toast.error(result.error)
            } else {
                toast.success('Kategori oluşturuldu')
                setNewName('')
                setNewColor('#3b82f6')
            }
        })
    }

    const handleUpdate = (id: string, name: string, color: string) => {
        const formData = new FormData()
        formData.set('name', name)
        formData.set('color', color)
        formData.set('isActive', 'true')

        startTransition(async () => {
            const result = await updateCategory(id, formData)
            if (result?.error) {
                toast.error(result.error)
            } else {
                toast.success('Kategori güncellendi')
                setEditingId(null)
            }
        })
    }

    const handleDelete = (id: string, name: string) => {
        if (!confirm(`"${name}" kategorisini silmek istediğinize emin misiniz?`)) return

        startTransition(async () => {
            const result = await deleteCategory(id)
            if (result?.success) {
                toast.success('Kategori silindi')
            }
        })
    }

    return (
        <div className="space-y-6">
            {/* Add Category */}
            <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                    <CardTitle className="text-white text-base">Yeni Kategori Ekle</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCreate} className="flex flex-col sm:flex-row items-end gap-3">
                        <div className="flex-1 w-full space-y-1">
                            <label className="text-xs text-zinc-400">Kategori Adı</label>
                            <input
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                required
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none"
                                placeholder="Sosyal Medya Tasarımı..."
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-zinc-400">Renk</label>
                            <div className="flex items-center gap-1.5">
                                {presetColors.map((c) => (
                                    <button
                                        key={c}
                                        type="button"
                                        onClick={() => setNewColor(c)}
                                        className={`h-7 w-7 rounded-full transition-all ${newColor === c ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900 scale-110' : 'hover:scale-105'}`}
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                            </div>
                        </div>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5 w-full sm:w-auto"
                        >
                            <Plus className="h-4 w-4" />
                            Ekle
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Category List */}
            <div className="space-y-2">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900/80 transition-colors"
                    >
                        <div
                            className="h-4 w-4 rounded-full shrink-0"
                            style={{ backgroundColor: cat.color }}
                        />
                        <span className="text-sm font-medium text-white flex-1">{cat.name}</span>
                        <Badge variant="outline" className="bg-zinc-800 text-zinc-400 border-zinc-700 text-xs">
                            {cat._count.tasks} görev
                        </Badge>
                        <div className="flex items-center gap-1">
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                    const newName = prompt('Yeni kategori adı:', cat.name)
                                    if (newName && newName !== cat.name) {
                                        handleUpdate(cat.id, newName, cat.color)
                                    }
                                }}
                                className="h-7 w-7 p-0 text-zinc-500 hover:text-white"
                            >
                                <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                disabled={isPending}
                                onClick={() => handleDelete(cat.id, cat.name)}
                                className="h-7 w-7 p-0 text-zinc-500 hover:text-red-400"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    </div>
                ))}

                {categories.length === 0 && (
                    <p className="text-sm text-zinc-500 text-center py-8">
                        Henüz kategori eklenmemiş
                    </p>
                )}
            </div>
        </div>
    )
}
