import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

const MIME_TYPES: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params
    const filePath = join(process.cwd(), 'public', 'uploads', ...path)

    // Security: prevent directory traversal
    const resolvedPath = join(process.cwd(), 'public', 'uploads', ...path)
    if (!resolvedPath.startsWith(join(process.cwd(), 'public', 'uploads'))) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    if (!existsSync(resolvedPath)) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    try {
        const fileBuffer = await readFile(filePath)
        const ext = '.' + filePath.split('.').pop()?.toLowerCase()
        const contentType = MIME_TYPES[ext] || 'application/octet-stream'

        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        })
    } catch {
        return NextResponse.json({ error: 'Failed to read file' }, { status: 500 })
    }
}
