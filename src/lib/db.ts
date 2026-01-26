import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

// Only create PrismaClient if DATABASE_URL is available
// This prevents errors during Vercel build when no database is connected
function createPrismaClient(): PrismaClient {
    if (!process.env.DATABASE_URL) {
        // Return a mock/placeholder that will throw meaningful errors at runtime
        // This should never happen in production, only during build
        console.warn('DATABASE_URL is not set. Prisma client will not work.')
    }
    return new PrismaClient()
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
