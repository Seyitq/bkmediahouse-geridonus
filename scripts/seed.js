const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    // Create admin user
    const adminEmail = 'admin@bkmediahouse.com'
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
        console.log('   Email: admin@bkmediahouse.com')
        console.log('   Password: admin123')
    } else {
        console.log('ℹ️ Admin user already exists')
    }

    // Create sample project
    const existingProject = await prisma.project.findFirst()

    if (!existingProject) {
        await prisma.project.create({
            data: {
                title: 'Örnek Marka Yenileme Projesi',
                slug: 'ornek-marka-yenileme-projesi',
                clientName: 'ABC Şirketi',
                coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
                images: JSON.stringify([
                    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
                    'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800',
                ]),
                description: 'Bu örnek proje, BK Media House\'un marka yenileme süreçlerini göstermektedir. Müşterimiz ABC Şirketi için kapsamlı bir marka kimliği çalışması gerçekleştirdik.',
                challenge: 'Müşterimiz, eski marka kimliğinin modern pazarda rekabet gücünü kaybettiğini fark etti. Hedef kitleye ulaşmakta zorlanıyorlardı.',
                solution: 'Kapsamlı bir marka analizi yaparak, yeni logo, renk paleti ve tipografi sistemi geliştirdik. Sosyal medya stratejisi de yeniledik.',
                result: '%150 sosyal medya etkileşimi artışı, %75 marka bilinirliği artışı ve %40 satış artışı elde edildi.',
                servicesProvided: JSON.stringify(['marka-kimligi', 'sosyal-medya-yonetimi', 'web-tasarim']),
                stats: JSON.stringify({
                    'Etkileşim Artışı': '%150',
                    'Marka Bilinirliği': '%75',
                    'Satış Artışı': '%40',
                }),
                featured: true,
                publishedAt: new Date(),
            },
        })

        console.log('✅ Sample project created')
    } else {
        console.log('ℹ️ Sample project already exists')
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
