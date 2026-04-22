'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, Loader2, Calendar, Clock, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createAvailableSlot } from '@/actions/slots'

export default function NewSlotPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        date: '',
        startTime: '',
        endTime: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const startDateTime = new Date(`${formData.date}T${formData.startTime}`)
            const endDateTime = new Date(`${formData.date}T${formData.endTime}`)

            const result = await createAvailableSlot({
                startTime: startDateTime,
                endTime: endDateTime,
            })

            if (!result.success) {
                setError(result.error || 'Slot oluşturulamadı')
                return
            }

            router.push('/admin/slotlar')
            router.refresh()
        } catch {
            setError('Bir hata oluştu')
        } finally {
            setIsLoading(false)
        }
    }

    // Quick add functions
    const addQuickSlot = (hours: number) => {
        const now = new Date()
        now.setHours(now.getHours() + 1, 0, 0, 0) // Round to next hour

        const start = now.toTimeString().slice(0, 5)
        const endDate = new Date(now.getTime() + hours * 60 * 60 * 1000)
        const end = endDate.toTimeString().slice(0, 5)

        setFormData({
            date: now.toISOString().split('T')[0],
            startTime: start,
            endTime: end,
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/slotlar">
                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-900">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Yeni Zaman Dilimi</h1>
                    <p className="text-zinc-500">Randevu için uygun bir zaman dilimi ekleyin</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400"
                    >
                        {error}
                    </motion.div>
                )}

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Date & Time */}
                    <Card className="border-zinc-200 bg-white">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Tarih ve Saat
                            </CardTitle>
                            <CardDescription className="text-zinc-500">
                                Uygun zaman dilimini belirleyin
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="date" className="text-zinc-700">Tarih</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                                    className="bg-zinc-100/50 border-zinc-700 text-white [color-scheme:dark]"
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="startTime" className="text-zinc-700">Başlangıç Saati</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                        <Input
                                            id="startTime"
                                            type="time"
                                            required
                                            value={formData.startTime}
                                            onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                                            className="pl-10 bg-zinc-100/50 border-zinc-700 text-white [color-scheme:dark]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="endTime" className="text-zinc-700">Bitiş Saati</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                        <Input
                                            id="endTime"
                                            type="time"
                                            required
                                            value={formData.endTime}
                                            onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                                            className="pl-10 bg-zinc-100/50 border-zinc-700 text-white [color-scheme:dark]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Add */}
                    <Card className="border-zinc-200 bg-white">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Plus className="h-5 w-5" />
                                Hızlı Ekle
                            </CardTitle>
                            <CardDescription className="text-zinc-500">
                                Yaygın süreleri hızlıca ekleyin
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-zinc-400">
                                Aşağıdaki butonlarla bir sonraki saatten başlayan slotları hızlıca ekleyin:
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => addQuickSlot(0.5)}
                                    className="border-zinc-700 text-zinc-700 hover:bg-zinc-100"
                                >
                                    30 Dakika
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => addQuickSlot(1)}
                                    className="border-zinc-700 text-zinc-700 hover:bg-zinc-100"
                                >
                                    1 Saat
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => addQuickSlot(1.5)}
                                    className="border-zinc-700 text-zinc-700 hover:bg-zinc-100"
                                >
                                    1.5 Saat
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => addQuickSlot(2)}
                                    className="border-zinc-700 text-zinc-700 hover:bg-zinc-100"
                                >
                                    2 Saat
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={isLoading || !formData.date || !formData.startTime || !formData.endTime}
                        className="bg-zinc-50 text-white hover:bg-zinc-100 min-w-[150px]"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Oluşturuluyor...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Slot Oluştur
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}
