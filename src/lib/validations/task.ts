import { z } from 'zod'

export const taskSchema = z.object({
    title: z.string().min(1, 'Görev başlığı zorunludur'),
    description: z.string().optional(),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'REVISION', 'COMPLETED', 'PAID']).default('PENDING'),
    priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT']).default('NORMAL'),
    projectName: z.string().optional(),
    clientName: z.string().optional(),
    projectPart: z.string().optional(),
    deadline: z.string().optional(), // ISO date string
    amount: z.number().optional(),
    assignedToId: z.string().optional(),
    categoryId: z.string().optional(),
})

export const taskNoteSchema = z.object({
    content: z.string().min(1, 'Not içeriği zorunludur'),
    taskId: z.string().min(1, 'Görev ID zorunludur'),
})

export const taskStatusSchema = z.object({
    taskId: z.string().min(1),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'REVISION', 'COMPLETED', 'PAID']),
})

export const taskCategorySchema = z.object({
    name: z.string().min(1, 'Kategori adı zorunludur'),
    color: z.string().default('#3b82f6'),
    order: z.number().default(0),
    isActive: z.boolean().default(true),
})

export type TaskFormData = z.infer<typeof taskSchema>
export type TaskNoteFormData = z.infer<typeof taskNoteSchema>
export type TaskStatusFormData = z.infer<typeof taskStatusSchema>
export type TaskCategoryFormData = z.infer<typeof taskCategorySchema>
