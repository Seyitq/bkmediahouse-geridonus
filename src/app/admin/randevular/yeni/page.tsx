'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import {
    ArrowLeft,
    Save,
    Loader2,
    Calendar,
    Clock,
    User,
    Mail,
    Phone,
    FileText,
} from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createBooking } from '@/actions/bookings'
import { createBookingSchema } from '@/lib/validations/booking'
import { z } from 'zod'

// Define schema manually to avoid Zod refinement extension issues
const formSchema = z.object({
    clientName: z.string().min(2, 'Müşteri adı en az 2 karakter olmalı'),
    clientEmail: z.string().email('Geçerli bir e-posta adresi girin'),
    clientPhone: z.string().optional().refine((val) => !val || /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(val), {
        message: 'Geçerli bir telefon numarası girin',
    }),
    startTime: z.string().min(1, 'Başlangıç zamanı gerekli'),
    endTime: z.string().min(1, 'Bitiş zamanı gerekli'),
    notes: z.string().optional(),
}).refine((data) => {
    const start = new Date(data.startTime)
    const end = new Date(data.endTime)
    return end > start
}, {
    message: 'Bitiş zamanı başlangıç zamanından sonra olmalı',
    path: ['endTime'],
})

type BookingFormData = z.infer<typeof formSchema>

export default function NewBookingPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BookingFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            clientName: '',
            clientEmail: '',
            clientPhone: '',
            notes: '',
        },
    })

    const onSubmit = async (data: BookingFormData) => {
        setIsLoading(true)
        setError(null)

        try {
            const result = await createBooking({
                ...data,
                startTime: new Date(data.startTime),
                endTime: new Date(data.endTime),
            })

            if (!result.success) {
                setError(result.error || 'Randevu oluşturulamadı')
                return
            }

            router.push('/admin/randevular')
            router.refresh()
        } catch {
            setError('Bir hata oluştu')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/randevular">
                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">Yeni Randevu</h1>
                    <p className="text-zinc-500">Manuel olarak yeni bir randevu oluşturun</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    <Card className="border-zinc-800 bg-zinc-900/50">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Tarih ve Saat
                            </CardTitle>
                            <CardDescription className="text-zinc-500">
                                Randevu zamanını belirleyin
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="startTime" className="text-zinc-300">Başlangıç Zamanı</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                        <Input
                                            id="startTime"
                                            type="datetime-local"
                                            className="pl-10 bg-zinc-800/50 border-zinc-700 text-white [color-scheme:dark]"
                                            {...register('startTime')}
                                        />
                                    </div>
                                    {errors.startTime && (
                                        <p className="text-sm text-red-400">{errors.startTime.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="endTime" className="text-zinc-300">Bitiş Zamanı</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                        <Input
                                            id="endTime"
                                            type="datetime-local"
                                            className="pl-10 bg-zinc-800/50 border-zinc-700 text-white [color-scheme:dark]"
                                            {...register('endTime')}
                                        />
                                    </div>
                                    {errors.endTime && (
                                        <p className="text-sm text-red-400">{errors.endTime.message}</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Client Details */}
                    <Card className="border-zinc-800 bg-zinc-900/50">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Müşteri Bilgileri
                            </CardTitle>
                            <CardDescription className="text-zinc-500">
                                Müşteri iletişim detayları
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="clientName" className="text-zinc-300">Müşteri Adı</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                    <Input
                                        id="clientName"
                                        placeholder="Ad Soyad"
                                        className="pl-10 bg-zinc-800/50 border-zinc-700 text-white"
                                        {...register('clientName')}
                                    />
                                </div>
                                {errors.clientName && (
                                    <p className="text-sm text-red-400">{errors.clientName.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="clientEmail" className="text-zinc-300">E-posta</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                    <Input
                                        id="clientEmail"
                                        type="email"
                                        placeholder="ornek@email.com"
                                        className="pl-10 bg-zinc-800/50 border-zinc-700 text-white"
                                        {...register('clientEmail')}
                                    />
                                </div>
                                {errors.clientEmail && (
                                    <p className="text-sm text-red-400">{errors.clientEmail.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="clientPhone" className="text-zinc-300">Telefon (İsteğe bağlı)</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                    <Input
                                        id="clientPhone"
                                        placeholder="+90 5XX XXX XX XX"
                                        className="pl-10 bg-zinc-800/50 border-zinc-700 text-white"
                                        {...register('clientPhone')}
                                    />
                                </div>
                                {errors.clientPhone && (
                                    <p className="text-sm text-red-400">{errors.clientPhone.message}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notes */}
                    <Card className="border-zinc-800 bg-zinc-900/50 lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Notlar
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                rows={4}
                                placeholder="Randevu hakkında notlar (isteğe bağlı)"
                                className="bg-zinc-800/50 border-zinc-700 text-white resize-none"
                                {...register('notes')}
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-white text-zinc-900 hover:bg-zinc-200 min-w-[150px]"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Oluşturuluyor...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Randevu Oluştur
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}
