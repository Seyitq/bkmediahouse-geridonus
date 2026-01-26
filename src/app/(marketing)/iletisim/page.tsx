'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Loader2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createInquiry } from '@/actions/inquiries'
import {
    SERVICES,
    SERVICE_LABELS,
    BUDGET_RANGES,
    BUDGET_LABELS,
    TIMELINES,
    TIMELINE_LABELS,
} from '@/lib/validations/inquiry'

const steps = [
    { id: 1, title: 'Hizmetler', description: 'Ne tür hizmetlere ihtiyacınız var?' },
    { id: 2, title: 'Bütçe', description: 'Bütçe aralığınızı belirleyin' },
    { id: 3, title: 'İletişim', description: 'Size nasıl ulaşabiliriz?' },
]

export default function ContactPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Form data
    const [selectedServices, setSelectedServices] = useState<string[]>([])
    const [budgetRange, setBudgetRange] = useState<string>('')
    const [timeline, setTimeline] = useState<string>('')
    const [contactInfo, setContactInfo] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
    })

    const toggleService = (service: string) => {
        setSelectedServices(prev =>
            prev.includes(service)
                ? prev.filter(s => s !== service)
                : [...prev, service]
        )
    }

    const canProceed = () => {
        if (currentStep === 1) return selectedServices.length > 0
        if (currentStep === 2) return budgetRange !== ''
        if (currentStep === 3) return contactInfo.name && contactInfo.email && contactInfo.message
        return false
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        setError(null)

        try {
            const result = await createInquiry({
                services: selectedServices as any,
                budgetRange: budgetRange as any,
                timeline: timeline as any || undefined,
                name: contactInfo.name,
                email: contactInfo.email,
                phone: contactInfo.phone || undefined,
                company: contactInfo.company || undefined,
                message: contactInfo.message,
            })

            if (!result.success) {
                setError(result.error || 'Bir hata oluştu')
                return
            }

            setIsSuccess(true)
        } catch {
            setError('Beklenmeyen bir hata oluştu')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-black pt-32 pb-24 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md mx-auto px-4"
                >
                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-8">
                        <Check className="w-10 h-10 text-green-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4">Talebiniz Alındı!</h1>
                    <p className="text-zinc-400 mb-8">
                        En kısa sürede sizinle iletişime geçeceğiz. Teşekkür ederiz!
                    </p>
                    <Button onClick={() => router.push('/')} className="bg-white text-black hover:bg-zinc-200">
                        Ana Sayfaya Dön
                    </Button>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black pt-32 pb-24">
            <div className="container px-4 mx-auto max-w-3xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">
                        İletişime Geçin
                    </h1>
                    <p className="text-lg text-zinc-400">
                        Projenizi anlatın, size özel bir teklif hazırlayalım.
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-12">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex items-center flex-1">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${currentStep >= step.id
                                ? 'bg-white border-white text-black'
                                : 'border-zinc-700 text-zinc-500'
                                }`}>
                                {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                            </div>
                            {index < steps.length - 1 && (
                                <div className={`flex-1 h-0.5 mx-4 transition-colors ${currentStep > step.id ? 'bg-white' : 'bg-zinc-800'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardContent className="p-8">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400"
                            >
                                {error}
                            </motion.div>
                        )}

                        <AnimatePresence mode="wait">
                            {/* Step 1: Services */}
                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-2">{steps[0].title}</h2>
                                        <p className="text-zinc-400">{steps[0].description}</p>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {SERVICES.map((service) => (
                                            <Badge
                                                key={service}
                                                variant="outline"
                                                className={`py-3 px-4 text-center cursor-pointer transition-all ${selectedServices.includes(service)
                                                    ? 'bg-white text-black border-white'
                                                    : 'text-zinc-400 border-zinc-700 hover:border-zinc-500'
                                                    }`}
                                                onClick={() => toggleService(service)}
                                            >
                                                {SERVICE_LABELS[service]}
                                            </Badge>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 2: Budget */}
                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-2">{steps[1].title}</h2>
                                        <p className="text-zinc-400">{steps[1].description}</p>
                                    </div>

                                    <div className="space-y-4">
                                        <Label className="text-zinc-300">Bütçe Aralığı</Label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {BUDGET_RANGES.map((range) => (
                                                <Badge
                                                    key={range}
                                                    variant="outline"
                                                    className={`py-4 px-6 text-center cursor-pointer transition-all ${budgetRange === range
                                                        ? 'bg-white text-black border-white'
                                                        : 'text-zinc-400 border-zinc-700 hover:border-zinc-500'
                                                        }`}
                                                    onClick={() => setBudgetRange(range)}
                                                >
                                                    {BUDGET_LABELS[range]}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <Label className="text-zinc-300">Zaman Çizelgesi (İsteğe bağlı)</Label>
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                            {TIMELINES.map((t) => (
                                                <Badge
                                                    key={t}
                                                    variant="outline"
                                                    className={`py-3 px-4 text-center cursor-pointer transition-all ${timeline === t
                                                        ? 'bg-white text-black border-white'
                                                        : 'text-zinc-400 border-zinc-700 hover:border-zinc-500'
                                                        }`}
                                                    onClick={() => setTimeline(timeline === t ? '' : t)}
                                                >
                                                    {TIMELINE_LABELS[t]}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 3: Contact */}
                            {currentStep === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-2">{steps[2].title}</h2>
                                        <p className="text-zinc-400">{steps[2].description}</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-zinc-300">Ad Soyad *</Label>
                                            <Input
                                                id="name"
                                                value={contactInfo.name}
                                                onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                                                className="bg-zinc-800/50 border-zinc-700 text-white"
                                                placeholder="İsminiz"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-zinc-300">E-posta *</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={contactInfo.email}
                                                onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                                                className="bg-zinc-800/50 border-zinc-700 text-white"
                                                placeholder="ornek@email.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-zinc-300">Telefon</Label>
                                            <Input
                                                id="phone"
                                                value={contactInfo.phone}
                                                onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                                                className="bg-zinc-800/50 border-zinc-700 text-white"
                                                placeholder="+90 5XX XXX XX XX"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="company" className="text-zinc-300">Şirket</Label>
                                            <Input
                                                id="company"
                                                value={contactInfo.company}
                                                onChange={(e) => setContactInfo(prev => ({ ...prev, company: e.target.value }))}
                                                className="bg-zinc-800/50 border-zinc-700 text-white"
                                                placeholder="Şirket adı"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message" className="text-zinc-300">Mesajınız *</Label>
                                        <Textarea
                                            id="message"
                                            rows={4}
                                            value={contactInfo.message}
                                            onChange={(e) => setContactInfo(prev => ({ ...prev, message: e.target.value }))}
                                            className="bg-zinc-800/50 border-zinc-700 text-white resize-none"
                                            placeholder="Projeniz hakkında bize bilgi verin..."
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="flex justify-between mt-8 pt-6 border-t border-zinc-800">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentStep(prev => prev - 1)}
                                disabled={currentStep === 1}
                                className="border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Geri
                            </Button>

                            {currentStep < 3 ? (
                                <Button
                                    onClick={() => setCurrentStep(prev => prev + 1)}
                                    disabled={!canProceed()}
                                    className="bg-white text-black hover:bg-zinc-200"
                                >
                                    İleri
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!canProceed() || isSubmitting}
                                    className="bg-white text-black hover:bg-zinc-200"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Gönderiliyor...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            Gönder
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
