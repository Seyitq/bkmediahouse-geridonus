const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    // Create admin user
    const adminEmail = 'admin@bkmediahouse.com.tr'
    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail },
    })

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('admin123', 12)

        await prisma.user.create({
            data: {
                email: adminEmail,
                password: hashedPassword,
                name: 'Admin',
                role: 'ADMIN',
            },
        })

        console.log('✅ Admin user created:')
        console.log('   Email: admin@bkmediahouse.com.tr')
        console.log('   Password: admin123')
    } else {
        console.log('ℹ️ Admin user already exists')
    }

    console.log('🎉 Seeding completed!')
}

main()
    .catch((e) => {
        console.error('Seeding failed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
