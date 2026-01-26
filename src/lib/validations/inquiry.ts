import { z } from 'zod'

// ============================================
// INQUIRY VALIDATION SCHEMAS (Multi-step Form)
// ============================================

// Available services list
export const SERVICES = [
    'video-produksiyon',
    'sosyal-medya-yonetimi',
    'marka-kimligi',
    'web-tasarim',
    'fotograf-cekimi',
    'reklam-kampanyasi',
    'icerik-uretimi',
    'etkinlik-yonetimi',
] as const

export const SERVICE_LABELS: Record<typeof SERVICES[number], string> = {
    'video-produksiyon': 'Video Prodüksiyon',
    'sosyal-medya-yonetimi': 'Sosyal Medya Yönetimi',
    'marka-kimligi': 'Marka Kimliği',
    'web-tasarim': 'Web Tasarım',
    'fotograf-cekimi': 'Fotoğraf Çekimi',
    'reklam-kampanyasi': 'Reklam Kampanyası',
    'icerik-uretimi': 'İçerik Üretimi',
    'etkinlik-yonetimi': 'Etkinlik Yönetimi',
}

export const BUDGET_RANGES = [
    '10000-25000',
    '25000-50000',
    '50000-100000',
    '100000-250000',
    '250000+',
] as const

export const BUDGET_LABELS: Record<typeof BUDGET_RANGES[number], string> = {
    '10000-25000': '₺10.000 - ₺25.000',
    '25000-50000': '₺25.000 - ₺50.000',
    '50000-100000': '₺50.000 - ₺100.000',
    '100000-250000': '₺100.000 - ₺250.000',
    '250000+': '₺250.000+',
}

export const TIMELINES = [
    '1-hafta',
    '2-hafta',
    '1-ay',
    '2-3-ay',
    '3-ay+',
] as const

export const TIMELINE_LABELS: Record<typeof TIMELINES[number], string> = {
    '1-hafta': '1 Hafta',
    '2-hafta': '2 Hafta',
    '1-ay': '1 Ay',
    '2-3-ay': '2-3 Ay',
    '3-ay+': '3 Ay+',
}

// Step 1: Service Selection
export const inquiryStep1Schema = z.object({
    services: z
        .array(z.enum(['video-produksiyon', 'sosyal-medya-yonetimi', 'marka-kimligi', 'web-tasarim', 'fotograf-cekimi', 'reklam-kampanyasi', 'icerik-uretimi', 'etkinlik-yonetimi']))
        .min(1, 'En az bir hizmet seçmelisiniz'),
})

// Step 2: Budget & Timeline
export const inquiryStep2Schema = z.object({
    budgetRange: z.enum(['10000-25000', '25000-50000', '50000-100000', '100000-250000', '250000+']),
    timeline: z.enum(['1-hafta', '2-hafta', '1-ay', '2-3-ay', '3-ay+']).optional(),
})

// Step 3: Contact Details
export const inquiryStep3Schema = z.object({
    name: z
        .string()
        .min(1, 'İsim gerekli')
        .min(2, 'İsim en az 2 karakter olmalı'),
    email: z
        .string()
        .min(1, 'E-posta adresi gerekli')
        .email('Geçerli bir e-posta adresi girin'),
    phone: z
        .string()
        .optional()
        .refine((val) => !val || /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(val), {
            message: 'Geçerli bir telefon numarası girin',
        }),
    company: z.string().optional(),
    message: z
        .string()
        .min(1, 'Mesaj gerekli')
        .min(10, 'Mesaj en az 10 karakter olmalı'),
})

// Complete inquiry schema (all steps combined)
export const inquirySchema = inquiryStep1Schema
    .merge(inquiryStep2Schema)
    .merge(inquiryStep3Schema)

export type InquiryStep1Input = z.infer<typeof inquiryStep1Schema>
export type InquiryStep2Input = z.infer<typeof inquiryStep2Schema>
export type InquiryStep3Input = z.infer<typeof inquiryStep3Schema>
export type InquiryInput = z.infer<typeof inquirySchema>
