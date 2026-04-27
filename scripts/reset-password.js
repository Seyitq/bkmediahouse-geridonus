const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    const hash = await bcrypt.hash('admin123', 12)
    await prisma.user.upsert({
        where: { email: 'admin@bkmediahouse.com.tr' },
        update: { password: hash },
        create: {
            email: 'admin@bkmediahouse.com.tr',
            password: hash,
            name: 'Admin',
            role: 'ADMIN',
        },
    })
    console.log('✅ Admin kullanıcı hazır!')
    console.log('   Email: admin@bkmediahouse.com.tr')
    console.log('   Şifre: admin123')
}

main()
    .catch((e) => {
        console.error('Hata:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
