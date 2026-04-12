'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { createEmployee, updateEmployee } from '@/actions/employees'

interface EmployeeFormProps {
    employee?: {
        id: string
        name: string | null
        email: string
        title: string | null
        phone: string | null
    }
    onClose?: () => void
}

export function EmployeeForm({ employee, onClose }: EmployeeFormProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const isEditing = !!employee

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        startTransition(async () => {
            const result = isEditing
                ? await updateEmployee(employee!.id, formData)
                : await createEmployee(formData)

            if (result?.error) {
                toast.error(result.error)
            } else {
                toast.success(isEditing ? 'Çalışan güncellendi' : 'Çalışan eklendi')
                if (onClose) {
                    onClose()
                } else {
                    router.push('/admin/calisanlar')
                }
            }
        })
    }

    return (
        <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
                <CardTitle className="text-white">
                    {isEditing ? 'Çalışanı Düzenle' : 'Yeni Çalışan Ekle'}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-zinc-300">İsim *</Label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                defaultValue={employee?.name || ''}
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Ad Soyad"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-zinc-300">E-posta *</Label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                defaultValue={employee?.email || ''}
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="ornek@email.com"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-zinc-300">Unvan / Pozisyon</Label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                defaultValue={employee?.title || ''}
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Grafik Tasarımcı, Yazılımcı..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-zinc-300">Telefon</Label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                defaultValue={employee?.phone || ''}
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="05XX XXX XX XX"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-zinc-300">
                            Şifre {isEditing ? '(Değiştirmek için doldurun)' : '*'}
                        </Label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required={!isEditing}
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder={isEditing ? 'Boş bırakırsanız değişmez' : 'En az 6 karakter'}
                        />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {isPending ? 'Kaydediliyor...' : (isEditing ? 'Güncelle' : 'Ekle')}
                        </Button>
                        {onClose && (
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={onClose}
                                className="text-zinc-400 hover:text-white"
                            >
                                İptal
                            </Button>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
