import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

// Force dynamic rendering to prevent build-time database calls
export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const slots = await db.availableSlot.findMany({
            where: {
                isBooked: false,
                startTime: {
                    gte: new Date(),
                },
            },
            orderBy: { startTime: 'asc' },
        })

        return NextResponse.json({ slots })
    } catch (error) {
        console.error('Error fetching slots:', error)
        return NextResponse.json({ slots: [] }, { status: 500 })
    }
}
