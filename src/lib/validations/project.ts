import { z } from 'zod'

// ============================================
// PROJECT VALIDATION SCHEMAS
// ============================================

export const projectSchema = z.object({
    title: z
        .string()
        .min(1, 'Proje başlığı gerekli')
        .min(3, 'Başlık en az 3 karakter olmalı'),
    slug: z
        .string()
        .min(1, 'Slug gerekli')
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug sadece küçük harf, rakam ve tire içerebilir'),
    clientName: z
        .string()
        .min(1, 'Müşteri adı gerekli'),
    coverImage: z
        .string()
        .min(1, 'Kapak görseli gerekli')
        .url('Geçerli bir URL girin'),
    images: z
        .array(z.string().url('Geçerli bir URL girin'))
        .optional()
        .default([]),
    description: z
        .string()
        .min(1, 'Açıklama gerekli')
        .min(50, 'Açıklama en az 50 karakter olmalı'),
    challenge: z.string().optional(),
    solution: z.string().optional(),
    result: z.string().optional(),
    servicesProvided: z
        .array(z.string())
        .min(1, 'En az bir hizmet seçmelisiniz'),
    stats: z
        .record(z.string(), z.union([z.string(), z.number()]))
        .optional(),
    featured: z.boolean().default(false),
    publishedAt: z.date().optional().nullable(),
})

export const createProjectSchema = projectSchema

export const updateProjectSchema = projectSchema.partial().extend({
    id: z.string().min(1, 'Proje ID gerekli'),
})

export type ProjectInput = z.infer<typeof projectSchema>
export type CreateProjectInput = z.infer<typeof createProjectSchema>
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>
