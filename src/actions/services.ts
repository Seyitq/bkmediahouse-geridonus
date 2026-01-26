'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const serviceSchema = z.object({
    name: z.string().min(1, 'Hizmet adı gerekli'),
    slug: z.string().min(1, 'Slug gerekli'),
    description: z.string().min(1, 'Açıklama gerekli'),
    longDescription: z.string().optional(),
    icon: z.string().min(1, 'Icon gerekli'),
    modelType: z.string().default('cube'),
    modelUrl: z.string().optional().nullable(),
    effectType: z.string().default('flash'),
    color: z.string().default('#3b82f6'),
    features: z.string().optional(),
    order: z.number().default(0),
    isActive: z.boolean().default(true),
})

export async function getServices() {
    return await db.service.findMany({
        orderBy: { order: 'asc' },
    })
}

export async function getActiveServices() {
    return await db.service.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
    })
}

export async function getServiceById(id: string) {
    try {
        const service = await db.service.findUnique({ where: { id } })
        if (!service) {
            return { success: false, error: 'Hizmet bulunamadı' }
        }
        return { success: true, data: service }
    } catch (error) {
        console.error('Get service by id error:', error)
        return { success: false, error: 'Hizmet yüklenirken hata oluştu' }
    }
}

export async function getServiceBySlug(slug: string) {
    try {
        const service = await db.service.findUnique({ where: { slug } })
        if (!service) {
            return { success: false, error: 'Hizmet bulunamadı' }
        }
        return { success: true, data: service }
    } catch (error) {
        console.error('Get service by slug error:', error)
        return { success: false, error: 'Hizmet yüklenirken hata oluştu' }
    }
}

export async function createService(data: z.infer<typeof serviceSchema>) {
    try {
        const parsed = serviceSchema.safeParse(data)
        if (!parsed.success) {
            return { success: false, error: parsed.error.issues[0]?.message }
        }

        // Check if slug already exists
        const existing = await db.service.findUnique({ where: { slug: parsed.data.slug } })
        if (existing) {
            return { success: false, error: 'Bu slug zaten kullanılıyor' }
        }

        await db.service.create({ data: parsed.data })
        revalidatePath('/admin/hizmetler')
        revalidatePath('/hizmetler')
        return { success: true }
    } catch (error) {
        console.error('Create service error:', error)
        return { success: false, error: 'Hizmet eklenirken hata oluştu' }
    }
}

export async function updateService(id: string, data: z.infer<typeof serviceSchema>) {
    try {
        const parsed = serviceSchema.safeParse(data)
        if (!parsed.success) {
            return { success: false, error: parsed.error.issues[0]?.message }
        }

        // Check if slug already exists for another service
        const existing = await db.service.findFirst({
            where: { slug: parsed.data.slug, NOT: { id } }
        })
        if (existing) {
            return { success: false, error: 'Bu slug zaten kullanılıyor' }
        }

        await db.service.update({ where: { id }, data: parsed.data })
        revalidatePath('/admin/hizmetler')
        revalidatePath('/hizmetler')
        return { success: true }
    } catch (error) {
        console.error('Update service error:', error)
        return { success: false, error: 'Hizmet güncellenirken hata oluştu' }
    }
}

export async function deleteService(id: string) {
    try {
        await db.service.delete({ where: { id } })
        revalidatePath('/admin/hizmetler')
        revalidatePath('/hizmetler')
        return { success: true }
    } catch (error) {
        console.error('Delete service error:', error)
        return { success: false, error: 'Hizmet silinirken hata oluştu' }
    }
}

export async function toggleServiceActive(id: string, isActive: boolean) {
    try {
        await db.service.update({ where: { id }, data: { isActive } })
        revalidatePath('/admin/hizmetler')
        revalidatePath('/hizmetler')
        return { success: true }
    } catch (error) {
        console.error('Toggle service error:', error)
        return { success: false, error: 'Durum değiştirilirken hata oluştu' }
    }
}

// Seed default services
export async function seedDefaultServices() {
    const defaultServices = [
        { name: 'Video Prodüksiyon', slug: 'video-produksiyon', description: 'Profesyonel video çekimi ve kurgu hizmetleri', icon: 'Video', modelType: 'cylinder', color: '#ef4444', order: 1 },
        { name: 'Sosyal Medya Yönetimi', slug: 'sosyal-medya-yonetimi', description: 'Sosyal medya stratejisi ve içerik yönetimi', icon: 'Share2', modelType: 'sphere', color: '#3b82f6', order: 2 },
        { name: 'Marka Kimliği', slug: 'marka-kimligi', description: 'Logo tasarımı ve kurumsal kimlik oluşturma', icon: 'Palette', modelType: 'torus', color: '#8b5cf6', order: 3 },
        { name: 'Web Tasarım', slug: 'web-tasarim', description: 'Modern ve responsive web sitesi tasarımı', icon: 'Monitor', modelType: 'box', color: '#10b981', order: 4 },
        { name: 'Fotoğraf Çekimi', slug: 'fotograf-cekimi', description: 'Profesyonel fotoğraf çekimi hizmetleri', icon: 'Camera', modelType: 'octahedron', color: '#f59e0b', order: 5 },
        { name: 'Reklam Kampanyası', slug: 'reklam-kampanyasi', description: 'Dijital reklam kampanyası planlaması ve yönetimi', icon: 'Megaphone', modelType: 'cone', color: '#ec4899', order: 6 },
        { name: 'İçerik Üretimi', slug: 'icerik-uretimi', description: 'Blog yazıları, makaleler ve içerik stratejisi', icon: 'FileText', modelType: 'dodecahedron', color: '#06b6d4', order: 7 },
        { name: 'Etkinlik Yönetimi', slug: 'etkinlik-yonetimi', description: 'Kurumsal etkinlik planlama ve yönetimi', icon: 'Calendar', modelType: 'icosahedron', color: '#84cc16', order: 8 },
    ]

    try {
        for (const service of defaultServices) {
            const exists = await db.service.findUnique({ where: { slug: service.slug } })
            if (!exists) {
                await db.service.create({ data: { ...service, isActive: true } })
            }
        }
        revalidatePath('/admin/hizmetler')
        return { success: true }
    } catch (error) {
        console.error('Seed services error:', error)
        return { success: false, error: 'Varsayılan hizmetler eklenirken hata oluştu' }
    }
}
