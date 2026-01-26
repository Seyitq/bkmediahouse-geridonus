'use server'

import { db } from '@/lib/db'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

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

const siteSettingSchema = z.object({
    key: z.string(),
    value: z.string(),
})

export async function updateProfile(data: z.infer<typeof profileSchema>) {
    try {
        const session = await auth()
        if (!session?.user?.id) return { success: false, error: 'Oturum bulunamadı' }

        const parsed = profileSchema.safeParse(data)
        if (!parsed.success) {
            return { success: false, error: parsed.error.issues[0].message }
        }

        await db.user.update({
            where: { id: session.user.id },
            data: {
                name: parsed.data.name,
                email: parsed.data.email,
            },
        })

        revalidatePath('/admin/ayarlar')
        return { success: true }
    } catch (error) {
        return { success: false, error: 'Profil güncellenirken bir hata oluştu' }
    }
}

export async function changePassword(data: z.infer<typeof passwordSchema>) {
    try {
        const session = await auth()
        if (!session?.user?.id) return { success: false, error: 'Oturum bulunamadı' }

        const parsed = passwordSchema.safeParse(data)
        if (!parsed.success) {
            return { success: false, error: parsed.error.issues[0].message }
        }

        const { currentPassword, newPassword } = parsed.data
        const user = await db.user.findUnique({ where: { id: session.user.id } })

        if (!user) return { success: false, error: 'Kullanıcı bulunamadı' }

        const isValid = await bcrypt.compare(currentPassword, user.password)
        if (!isValid) return { success: false, error: 'Mevcut şifre hatalı' }

        const hashedPassword = await bcrypt.hash(newPassword, 12)
        await db.user.update({
            where: { id: session.user.id },
            data: { password: hashedPassword },
        })

        revalidatePath('/admin/ayarlar')
        return { success: true }
    } catch (error) {
        return { success: false, error: 'Şifre değiştirilirken bir hata oluştu' }
    }
}

export async function updateSiteSetting(key: string, value: string) {
    try {
        await db.siteSetting.upsert({
            where: { key },
            create: { key, value },
            update: { value },
        })
        revalidatePath('/admin/ayarlar')
        return { success: true }
    } catch (error) {
        return { success: false, error: 'Ayarlar güncellenirken bir hata oluştu' }
    }
}
