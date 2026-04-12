'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { auth } from '@/auth'
import { taskCategorySchema } from '@/lib/validations/task'

export async function getCategories() {
    return db.taskCategory.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
        include: {
            _count: { select: { tasks: true } },
        },
    })
}

export async function getAllCategories() {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
        throw new Error('Yetkisiz erişim')
    }

    return db.taskCategory.findMany({
        orderBy: { order: 'asc' },
        include: {
            _count: { select: { tasks: true } },
        },
    })
}

export async function createCategory(formData: FormData) {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
        throw new Error('Yetkisiz erişim')
    }

    const raw = {
        name: formData.get('name') as string,
        color: (formData.get('color') as string) || '#3b82f6',
    }

    const parsed = taskCategorySchema.safeParse(raw)
    if (!parsed.success) {
        return { error: parsed.error.issues[0].message }
    }

    const existing = await db.taskCategory.findUnique({ where: { name: parsed.data.name } })
    if (existing) {
        return { error: 'Bu kategori zaten mevcut' }
    }

    await db.taskCategory.create({
        data: {
            name: parsed.data.name,
            color: parsed.data.color,
        },
    })

    revalidatePath('/admin/kategoriler')
    revalidatePath('/admin/gorevler')
    return { success: true }
}

export async function updateCategory(id: string, formData: FormData) {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
        throw new Error('Yetkisiz erişim')
    }

    const raw = {
        name: formData.get('name') as string,
        color: (formData.get('color') as string) || '#3b82f6',
        isActive: formData.get('isActive') === 'true',
    }

    const parsed = taskCategorySchema.safeParse(raw)
    if (!parsed.success) {
        return { error: parsed.error.issues[0].message }
    }

    const existing = await db.taskCategory.findUnique({ where: { name: parsed.data.name } })
    if (existing && existing.id !== id) {
        return { error: 'Bu kategori adı zaten kullanılıyor' }
    }

    await db.taskCategory.update({
        where: { id },
        data: {
            name: parsed.data.name,
            color: parsed.data.color,
            isActive: parsed.data.isActive,
        },
    })

    revalidatePath('/admin/kategoriler')
    revalidatePath('/admin/gorevler')
    return { success: true }
}

export async function deleteCategory(id: string) {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
        throw new Error('Yetkisiz erişim')
    }

    await db.taskCategory.delete({ where: { id } })

    revalidatePath('/admin/kategoriler')
    return { success: true }
}