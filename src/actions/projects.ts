'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { createProjectSchema, updateProjectSchema, type CreateProjectInput, type UpdateProjectInput } from '@/lib/validations/project'

export interface ProjectActionResult<T = void> {
    success: boolean
    error?: string
    data?: T
}

// Helper to generate slug from title
function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
}

export async function createProject(data: CreateProjectInput): Promise<ProjectActionResult<{ id: string; slug: string }>> {
    try {
        const parsed = createProjectSchema.safeParse(data)

        if (!parsed.success) {
            return {
                success: false,
                error: parsed.error.issues[0]?.message || 'Geçersiz veri',
            }
        }

        const { slug, images, servicesProvided, stats, ...rest } = parsed.data

        // Check if slug already exists
        const existingProject = await db.project.findUnique({
            where: { slug },
        })

        if (existingProject) {
            return {
                success: false,
                error: 'Bu slug zaten kullanılıyor',
            }
        }

        const project = await db.project.create({
            data: {
                ...rest,
                slug,
                images: JSON.stringify(images || []),
                servicesProvided: JSON.stringify(servicesProvided),
                stats: stats ? JSON.stringify(stats) : null,
            },
        })

        revalidatePath('/admin/projeler')
        revalidatePath('/calismalar')

        return {
            success: true,
            data: { id: project.id, slug: project.slug },
        }
    } catch (error) {
        console.error('Create project error:', error)
        return {
            success: false,
            error: 'Proje oluşturulurken bir hata oluştu',
        }
    }
}

export async function updateProject(data: UpdateProjectInput): Promise<ProjectActionResult> {
    try {
        const parsed = updateProjectSchema.safeParse(data)

        if (!parsed.success) {
            return {
                success: false,
                error: parsed.error.issues[0]?.message || 'Geçersiz veri',
            }
        }

        const { id, slug, images, servicesProvided, stats, ...rest } = parsed.data

        // Check if project exists
        const existingProject = await db.project.findUnique({
            where: { id },
        })

        if (!existingProject) {
            return {
                success: false,
                error: 'Proje bulunamadı',
            }
        }

        // Check if new slug is taken by another project
        if (slug && slug !== existingProject.slug) {
            const slugTaken = await db.project.findUnique({
                where: { slug },
            })

            if (slugTaken) {
                return {
                    success: false,
                    error: 'Bu slug zaten kullanılıyor',
                }
            }
        }

        await db.project.update({
            where: { id },
            data: {
                ...rest,
                ...(slug && { slug }),
                ...(images && { images: JSON.stringify(images) }),
                ...(servicesProvided && { servicesProvided: JSON.stringify(servicesProvided) }),
                ...(stats !== undefined && { stats: stats ? JSON.stringify(stats) : null }),
            },
        })

        revalidatePath('/admin/projeler')
        revalidatePath('/calismalar')
        revalidatePath(`/calismalar/${slug || existingProject.slug}`)

        return { success: true }
    } catch (error) {
        console.error('Update project error:', error)
        return {
            success: false,
            error: 'Proje güncellenirken bir hata oluştu',
        }
    }
}

export async function deleteProject(id: string): Promise<ProjectActionResult> {
    try {
        const project = await db.project.findUnique({
            where: { id },
        })

        if (!project) {
            return {
                success: false,
                error: 'Proje bulunamadı',
            }
        }

        await db.project.delete({
            where: { id },
        })

        revalidatePath('/admin/projeler')
        revalidatePath('/calismalar')

        return { success: true }
    } catch (error) {
        console.error('Delete project error:', error)
        return {
            success: false,
            error: 'Proje silinirken bir hata oluştu',
        }
    }
}

export async function toggleProjectFeatured(id: string): Promise<ProjectActionResult> {
    try {
        const project = await db.project.findUnique({
            where: { id },
        })

        if (!project) {
            return { success: false, error: 'Proje bulunamadı' }
        }

        await db.project.update({
            where: { id },
            data: { featured: !project.featured },
        })

        revalidatePath('/admin/projeler')
        revalidatePath('/')

        return { success: true }
    } catch (error) {
        console.error('Toggle featured error:', error)
        return { success: false, error: 'Bir hata oluştu' }
    }
}

export async function publishProject(id: string): Promise<ProjectActionResult> {
    try {
        await db.project.update({
            where: { id },
            data: { publishedAt: new Date() },
        })

        revalidatePath('/admin/projeler')
        revalidatePath('/calismalar')

        return { success: true }
    } catch (error) {
        console.error('Publish project error:', error)
        return { success: false, error: 'Bir hata oluştu' }
    }
}

export async function unpublishProject(id: string): Promise<ProjectActionResult> {
    try {
        await db.project.update({
            where: { id },
            data: { publishedAt: null },
        })

        revalidatePath('/admin/projeler')
        revalidatePath('/calismalar')

        return { success: true }
    } catch (error) {
        console.error('Unpublish project error:', error)
        return { success: false, error: 'Bir hata oluştu' }
    }
}

// Helper to generate slug for the form
export async function generateProjectSlug(title: string): Promise<string> {
    const baseSlug = generateSlug(title)

    // Check if slug exists and add number suffix if needed
    let slug = baseSlug
    let counter = 1

    while (await db.project.findUnique({ where: { slug } })) {
        slug = `${baseSlug}-${counter}`
        counter++
    }

    return slug
}
