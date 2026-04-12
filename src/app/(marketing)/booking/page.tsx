'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Calendar, Clock, User, Mail, Phone, FileText, Check, Loader2, ArrowRight, CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AddToCalendar } from '@/components/ui/add-to-calendar'
import { createPublicBookingRequest } from '@/actions/bookings'

interface AvailableSlot {
    id: string
    startTime: Date
    endTime: Date
    isBooked: boolean
}

export default function BookingPage() {
    const router = useRouter()
    const [slots, setSlots] = useState<AvailableSlot[]>([])
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
    const [bookedSlot, setBookedSlot] = useState<AvailableSlot | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        notes: '',
    })

    // Fetch available slots
    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const res = await fetch('/api/slots')
                if (res.ok) {
                    const data = await res.json()
                    setSlots(data.slots || [])
                }
            } catch {
                console.error('Failed to fetch slots')
            }
        }
        fetchSlots()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedSlot) return

        setIsLoading(true)
        setError(null)

        // Save the selected slot before submission
        const slot = slots.find(s => s.id === selectedSlot)
        if (slot) {
            setBookedSlot(slot)
        }

        try {
            const result = await createPublicBookingRequest({
                slotId: selectedSlot,
                ...formData,
            })

            if (!result.success) {
                setError(result.error || 'Randevu oluşturulamadı')
                return
            }

            setIsSuccess(true)
        } catch {
            setError('Beklenmeyen bir hata oluştu')
        } finally {
            setIsLoading(false)
        }
    }

    if (isSuccess && bookedSlot) {
        return (
            <div className="min-h-screen bg-white pt-32 pb-24 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md mx-auto px-4"
                >
                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-8">
                        <Check className="w-10 h-10 text-green-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-zinc-900 mb-4">Randevu Talebiniz Alındı!</h1>
                    <p className="text-zinc-500 mb-4">
                        Talebinizi inceleyip en kısa sürede sizinle iletişime geçeceğiz.
                    </p>

                    {/* Booking details */}
                    <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 mb-8">
                        <div className="flex items-center justify-center gap-3 text-zinc-900 mb-2">
                            <CalendarDays className="h-5 w-5 text-blue-400" />
                            <span className="font-medium">
                                {format(new Date(bookedSlot.startTime), 'd MMMM yyyy', { locale: tr })}
                            </span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-zinc-500">
                            <Clock className="h-4 w-4" />
                            <span>
                                {format(new Date(bookedSlot.startTime), 'HH:mm')} - {format(new Date(bookedSlot.endTime), 'HH:mm')}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <AddToCalendar
                            title="New Social Agency - Randevu"
                            description={`Randevu: ${formData.clientName}\nE-posta: ${formData.clientEmail}${formData.notes ? `\nNotlar: ${formData.notes}` : ''}`}
                            startTime={new Date(bookedSlot.startTime)}
                            endTime={new Date(bookedSlot.endTime)}
                            location="New Social Agency, Ankara"
                        />
                        <Button onClick={() => router.push('/')} className="bg-zinc-900 text-white hover:bg-zinc-800">
                            Ana Sayfaya Dön
                        </Button>
                    </div>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white pt-32 pb-24">
            <div className="container px-4 mx-auto max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tighter mb-4">
                        Randevu Oluştur
                    </h1>
                    <p className="text-lg text-zinc-500">
                        Uygun bir zaman seçin ve sizinle iletişime geçelim.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400"
                        >
                            {error}
                        </motion.div>
                    )}

                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Available Slots */}
                        <Card className="border-zinc-200 bg-white shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-zinc-900 flex items-center gap-2">
                                    <CalendarDays className="h-5 w-5" />
                                    Uygun Zamanlar
                                </CardTitle>
                                <CardDescription className="text-zinc-500">
                                    Size uygun bir zaman dilimi seçin
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {slots.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Calendar className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
                                        <p className="text-zinc-500">
                                            Şu anda uygun randevu bulunamadı.
                                        </p>
                                        <p className="text-zinc-600 text-sm mt-2">
                                            Lütfen daha sonra tekrar kontrol edin veya doğrudan iletişime geçin.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                                        {slots.filter(s => !s.isBooked).map((slot) => (
                                            <div
                                                key={slot.id}
                                                onClick={() => setSelectedSlot(slot.id)}
                                                className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedSlot === slot.id
                                                    ? 'bg-blue-50 border-blue-500 text-zinc-900'
                                                    : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-zinc-300'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <Calendar className="h-4 w-4 text-zinc-500" />
                                                        <span className="font-medium">
                                                            {format(new Date(slot.startTime), 'd MMMM yyyy', { locale: tr })}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4 text-zinc-500" />
                                                        <span>
                                                            {format(new Date(slot.startTime), 'HH:mm')} - {format(new Date(slot.endTime), 'HH:mm')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Contact Form */}
                        <Card className="border-zinc-200 bg-white shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-zinc-900 flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    İletişim Bilgileri
                                </CardTitle>
                                <CardDescription className="text-zinc-500">
                                    Size nasıl ulaşabileceğimizi belirtin
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="clientName" className="text-zinc-700">Ad Soyad *</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                        <Input
                                            id="clientName"
                                            required
                                            value={formData.clientName}
                                            onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                                            className="pl-10 bg-zinc-50 border-zinc-300 text-zinc-900"
                                            placeholder="İsminiz"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="clientEmail" className="text-zinc-700">E-posta *</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                        <Input
                                            id="clientEmail"
                                            type="email"
                                            required
                                            value={formData.clientEmail}
                                            onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                                            className="pl-10 bg-zinc-50 border-zinc-300 text-zinc-900"
                                            placeholder="ornek@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="clientPhone" className="text-zinc-700">Telefon</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                        <Input
                                            id="clientPhone"
                                            value={formData.clientPhone}
                                            onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                                            className="pl-10 bg-zinc-50 border-zinc-300 text-zinc-900"
                                            placeholder="+90 5XX XXX XX XX"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="notes" className="text-zinc-700">Notlar</Label>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                                        <Textarea
                                            id="notes"
                                            rows={3}
                                            value={formData.notes}
                                            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                                            className="pl-10 bg-zinc-50 border-zinc-300 text-zinc-900 resize-none"
                                            placeholder="Randevu hakkında notlarınız..."
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={!selectedSlot || !formData.clientName || !formData.clientEmail || isLoading}
                                    className="w-full bg-zinc-900 text-white hover:bg-zinc-800 h-12 text-base"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Gönderiliyor...
                                        </>
                                    ) : (
                                        <>
                                            Randevu Talep Et
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </Button>

                                {!selectedSlot && (
                                    <p className="text-sm text-zinc-500 text-center">
                                        Devam etmek için bir zaman dilimi seçin
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </div>
        </div>
    )
}
