import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE = 25 * 1024 * 1024 // 25MB

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File | null

        if (!file) {
            return NextResponse.json(
                { error: 'Dosya bulunamadı' },
                { status: 400 }
            )
        }

        // Validate file type
        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json(
                { error: 'Geçersiz dosya formatı. İzin verilen: JPEG, PNG, WebP, GIF' },
                { status: 400 }
            )
        }

        // Validate file size
        if (file.size > MAX_SIZE) {
            return NextResponse.json(
                { error: 'Dosya boyutu 25MB\'dan büyük olamaz' },
                { status: 400 }
            )
        }

        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'projects')
        if (!existsSync(uploadsDir)) {
            await mkdir(uploadsDir, { recursive: true })
        }

        // Generate unique filename
        const ext = file.name.split('.').pop() || 'jpg'
        const timestamp = Date.now()
        const random = Math.random().toString(36).substring(2, 8)
        const filename = `${timestamp}-${random}.${ext}`

        // Write file to disk
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const filepath = path.join(uploadsDir, filename)
        await writeFile(filepath, buffer)

        // Return the public URL path
        const url = `/uploads/projects/${filename}`

        return NextResponse.json({ url, filename })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json(
            { error: 'Dosya yüklenirken bir hata oluştu' },
            { status: 500 }
        )
    }
}
