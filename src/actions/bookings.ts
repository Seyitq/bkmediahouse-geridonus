'use server'

import { db } from '@/lib/db'
import { createBookingSchema, updateBookingSchema, publicBookingRequestSchema } from '@/lib/validations/booking'
import { revalidatePath } from 'next/cache'
import { ProjectActionResult } from './projects'
import { z } from 'zod'

export async function createBooking(data: z.infer<typeof createBookingSchema>): Promise<ProjectActionResult> {
    try {
        const parsed = createBookingSchema.safeParse(data)

        if (!parsed.success) {
            return {
                success: false,
                error: parsed.error.issues[0]?.message || 'Geçersiz veri',
            }
        }

        const { startTime, endTime, clientName, clientEmail, clientPhone, notes } = parsed.data

        await db.booking.create({
            data: {
                startTime,
                endTime,
                clientName,
                clientEmail,
                clientPhone,
                notes,
                status: 'PENDING',
            },
        })

        revalidatePath('/admin/randevular')
        return { success: true }
    } catch (error) {
        console.error('Create booking error:', error)
        return { success: false, error: 'Randevu oluşturulurken bir hata oluştu' }
    }
}

export async function updateBooking(data: z.infer<typeof updateBookingSchema>): Promise<ProjectActionResult> {
    try {
        const parsed = updateBookingSchema.safeParse(data)

        if (!parsed.success) {
            return {
                success: false,
                error: parsed.error.issues[0]?.message || 'Geçersiz veri',
            }
        }

        const { id, ...updateData } = parsed.data

        await db.booking.update({
            where: { id },
            data: updateData,
        })

        revalidatePath('/admin/randevular')
        return { success: true }
    } catch (error) {
        console.error('Update booking error:', error)
        return { success: false, error: 'Randevu güncellenirken bir hata oluştu' }
    }
}

export async function createPublicBookingRequest(data: z.infer<typeof publicBookingRequestSchema>): Promise<ProjectActionResult> {
    try {
        const parsed = publicBookingRequestSchema.safeParse(data)

        if (!parsed.success) {
            return {
                success: false,
                error: parsed.error.issues[0]?.message || 'Geçersiz veri',
            }
        }

        const { slotId, clientName, clientEmail, clientPhone, notes } = parsed.data

        // Get the slot to verify it exists and get times
        const slot = await db.availableSlot.findUnique({
            where: { id: slotId },
        })

        if (!slot) {
            return { success: false, error: 'Seçilen zaman dilimi bulunamadı' }
        }

        if (slot.isBooked) {
            return { success: false, error: 'Bu zaman dilimi az önce doldu' }
        }

        // Create booking and mark slot as booked in a transaction
        await db.$transaction([
            db.booking.create({
                data: {
                    startTime: slot.startTime,
                    endTime: slot.endTime,
                    clientName,
                    clientEmail,
                    clientPhone,
                    notes,
                    status: 'PENDING',
                },
            }),
            db.availableSlot.update({
                where: { id: slotId },
                data: { isBooked: true },
            }),
        ])

        revalidatePath('/admin/randevular')
        return { success: true }
    } catch (error) {
        console.error('Public booking request error:', error)
        return { success: false, error: 'Randevu talebi oluşturulurken bir hata oluştu' }
    }
}
