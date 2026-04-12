'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { auth } from '@/auth'
import { taskSchema, taskNoteSchema, taskStatusSchema } from '@/lib/validations/task'
import { sendTaskCompletedEmail } from '@/lib/email'

export async function getTasks(filters?: {
    status?: string
    priority?: string
    assignedToId?: string
    categoryId?: string
}) {
    const session = await auth()
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'STAFF')) {
        throw new Error('Yetkisiz erişim')
    }

    const where: Record<string, unknown> = {}

    // STAFF can only see their own tasks
    if (session.user.role === 'STAFF') {
        where.assignedToId = session.user.id
    }

    if (filters?.status) where.status = filters.status
    if (filters?.priority) where.priority = filters.priority
    if (filters?.assignedToId && session.user.role === 'ADMIN') where.assignedToId = filters.assignedToId
    if (filters?.categoryId) where.categoryId = filters.categoryId

    return db.task.findMany({
        where,
        include: {
            assignedTo: { select: { id: true, name: true, title: true, image: true } },
            createdBy: { select: { id: true, name: true } },
            category: true,
            _count: { select: { notes: true } },
        },
        orderBy: [
            { priority: 'desc' },
            { createdAt: 'desc' },
        ],
    })
}

export async function getTask(id: string) {
    const session = await auth()
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'STAFF')) {
        throw new Error('Yetkisiz erişim')
    }

    const task = await db.task.findUnique({
        where: { id },
        include: {
            assignedTo: { select: { id: true, name: true, title: true, image: true, email: true } },
            createdBy: { select: { id: true, name: true } },
            category: true,
            notes: {
                include: {
                    author: { select: { id: true, name: true, role: true, image: true } },
                },
                orderBy: { createdAt: 'desc' },
            },
        },
    })

    // STAFF can only see their own tasks
    if (session.user.role === 'STAFF' && task?.assignedToId !== session.user.id) {
        throw new Error('Bu göreve erişim yetkiniz yok')
    }

    return task
}

export async function createTask(formData: FormData) {
    const session = await auth()
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'STAFF')) {
        throw new Error('Yetkisiz erişim')
    }

    const raw = {
        title: formData.get('title') as string,
        description: (formData.get('description') as string) || undefined,
        priority: (formData.get('priority') as string) || 'NORMAL',
        projectName: (formData.get('projectName') as string) || undefined,
        clientName: (formData.get('clientName') as string) || undefined,
        projectPart: (formData.get('projectPart') as string) || undefined,
        deadline: (formData.get('deadline') as string) || undefined,
        assignedToId: (formData.get('assignedToId') as string) || undefined,
        categoryId: (formData.get('categoryId') as string) || undefined,
        amount: formData.get('amount') ? Number(formData.get('amount')) : undefined,
    }

    const parsed = taskSchema.safeParse(raw)
    if (!parsed.success) {
        return { error: parsed.error.issues[0].message }
    }

    const data = parsed.data

    await db.task.create({
        data: {
            title: data.title,
            description: data.description,
            priority: data.priority,
            projectName: data.projectName,
            clientName: data.clientName,
            projectPart: data.projectPart,
            deadline: data.deadline ? new Date(data.deadline) : undefined,
            amount: data.amount,
            assignedToId: data.assignedToId || null,
            createdById: session.user.id,
            categoryId: data.categoryId || null,
        },
    })

    revalidatePath('/admin/gorevler')
    return { success: true }
}

export async function updateTask(id: string, formData: FormData) {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
        throw new Error('Yetkisiz erişim - Sadece admin görev düzenleyebilir')
    }

    const raw = {
        title: formData.get('title') as string,
        description: (formData.get('description') as string) || undefined,
        priority: (formData.get('priority') as string) || 'NORMAL',
        projectName: (formData.get('projectName') as string) || undefined,
        clientName: (formData.get('clientName') as string) || undefined,
        projectPart: (formData.get('projectPart') as string) || undefined,
        deadline: (formData.get('deadline') as string) || undefined,
        assignedToId: (formData.get('assignedToId') as string) || undefined,
        categoryId: (formData.get('categoryId') as string) || undefined,
        amount: formData.get('amount') ? Number(formData.get('amount')) : undefined,
    }

    const parsed = taskSchema.safeParse(raw)
    if (!parsed.success) {
        return { error: parsed.error.issues[0].message }
    }

    const data = parsed.data

    await db.task.update({
        where: { id },
        data: {
            title: data.title,
            description: data.description,
            priority: data.priority,
            projectName: data.projectName,
            clientName: data.clientName,
            projectPart: data.projectPart,
            deadline: data.deadline ? new Date(data.deadline) : null,
            amount: data.amount,
            assignedToId: data.assignedToId || null,
            categoryId: data.categoryId || null,
        },
    })

    revalidatePath('/admin/gorevler')
    revalidatePath(`/admin/gorevler/${id}`)
    return { success: true }
}

export async function updateTaskStatus(formData: FormData) {
    const session = await auth()
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'STAFF')) {
        throw new Error('Yetkisiz erişim')
    }

    const raw = {
        taskId: formData.get('taskId') as string,
        status: formData.get('status') as string,
    }

    const parsed = taskStatusSchema.safeParse(raw)
    if (!parsed.success) {
        return { error: parsed.error.issues[0].message }
    }

    const { taskId, status } = parsed.data

    // STAFF can only update their own tasks
    if (session.user.role === 'STAFF') {
        const task = await db.task.findUnique({ where: { id: taskId } })
        if (task?.assignedToId !== session.user.id) {
            throw new Error('Bu görevi güncelleme yetkiniz yok')
        }
        // STAFF cannot change status if task is PAID
        if (task?.status === 'PAID') {
            return { error: 'Ödemesi yapılmış görevlerin durumu değiştirilemez' }
        }
        // STAFF cannot change status if task is in REVISION (must wait for admin)
        if (task?.status === 'REVISION') {
            return { error: 'Revize talep edilmiş görevlerin durumu admin tarafından değiştirilir' }
        }
        // STAFF can only set IN_PROGRESS or COMPLETED
        if (status !== 'IN_PROGRESS' && status !== 'COMPLETED') {
            throw new Error('Çalışanlar sadece "Devam Ediyor" veya "Tamamlandı" durumlarına geçebilir')
        }
    }

    const updateData: Record<string, unknown> = { status }

    if (status === 'COMPLETED') {
        updateData.completedAt = new Date()
    } else if (status === 'PAID') {
        updateData.paidAt = new Date()
    } else if (status === 'IN_PROGRESS') {
        // Clear completion/payment dates when going back to in progress
        updateData.completedAt = null
        updateData.paidAt = null
    } else if (status === 'REVISION') {
        // Clear completion/payment dates on revision
        updateData.completedAt = null
        updateData.paidAt = null
    }

    await db.task.update({
        where: { id: taskId },
        data: updateData,
    })

    // Send email notification when task is completed
    if (status === 'COMPLETED') {
        const task = await db.task.findUnique({
            where: { id: taskId },
            include: { assignedTo: { select: { name: true } } },
        })
        if (task) {
            await sendTaskCompletedEmail(
                task.title,
                task.assignedTo?.name || 'Bilinmeyen',
                taskId
            )
        }
    }

    revalidatePath('/admin/gorevler')
    revalidatePath(`/admin/gorevler/${taskId}`)
    revalidatePath('/admin')
    return { success: true }
}

export async function addTaskNote(formData: FormData) {
    const session = await auth()
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'STAFF')) {
        throw new Error('Yetkisiz erişim')
    }

    const raw = {
        content: formData.get('content') as string,
        taskId: formData.get('taskId') as string,
    }

    const parsed = taskNoteSchema.safeParse(raw)
    if (!parsed.success) {
        return { error: parsed.error.issues[0].message }
    }

    // STAFF can only add notes to their own tasks
    if (session.user.role === 'STAFF') {
        const task = await db.task.findUnique({ where: { id: parsed.data.taskId } })
        if (task?.assignedToId !== session.user.id) {
            throw new Error('Bu göreve not ekleme yetkiniz yok')
        }
    }

    await db.taskNote.create({
        data: {
            content: parsed.data.content,
            taskId: parsed.data.taskId,
            authorId: session.user.id,
        },
    })

    revalidatePath(`/admin/gorevler/${parsed.data.taskId}`)
    return { success: true }
}

export async function deleteTask(id: string) {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
        throw new Error('Yetkisiz erişim - Sadece admin görev silebilir')
    }

    await db.task.delete({ where: { id } })

    revalidatePath('/admin/gorevler')
    return { success: true }
}

export async function getTaskStats() {
    const session = await auth()
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'STAFF')) {
        throw new Error('Yetkisiz erişim')
    }

    const where: Record<string, unknown> = {}
    if (session.user.role === 'STAFF') {
        where.assignedToId = session.user.id
    }

    const [total, pending, inProgress, completed, paid] = await Promise.all([
        db.task.count({ where }),
        db.task.count({ where: { ...where, status: 'PENDING' } }),
        db.task.count({ where: { ...where, status: 'IN_PROGRESS' } }),
        db.task.count({ where: { ...where, status: 'COMPLETED' } }),
        db.task.count({ where: { ...where, status: 'PAID' } }),
    ])

    return { total, pending, inProgress, completed, paid }
}
