'use server'

import { db } from '@/lib/db'
import { inquirySchema } from '@/lib/validations/inquiry'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function createInquiry(data: z.infer<typeof inquirySchema>) {
    try {
        const parsed = inquirySchema.safeParse(data)

        if (!parsed.success) {
            return {
                success: false,
                error: parsed.error.issues[0]?.message || 'Geçersiz veri',
            }
        }

        const { services, budgetRange, timeline, name, email, phone, company, message } = parsed.data

        await db.inquiry.create({
            data: {
                services: JSON.stringify(services),
                budgetRange,
                timeline: timeline || null,
                name,
                email,
                phone: phone || null,
                company: company || null,
                message,
                isRead: false,
                isArchived: false,
            },
        })

        revalidatePath('/admin/talepler')
        return { success: true }
    } catch (error) {
        console.error('Create inquiry error:', error)
        return { success: false, error: 'Talep gönderilirken bir hata oluştu' }
    }
}
