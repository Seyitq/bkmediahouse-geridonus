import { z } from 'zod'

// ============================================
// BOOKING VALIDATION SCHEMAS
// ============================================

export const bookingSchema = z.object({
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    clientName: z
        .string()
        .min(1, 'Müşteri adı gerekli')
        .min(2, 'Müşteri adı en az 2 karakter olmalı'),
    clientEmail: z
        .string()
        .min(1, 'E-posta adresi gerekli')
        .email('Geçerli bir e-posta adresi girin'),
    clientPhone: z
        .string()
        .optional()
        .refine((val) => !val || /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(val), {
            message: 'Geçerli bir telefon numarası girin',
        }),
    notes: z.string().optional(),
}).refine((data) => data.endTime > data.startTime, {
    message: 'Bitiş zamanı başlangıç zamanından sonra olmalı',
    path: ['endTime'],
})

export const createBookingSchema = bookingSchema

export const updateBookingSchema = z.object({
    id: z.string().min(1, 'Randevu ID gerekli'),
    status: z.enum(['PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLED']).optional(),
    startTime: z.coerce.date().optional(),
    endTime: z.coerce.date().optional(),
    clientName: z.string().min(2).optional(),
    clientEmail: z.string().email().optional(),
    clientPhone: z.string().optional(),
    notes: z.string().optional(),
})

// Public booking request (from external clients)
export const publicBookingRequestSchema = z.object({
    slotId: z.string().min(1, 'Zaman dilimi seçmelisiniz'),
    clientName: z
        .string()
        .min(1, 'İsminizi girin')
        .min(2, 'İsim en az 2 karakter olmalı'),
    clientEmail: z
        .string()
        .min(1, 'E-posta adresi gerekli')
        .email('Geçerli bir e-posta adresi girin'),
    clientPhone: z
        .string()
        .optional(),
    notes: z
        .string()
        .max(500, 'Not en fazla 500 karakter olabilir')
        .optional(),
})

// Available slot schema (for admin to create slots)
export const availableSlotSchema = z.object({
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
}).refine((data) => data.endTime > data.startTime, {
    message: 'Bitiş zamanı başlangıç zamanından sonra olmalı',
    path: ['endTime'],
})

export type BookingInput = z.infer<typeof bookingSchema>
export type CreateBookingInput = z.infer<typeof createBookingSchema>
export type UpdateBookingInput = z.infer<typeof updateBookingSchema>
export type PublicBookingRequestInput = z.infer<typeof publicBookingRequestSchema>
export type AvailableSlotInput = z.infer<typeof availableSlotSchema>
