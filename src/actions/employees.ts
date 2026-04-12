'use server'

import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { auth } from '@/auth'
import { employeeSchema } from '@/lib/validations/employee'

export async function getEmployees() {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
        throw new Error('Yetkisiz erişim')
    }

    return db.user.findMany({
        where: { role: 'STAFF' },
        include: {
            _count: {
                select: { assignedTasks: true },
            },
        },
        orderBy: { createdAt: 'desc' },
    })
}

export async function getEmployee(id: string) {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
        throw new Error('Yetkisiz erişim')
    }

    return db.user.findUnique({
        where: { id, role: 'STAFF' },
        include: {
            assignedTasks: {
                include: { category: true },
                orderBy: { createdAt: 'desc' },
            },
            _count: {
                select: { assignedTasks: true },
            },
        },
    })
}

export async function createEmployee(formData: FormData) {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
        throw new Error('Yetkisiz erişim')
    }

    const raw = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        title: formData.get('title') as string || undefined,
        phone: formData.get('phone') as string || undefined,
    }

    const parsed = employeeSchema.safeParse(raw)
    if (!parsed.success) {
        return { error: parsed.error.issues[0].message }
    }

    const { name, email, password, title, phone } = parsed.data

    // Check if email already exists
    const existing = await db.user.findUnique({ where: { email } })
    if (existing) {
        return { error: 'Bu e-posta adresi zaten kullanımda' }
    }

    if (!password) {
        return { error: 'Şifre zorunludur' }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: 'STAFF',
            title,
            phone,
        },
    })

    revalidatePath('/admin/calisanlar')
    return { success: true }
}

export async function updateEmployee(id: string, formData: FormData) {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
        throw new Error('Yetkisiz erişim')
    }

    const raw = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: (formData.get('password') as string) || undefined,
        title: formData.get('title') as string || undefined,
        phone: formData.get('phone') as string || undefined,
    }

    const parsed = employeeSchema.safeParse(raw)
    if (!parsed.success) {
        return { error: parsed.error.issues[0].message }
    }

    const { name, email, password, title, phone } = parsed.data

    // Check if email is taken by another user
    const existing = await db.user.findUnique({ where: { email } })
    if (existing && existing.id !== id) {
        return { error: 'Bu e-posta adresi başka bir kullanıcı tarafından kullanılıyor' }
    }

    const updateData: Record<string, unknown> = { name, email, title, phone }

    if (password) {
        updateData.password = await bcrypt.hash(password, 10)
    }

    await db.user.update({
        where: { id },
        data: updateData,
    })

    revalidatePath('/admin/calisanlar')
    return { success: true }
}

export async function deleteEmployee(id: string) {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
        throw new Error('Yetkisiz erişim')
    }

    try {
        // Reassign tasks created by this employee to the admin
        await db.task.updateMany({
            where: { createdById: id },
            data: { createdById: session.user.id },
        })

        // Remove assignment from tasks assigned to this employee
        await db.task.updateMany({
            where: { assignedToId: id },
            data: { assignedToId: null },
        })

        // Delete task notes by this employee
        await db.taskNote.deleteMany({
            where: { authorId: id },
        })

        // Now safely delete the employee
        await db.user.delete({ where: { id } })

        revalidatePath('/admin/calisanlar')
        revalidatePath('/admin/gorevler')
        return { success: true }
    } catch (error) {
        console.error('Employee deletion error:', error)
        return { error: 'Çalışan silinirken bir hata oluştu' }
    }
}
