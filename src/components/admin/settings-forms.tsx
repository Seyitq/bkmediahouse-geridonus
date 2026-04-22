'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save, Lock, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { z } from 'zod'
import { updateProfile, changePassword, updateSiteSetting } from '@/actions/settings'
import { motion } from 'framer-motion'

const profileSchema = z.object({
    name: z.string().min(1, 'Ad Soyad gerekli'),
    email: z.string().email('Geçerli bir e-posta girin'),
})

const passwordSchema = z.object({
    currentPassword: z.string().min(1, 'Mevcut şifre gerekli'),
    newPassword: z.string().min(6, 'Yeni şifre en az 6 karakter olmalı'),
    confirmPassword: z.string().min(1, 'Şifre tekrarı gerekli'),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Yeni şifreler eşleşmiyor',
    path: ['confirmPassword'],
})

export function ProfileForm({ user }: { user: { name: string | null; email: string } }) {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user.name || '',
            email: user.email,
        },
    })

    const onSubmit = async (data: z.infer<typeof profileSchema>) => {
        setIsLoading(true)
        setMessage(null)
        try {
            const result = await updateProfile(data)
            if (result.success) {
                setMessage({ type: 'success', text: 'Profil güncellendi' })
            } else {
                setMessage({ type: 'error', text: result.error || 'Hata oluştu' })
            }
        } catch {
            setMessage({ type: 'error', text: 'Bir hata oluştu' })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {message && (
                <div className={`p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-400'}`}>
                    {message.text}
                </div>
            )}
            <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-700">Ad Soyad</Label>
                <Input
                    id="name"
                    className="bg-zinc-100/50 border-zinc-700 text-white"
                    {...register('name')}
                />
                {errors.name && <p className="text-sm text-red-400">{errors.name?.message}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-700">E-posta</Label>
                <Input
                    id="email"
                    type="email"
                    className="bg-zinc-100/50 border-zinc-700 text-white"
                    {...register('email')}
                />
                {errors.email && <p className="text-sm text-red-400">{errors.email?.message}</p>}
            </div>
            <Button type="submit" disabled={isLoading} className="bg-zinc-50 text-white hover:bg-zinc-100">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Kaydet
            </Button>
        </form>
    )
}

export function PasswordForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    })

    const onSubmit = async (data: z.infer<typeof passwordSchema>) => {
        setIsLoading(true)
        setMessage(null)
        try {
            const result = await changePassword(data)
            if (result.success) {
                setMessage({ type: 'success', text: 'Şifre güncellendi' })
                reset()
            } else {
                setMessage({ type: 'error', text: result.error || 'Hata oluştu' })
            }
        } catch {
            setMessage({ type: 'error', text: 'Bir hata oluştu' })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {message && (
                <div className={`p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-400'}`}>
                    {message.text}
                </div>
            )}
            <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-zinc-700">Mevcut Şifre</Label>
                <Input
                    id="currentPassword"
                    type="password"
                    className="bg-zinc-100/50 border-zinc-700 text-white"
                    {...register('currentPassword')}
                />
                {errors.currentPassword && <p className="text-sm text-red-400">{errors.currentPassword?.message}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-zinc-700">Yeni Şifre</Label>
                <Input
                    id="newPassword"
                    type="password"
                    className="bg-zinc-100/50 border-zinc-700 text-white"
                    {...register('newPassword')}
                />
                {errors.newPassword && <p className="text-sm text-red-400">{errors.newPassword?.message}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-zinc-700">Yeni Şifre (Tekrar)</Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    className="bg-zinc-100/50 border-zinc-700 text-white"
                    {...register('confirmPassword')}
                />
                {errors.confirmPassword && <p className="text-sm text-red-400">{errors.confirmPassword?.message}</p>}
            </div>
            <Button type="submit" disabled={isLoading} className="bg-zinc-50 text-white hover:bg-zinc-100">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
                Şifreyi Güncelle
            </Button>
        </form>
    )
}

export function SiteSettingForm({ settingKey, label, initialValue, placeholder }: { settingKey: string; label: string; initialValue: string; placeholder?: string }) {
    const [isLoading, setIsLoading] = useState(false)
    const [value, setValue] = useState(initialValue)
    const [isSaved, setIsSaved] = useState(false)

    const handleSave = async () => {
        setIsLoading(true)
        setIsSaved(false)
        try {
            await updateSiteSetting(settingKey, value)
            setIsSaved(true)
            setTimeout(() => setIsSaved(false), 2000)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-2">
            <Label className="text-zinc-700">{label}</Label>
            <div className="flex gap-2">
                <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    className="bg-zinc-100/50 border-zinc-700 text-white"
                />
                <Button
                    onClick={handleSave}
                    disabled={isLoading || value === initialValue && !isSaved}
                    size="icon"
                    className={`transition-colors ${isSaved ? 'bg-green-600 hover:bg-green-700' : 'bg-zinc-100 hover:bg-zinc-700'}`}
                >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (isSaved ? <Save className="h-4 w-4" /> : <Save className="h-4 w-4" />)}
                </Button>
            </div>
        </div>
    )
}
