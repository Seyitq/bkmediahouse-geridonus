
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const serviceSlug = 'fotograf-cekimi'

    const description = "Anılarınızı ölümsüzleştiren, hikayenizi ışık ve kompozisyonla anlatan profesyonel fotoğrafçılık deneyimi."

    const longDescription = `
Fotoğrafçılık, sadece bir anı yakalamak değil, o anın ruhunu, duygusunu ve hikayesini sonsuzluğa taşımaktır. BK Media House olarak, görsel dünyanızı zenginleştirmek için en son teknoloji Canon ekipmanları ve profesyonel ışık sistemleri kullanıyoruz.

Her karede mükemmelliği hedefliyoruz. İster markanızın ürünlerini öne çıkaran etkileyici ticari çekimler, ister kişisel hikayenizi yansıtan portreler olsun, her projeye bir sanat eseri titizliğiyle yaklaşıyoruz. Işığın gücünü ustalıkla kullanarak, sıradan anları olağanüstü görsel şölenlere dönüştürüyoruz.

Stüdyo ortamının kontrollü kusursuzluğundan, dış mekanın doğal ve dinamik atmosferine kadar her ortamda, size ve markanıza özel, özgün görsel diller oluşturuyoruz. Bizimle çalışmak, sadece fotoğraf çektirmek değil, görsel bir miras bırakmaktır.
  `

    console.log(`Updating service: ${serviceSlug}...`)

    try {
        const updated = await prisma.service.update({
            where: { slug: serviceSlug },
            data: {
                description: description,
                longDescription: longDescription,
                modelUrl: '/models/canoncam/camera.obj',
                effectType: 'flash',
                modelType: 'camera', // Keeping semantics though not used with URL
                color: '#f59e0b', // Amber/Gold color suited for photography/light
                icon: 'Camera'
            }
        })
        console.log('Update successful:', updated)
    } catch (e) {
        if (e.code === 'P2025') {
            console.error('Service not found! Creating it...')
            // Create if not exists (though it should from seed)
            const created = await prisma.service.create({
                data: {
                    name: 'Fotoğraf Çekimi',
                    slug: serviceSlug,
                    description,
                    longDescription,
                    modelUrl: '/models/canoncam/camera.obj',
                    effectType: 'flash',
                    modelType: 'camera',
                    color: '#f59e0b',
                    icon: 'Camera',
                    order: 5,
                    isActive: true
                }
            })
            console.log('Created:', created)
        } else {
            console.error(e)
        }
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
