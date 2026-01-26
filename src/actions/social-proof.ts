'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// ============================================
// TRUSTED COMPANIES
// ============================================

const companySchema = z.object({
    name: z.string().min(1, 'Firma adı gerekli'),
    logoUrl: z.string().min(1, 'Logo URL gerekli'),
    websiteUrl: z.string().optional(),
    order: z.number().default(0),
    isActive: z.boolean().default(true),
})

export async function getTrustedCompanies() {
    return await db.trustedCompany.findMany({
        orderBy: { order: 'asc' },
    })
}

export async function getActiveTrustedCompanies() {
    return await db.trustedCompany.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
    })
}

export async function getTrustedCompanyById(id: string) {
    try {
        const company = await db.trustedCompany.findUnique({ where: { id } })
        if (!company) {
            return { success: false, error: 'Firma bulunamadı' }
        }
        return { success: true, data: company }
    } catch (error) {
        console.error('Get company by id error:', error)
        return { success: false, error: 'Firma yüklenirken hata oluştu' }
    }
}

export async function createTrustedCompany(data: z.infer<typeof companySchema>) {
    try {
        const parsed = companySchema.safeParse(data)
        if (!parsed.success) {
            return { success: false, error: parsed.error.issues[0]?.message }
        }

        await db.trustedCompany.create({ data: parsed.data })
        revalidatePath('/admin/firmalar')
        return { success: true }
    } catch (error) {
        console.error('Create company error:', error)
        return { success: false, error: 'Firma eklenirken hata oluştu' }
    }
}

export async function updateTrustedCompany(id: string, data: z.infer<typeof companySchema>) {
    try {
        const parsed = companySchema.safeParse(data)
        if (!parsed.success) {
            return { success: false, error: parsed.error.issues[0]?.message }
        }

        await db.trustedCompany.update({ where: { id }, data: parsed.data })
        revalidatePath('/admin/firmalar')
        return { success: true }
    } catch (error) {
        console.error('Update company error:', error)
        return { success: false, error: 'Firma güncellenirken hata oluştu' }
    }
}

export async function deleteTrustedCompany(id: string) {
    try {
        await db.trustedCompany.delete({ where: { id } })
        revalidatePath('/admin/firmalar')
        return { success: true }
    } catch (error) {
        console.error('Delete company error:', error)
        return { success: false, error: 'Firma silinirken hata oluştu' }
    }
}

export async function toggleCompanyActive(id: string, isActive: boolean) {
    try {
        await db.trustedCompany.update({ where: { id }, data: { isActive } })
        revalidatePath('/admin/firmalar')
        return { success: true }
    } catch (error) {
        console.error('Toggle company error:', error)
        return { success: false, error: 'Durum değiştirilirken hata oluştu' }
    }
}

// ============================================
// TESTIMONIALS
// ============================================

const testimonialSchema = z.object({
    name: z.string().min(1, 'İsim gerekli'),
    title: z.string().min(1, 'Unvan gerekli'),
    company: z.string().optional(),
    content: z.string().min(10, 'Yorum en az 10 karakter olmalı'),
    photoUrl: z.string().optional(),
    rating: z.number().min(1).max(5).default(5),
    order: z.number().default(0),
    isActive: z.boolean().default(true),
})

export async function getTestimonials() {
    return await db.testimonial.findMany({
        orderBy: { order: 'asc' },
    })
}

export async function getActiveTestimonials() {
    return await db.testimonial.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
    })
}

export async function getTestimonialById(id: string) {
    try {
        const testimonial = await db.testimonial.findUnique({ where: { id } })
        if (!testimonial) {
            return { success: false, error: 'Yorum bulunamadı' }
        }
        return { success: true, data: testimonial }
    } catch (error) {
        console.error('Get testimonial by id error:', error)
        return { success: false, error: 'Yorum yüklenirken hata oluştu' }
    }
}

export async function createTestimonial(data: z.infer<typeof testimonialSchema>) {
    try {
        const parsed = testimonialSchema.safeParse(data)
        if (!parsed.success) {
            return { success: false, error: parsed.error.issues[0]?.message }
        }

        await db.testimonial.create({ data: parsed.data })
        revalidatePath('/admin/yorumlar')
        return { success: true }
    } catch (error) {
        console.error('Create testimonial error:', error)
        return { success: false, error: 'Yorum eklenirken hata oluştu' }
    }
}

export async function updateTestimonial(id: string, data: z.infer<typeof testimonialSchema>) {
    try {
        const parsed = testimonialSchema.safeParse(data)
        if (!parsed.success) {
            return { success: false, error: parsed.error.issues[0]?.message }
        }

        await db.testimonial.update({ where: { id }, data: parsed.data })
        revalidatePath('/admin/yorumlar')
        return { success: true }
    } catch (error) {
        console.error('Update testimonial error:', error)
        return { success: false, error: 'Yorum güncellenirken hata oluştu' }
    }
}

export async function deleteTestimonial(id: string) {
    try {
        await db.testimonial.delete({ where: { id } })
        revalidatePath('/admin/yorumlar')
        return { success: true }
    } catch (error) {
        console.error('Delete testimonial error:', error)
        return { success: false, error: 'Yorum silinirken hata oluştu' }
    }
}

export async function toggleTestimonialActive(id: string, isActive: boolean) {
    try {
        await db.testimonial.update({ where: { id }, data: { isActive } })
        revalidatePath('/admin/yorumlar')
        return { success: true }
    } catch (error) {
        console.error('Toggle testimonial error:', error)
        return { success: false, error: 'Durum değiştirilirken hata oluştu' }
    }
}
