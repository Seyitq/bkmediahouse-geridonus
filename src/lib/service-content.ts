// Hardcoded service detail page content for each service
// This content is NOT fetched from database - it's static

export interface ServiceContent {
    slug: string
    heroTitle: string
    heroSubtitle: string
    // Section 2 - Left aligned
    section2Title: string
    section2Description: string
    // Section 3 - Right aligned
    section3Title: string
    section3Description: string
    // Section 4 - Centered
    section4Title: string
    section4Description: string
    // CTA Section
    ctaTitle: string
    // 3D Model path (optional - defaults to camera)
    modelUrl?: string
}

export const serviceContents: Record<string, ServiceContent> = {
    'fotograf-cekimi': {
        slug: 'fotograf-cekimi',
        heroTitle: 'HER ANI\nYAKALA',
        heroSubtitle: 'Moda Fotoğrafçılığında Yeni Bir Standart',
        section2Title: 'Kristal Netliğinde\nGörseller',
        section2Description: 'Projenizi en ince detayına kadar yansıtan, yüksek çözünürlüklü ve kusursuz netlikte görseller sunuyoruz.',
        section3Title: 'Profesyonel\nYönetim',
        section3Description: 'Çekim sürecinin her aşamasını titizlikle planlayarak, vizyonunuzu kusursuz bir şekilde hayata geçiriyoruz.',
        section4Title: 'Güçlü\nIşıklandırma',
        section4Description: 'Doğru ışık kullanımıyla markanızın karakterini ortaya çıkaran, etkileyici ve dramatik atmosferler yaratıyoruz.',
        ctaTitle: 'Yaratmaya\nHazır Mısın?',
        modelUrl: '/models/canoncam/camera.obj'
    },

    'video-produksiyon': {
        slug: 'video-produksiyon',
        heroTitle: 'HİKAYENİ\nANLAT',
        heroSubtitle: 'Sinematik Video Prodüksiyon Deneyimi',
        section2Title: '4K Sinematik\nKalite',
        section2Description: 'Ultra yüksek çözünürlükte, sinema kalitesinde görüntüler ile markanızın hikayesini en etkileyici şekilde anlatıyoruz.',
        section3Title: 'Profesyonel\nKurgu',
        section3Description: 'Deneyimli kurgu ekibimiz ile çekimlerinizi akıcı, dinamik ve izleyiciyi sürükleyen videolara dönüştürüyoruz.',
        section4Title: 'Ses ve\nMüzik Tasarımı',
        section4Description: 'Özgün müzik ve ses efektleri ile videonuzun duygusal etkisini en üst seviyeye çıkarıyoruz.',
        ctaTitle: 'Hikayeni\nAnlatmaya Hazır Mısın?',
        modelUrl: '/models/canoncam/camera.obj'
    },

    'sosyal-medya-yonetimi': {
        slug: 'sosyal-medya-yonetimi',
        heroTitle: 'DİJİTALDE\nÖNCÜ OL',
        heroSubtitle: 'Stratejik Sosyal Medya Yönetimi',
        section2Title: 'İçerik\nStratejisi',
        section2Description: 'Hedef kitlenizi analiz ederek, markanıza özel içerik stratejileri geliştiriyor ve uygulamaya koyuyoruz.',
        section3Title: 'Topluluk\nYönetimi',
        section3Description: 'Takipçilerinizle güçlü bağlar kurarak, sadık bir topluluk oluşturmanıza yardımcı oluyoruz.',
        section4Title: 'Analiz ve\nRaporlama',
        section4Description: 'Detaylı performans analizleri ile stratejilerimizi sürekli optimize ediyor, büyümenizi takip ediyoruz.',
        ctaTitle: 'Dijitalde\nBüyümeye Hazır Mısın?',
        modelUrl: '/models/socialmedia/iphone_14_pro.glb'
    },

    'marka-kimligi': {
        slug: 'marka-kimligi',
        heroTitle: 'MARKANI\nTANIMLAT',
        heroSubtitle: 'Unutulmaz Marka Kimliği Tasarımı',
        section2Title: 'Logo ve\nGörsel Kimlik',
        section2Description: 'Markanızın özünü yansıtan, akılda kalıcı ve özgün logo tasarımları ile kurumsal kimliğinizi oluşturuyoruz.',
        section3Title: 'Marka\nRehberleri',
        section3Description: 'Tutarlı bir marka deneyimi için kapsamlı marka kullanım rehberleri ve stil kılavuzları hazırlıyoruz.',
        section4Title: 'Ambalaj ve\nBasılı Materyal',
        section4Description: 'Kartvizitlerden ambalaj tasarımlarına kadar tüm basılı materyallerinizi profesyonelce tasarlıyoruz.',
        ctaTitle: 'Markana Kimlik\nKazandırmaya Hazır Mısın?',
        modelUrl: '/models/canoncam/camera.obj'
    },

    'web-tasarim': {
        slug: 'web-tasarim',
        heroTitle: 'DİJİTAL\nVİTRİNİN',
        heroSubtitle: 'Modern ve Etkileşimli Web Deneyimleri',
        section2Title: 'Responsive\nTasarım',
        section2Description: 'Her cihazda mükemmel görünen, kullanıcı dostu ve modern arayüzler tasarlıyoruz.',
        section3Title: 'Hızlı ve\nOptimize',
        section3Description: 'SEO uyumlu, hızlı yüklenen ve arama motorlarında üst sıralarda çıkan web siteleri geliştiriyoruz.',
        section4Title: 'E-Ticaret\nÇözümleri',
        section4Description: 'Satışlarınızı artıracak, kullanıcı deneyimine odaklı e-ticaret platformları kuruyoruz.',
        ctaTitle: 'Web Sitenizi\nYenilemeye Hazır Mısınız?',
        modelUrl: '/models/canoncam/camera.obj'
    },

    'reklam-kampanyasi': {
        slug: 'reklam-kampanyasi',
        heroTitle: 'HEDEF\nKİTLENE ULAŞ',
        heroSubtitle: 'Stratejik Dijital Reklam Kampanyaları',
        section2Title: 'Hedefleme ve\nSegmentasyon',
        section2Description: 'Doğru kitleye doğru zamanda ulaşarak, reklam bütçenizi en verimli şekilde kullanıyoruz.',
        section3Title: 'A/B Test ve\nOptimizasyon',
        section3Description: 'Sürekli test ve optimizasyonlarla kampanya performansınızı maksimize ediyoruz.',
        section4Title: 'Çok Kanallı\nYaklaşım',
        section4Description: 'Google, Meta, TikTok ve daha fazla platformda entegre kampanyalar yürütüyoruz.',
        ctaTitle: 'Reklamlarınızı\nBüyütmeye Hazır Mısınız?',
        modelUrl: '/models/canoncam/camera.obj'
    },

    'icerik-uretimi': {
        slug: 'icerik-uretimi',
        heroTitle: 'İÇERİKLE\nETKİLE',
        heroSubtitle: 'Profesyonel İçerik Üretim Hizmetleri',
        section2Title: 'Blog ve\nMakale Yazımı',
        section2Description: 'SEO odaklı, bilgilendirici ve okuyucuyu sürükleyen blog yazıları ve makaleler üretiyoruz.',
        section3Title: 'Sosyal Medya\nİçerikleri',
        section3Description: 'Platformlara özel, dikkat çekici ve paylaşılabilir sosyal medya içerikleri oluşturuyoruz.',
        section4Title: 'Video Script ve\nKopyalar',
        section4Description: 'Reklam metinlerinden video senaryolarına kadar tüm yazılı ihtiyaçlarınızı karşılıyoruz.',
        ctaTitle: 'İçerik Stratejinizi\nGüçlendirmeye Hazır Mısınız?',
        modelUrl: '/models/canoncam/camera.obj'
    },

    'etkinlik-yonetimi': {
        slug: 'etkinlik-yonetimi',
        heroTitle: 'ANILARI\nYARAT',
        heroSubtitle: 'Profesyonel Etkinlik Planlama ve Yönetimi',
        section2Title: 'Konsept\nGeliştirme',
        section2Description: 'Markanıza ve hedeflerinize uygun, özgün etkinlik konseptleri tasarlıyoruz.',
        section3Title: 'Lojistik\nPlanlama',
        section3Description: 'Mekan seçiminden teknik altyapıya kadar tüm lojistik detayları profesyonelce yönetiyoruz.',
        section4Title: 'Canlı\nYayın Desteği',
        section4Description: 'Hibrit etkinlikler için profesyonel canlı yayın ve streaming hizmetleri sunuyoruz.',
        ctaTitle: 'Etkinliğinizi\nPlanlamaya Hazır Mısınız?',
        modelUrl: '/models/canoncam/camera.obj'
    }
}

export function getServiceContent(slug: string): ServiceContent | null {
    return serviceContents[slug] || null
}
