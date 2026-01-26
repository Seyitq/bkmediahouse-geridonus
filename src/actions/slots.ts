'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const createSlotSchema = z.object({
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
}).refine((data) => data.endTime > data.startTime, {
    message: 'Bitiş zamanı başlangıç zamanından sonra olmalı',
    path: ['endTime'],
})

export async function createAvailableSlot(data: { startTime: Date; endTime: Date }) {
    try {
        const parsed = createSlotSchema.safeParse(data)

        if (!parsed.success) {
            return {
                success: false,
                error: parsed.error.issues[0]?.message || 'Geçersiz veri',
            }
        }

        const { startTime, endTime } = parsed.data

        // Check for overlapping slots
        const overlapping = await db.availableSlot.findFirst({
            where: {
                OR: [
                    {
                        startTime: { lte: startTime },
                        endTime: { gt: startTime },
                    },
                    {
                        startTime: { lt: endTime },
                        endTime: { gte: endTime },
                    },
                    {
                        startTime: { gte: startTime },
                        endTime: { lte: endTime },
                    },
                ],
            },
        })

        if (overlapping) {
            return {
                success: false,
                error: 'Bu zaman diliminde başka bir slot mevcut',
            }
        }

        await db.availableSlot.create({
            data: {
                startTime,
                endTime,
                isBooked: false,
            },
        })

        revalidatePath('/admin/slotlar')
        return { success: true }
    } catch (error) {
        console.error('Create slot error:', error)
        return { success: false, error: 'Slot oluşturulurken bir hata oluştu' }
    }
}

export async function deleteAvailableSlot(id: string) {
    try {
        await db.availableSlot.delete({
            where: { id },
        })

        revalidatePath('/admin/slotlar')
        return { success: true }
    } catch (error) {
        console.error('Delete slot error:', error)
        return { success: false, error: 'Slot silinirken bir hata oluştu' }
    }
}

export async function toggleSlotBooked(id: string, isBooked: boolean) {
    try {
        await db.availableSlot.update({
            where: { id },
            data: { isBooked },
        })

        revalidatePath('/admin/slotlar')
        return { success: true }
    } catch (error) {
        console.error('Toggle slot error:', error)
        return { success: false, error: 'Slot güncellenirken bir hata oluştu' }
    }
}
