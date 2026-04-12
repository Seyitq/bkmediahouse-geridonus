// Service detail page content data for all 8 services
// Full skeleton implementation with Hero, Summary, Deliverables, Packages, Process, FAQ, etc.

import {
    Video, Share2, Fingerprint, Monitor, Camera, Megaphone, PenTool, Calendar,
    Clock, FileCheck, Target, Check, Zap, Users, BarChart3, Palette, Globe,
    Package, Layers, MessageSquare, Mail, Mic, MapPin, Shield, Star
} from 'lucide-react'

export interface ServicePackage {
    name: string
    popular?: boolean
    price?: string
    description: string
    features: string[]
    forWho: string
}

export interface ProcessStep {
    title: string
    description: string
    youDo: string
    weDo: string
}

export interface FAQ {
    question: string
    answer: string
}

export interface CaseStudy {
    title: string
    client: string
    metric?: string
    image?: string
}

export interface ServiceDetailContent {
    slug: string
    title: string
    heroPromise: string
    heroImage: string
    proofChips: string[]

    // Quick summary (3 cards)
    deliverables: string[]
    timeline: string
    processSteps: string[]

    // What you get
    outcomes: string[]

    // Packages
    packages: ServicePackage[]

    // Process timeline
    process: ProcessStep[]

    // Case studies
    caseStudies: CaseStudy[]

    // FAQ
    faqs: FAQ[]

    // Extra modules (service specific)
    extraModules?: {
        type: 'showreel' | 'gallery' | 'calendar' | 'funnel' | 'beforeAfter' | 'checklist'
        data?: any
    }[]
}

export const serviceDetailContents: Record<string, ServiceDetailContent> = {
    'video-produksiyon': {
        slug: 'video-produksiyon',
        title: 'Video Prodüksiyon',
        heroPromise: '2–4 haftada reklam filmi + sosyal medya kesitleri (cut) seti.',
        heroImage: '/hizmetler/video-produksiyon/hero.png',
        proofChips: ['24 saat içinde dönüş', 'Net kapsam + teklif', 'Ölçülebilir sonuç'],

        deliverables: [
            'Ana reklam filmi (16:9)',
            'Sosyal medya kesitleri (9:16, 1:1)',
            'Altyazılı ve altyazısız versiyonlar'
        ],
        timeline: '2-4 hafta',
        processSteps: ['Brief & Moodboard', 'Çekim', 'Kurgu & Teslim'],

        outcomes: [
            '1 adet ana reklam filmi',
            '3-12 adet sosyal medya kesiti',
            'Tüm formatlar (9:16, 1:1, 16:9)',
            'Altyazı setleri',
            'Renk düzeltme & ses miksaj',
            'RAW dosyalar (opsiyonel)'
        ],

        packages: [
            {
                name: 'Starter',
                description: 'Tek lokasyon, hızlı çekim',
                features: [
                    '1 çekim günü',
                    '1 ana video (60 sn)',
                    '3 sosyal medya kesiti',
                    'Temel renk düzeltme',
                    '2 revizyon hakkı'
                ],
                forWho: 'Ürün tanıtımı veya kısa tanıtım videosu ihtiyacı olanlar için'
            },
            {
                name: 'Growth',
                popular: true,
                description: 'Kapsamlı prodüksiyon + full set',
                features: [
                    '1-2 çekim günü',
                    '1 ana video (90 sn)',
                    '8-12 sosyal medya kesiti',
                    'Altyazı seti (TR/EN)',
                    'Profesyonel renk grading',
                    'Ses tasarımı & müzik',
                    '3 revizyon hakkı'
                ],
                forWho: 'Reklam kampanyası veya marka tanıtımı plananlar için'
            },
            {
                name: 'Pro',
                description: 'Yaratıcı konsept + tam prodüksiyon',
                features: [
                    'Çok lokasyonlu çekim',
                    'Drone çekimi dahil',
                    'Yaratıcı konsept geliştirme',
                    'Profesyonel oyuncu/sunucu',
                    'Animasyon & motion graphics',
                    'Tam post-prodüksiyon',
                    'Sınırsız revizyon'
                ],
                forWho: 'Büyük ölçekli kampanya veya TV reklamı plananlar için'
            }
        ],

        process: [
            {
                title: 'Brief & Moodboard',
                description: 'Projeyi anlıyoruz',
                youDo: 'Hedef, mesaj ve örnek beğenilerinizi paylaşın',
                weDo: 'Moodboard + senaryo taslağı hazırlıyoruz'
            },
            {
                title: 'Senaryo & Çekim Planı',
                description: 'Detayları planlıyoruz',
                youDo: 'Senaryo onayı verin',
                weDo: 'Çekim planı, ekip ve ekipman hazırlığı'
            },
            {
                title: 'Çekim',
                description: 'Profesyonel prodüksiyon',
                youDo: 'Çekim gününde hazır olun',
                weDo: 'Tüm çekimleri gerçekleştiriyoruz'
            },
            {
                title: 'Kurgu & Revize',
                description: 'Post-prodüksiyon',
                youDo: 'Geri bildirim verin',
                weDo: 'Kurgu, renk, ses ve revizyonlar'
            },
            {
                title: 'Final Teslim',
                description: 'Tüm dosyalar hazır',
                youDo: 'Dosyaları alın ve kullanın',
                weDo: 'Tüm formatları teslim ediyoruz'
            }
        ],

        caseStudies: [
            { title: 'Marka Tanıtım Filmi', client: 'Teknoloji Şirketi', metric: '%340 etkileşim artışı' },
            { title: 'Ürün Lansmanı', client: 'E-ticaret Markası', metric: '2M+ görüntülenme' },
            { title: 'Sosyal Medya Kampanyası', client: 'Gıda Markası', metric: '%180 takipçi artışı' }
        ],

        faqs: [
            { question: 'Kaç revize hakkım var?', answer: 'Pakete göre 2-sınırsız revizyon hakkınız bulunuyor. Her revize turunda detaylı geri bildirim bekliyoruz.' },
            { question: 'Çekim lokasyonunu kim belirliyor?', answer: 'Birlikte karar veriyoruz. Stüdyo veya dış mekan seçeneklerini değerlendirip en uygun lokasyonu öneriyoruz.' },
            { question: 'Telif hakları kime ait?', answer: 'Tüm haklar size ait. Final videolar tamamen sizin kullanımınız için üretiliyor.' },
            { question: 'Ham dosyaları alabilir miyim?', answer: 'Pro pakette dahil, diğer paketlerde ek ücretle mümkün.' },
            { question: 'Süre uzarsa ne olur?', answer: 'Önceden bildirilen gecikmeler için ek ücret almıyoruz. Beklenmedik durumlarda birlikte çözüm üretiyoruz.' }
        ]
    },

    'sosyal-medya-yonetimi': {
        slug: 'sosyal-medya-yonetimi',
        title: 'Sosyal Medya Yönetimi',
        heroPromise: '30 günde içerik düzeni + topluluk yönetimi + raporlama.',
        heroImage: '/hizmetler/sosyal-medya/hero.png',
        proofChips: ['24 saat içinde dönüş', 'Net kapsam + teklif', 'Ölçülebilir sonuç'],

        deliverables: [
            'Aylık içerik takvimi',
            'Gönderi tasarımları',
            'Topluluk yönetimi'
        ],
        timeline: 'Aylık döngü',
        processSteps: ['Strateji', 'Üretim', 'Yayın & Analiz'],

        outcomes: [
            'Aylık içerik stratejisi',
            '12-30 adet gönderi/ay',
            'Story içerikleri',
            'Topluluk yönetimi (DM/yorum)',
            'Aylık performans raporu',
            'Rakip analizi'
        ],

        packages: [
            {
                name: 'Starter',
                description: 'Temel sosyal medya varlığı',
                features: [
                    'Haftalık içerik planı',
                    '12 gönderi/ay',
                    '1 platform yönetimi',
                    'Temel tasarımlar',
                    'Aylık özet rapor'
                ],
                forWho: 'Yeni başlayan veya küçük işletmeler için'
            },
            {
                name: 'Growth',
                popular: true,
                description: 'Kapsamlı yönetim + büyüme odaklı',
                features: [
                    'Aylık içerik stratejisi',
                    '20 gönderi/ay',
                    '2 platform yönetimi',
                    'Profesyonel tasarımlar',
                    'Story içerikleri',
                    'Topluluk yönetimi',
                    'Performans analizi raporu'
                ],
                forWho: 'Aktif büyümek isteyen markalar için'
            },
            {
                name: 'Pro',
                description: 'Full servis + reklam koordinasyonu',
                features: [
                    'Tam içerik stratejisi',
                    '30+ gönderi/ay',
                    'Tüm platformlar',
                    'Video içerik üretimi',
                    'Influencer koordinasyonu',
                    'Reklam kampanyası yönetimi',
                    'Haftalık raporlama',
                    'Kriz yönetimi'
                ],
                forWho: 'Kurumsal markalar ve aktif kampanya yürütenler için'
            }
        ],

        process: [
            {
                title: 'Strateji & Analiz',
                description: 'Mevcut durumu değerlendiriyoruz',
                youDo: 'Marka bilgilerini ve hedeflerinizi paylaşın',
                weDo: 'Rakip analizi + strateji belgesi hazırlıyoruz'
            },
            {
                title: 'İçerik Planı',
                description: 'Aylık takvim oluşturuyoruz',
                youDo: 'Takvimi onaylayın',
                weDo: 'İçerik fikirleri + görsel konseptler belirliyoruz'
            },
            {
                title: 'Üretim',
                description: 'İçerikleri hazırlıyoruz',
                youDo: 'Gerekli materyalleri sağlayın',
                weDo: 'Tasarım + metin yazımı yapıyoruz'
            },
            {
                title: 'Yayın & Yönetim',
                description: 'Aktif yönetim başlıyor',
                youDo: 'İçerik onaylarını verin',
                weDo: 'Planlı yayın + topluluk yönetimi'
            },
            {
                title: 'Raporlama',
                description: 'Sonuçları değerlendiriyoruz',
                youDo: 'Raporu inceleyin ve geri bildirim verin',
                weDo: 'Performans analizi + öneri raporu'
            }
        ],

        caseStudies: [
            { title: 'Instagram Büyümesi', client: 'Kozmetik Markası', metric: '%250 takipçi artışı' },
            { title: 'Topluluk Oluşturma', client: 'Restoran Zinciri', metric: '10K+ aktif takipçi' },
            { title: 'Viral Kampanya', client: 'Giyim Markası', metric: '5M+ erişim' }
        ],

        faqs: [
            { question: 'İçerikleri kim onaylıyor?', answer: 'Tüm içerikler yayın öncesi size onaya gelir. Değişiklik talep edebilirsiniz.' },
            { question: 'Kaç revize hakkım var?', answer: 'Her içerik için 2 revize hakkınız var. Daha fazlası için konuşabiliriz.' },
            { question: 'Kriz yönetimi var mı?', answer: 'Growth ve Pro paketlerde 7/24 kriz yönetimi desteği sunuyoruz.' },
            { question: 'Raporları ne sıklıkla alırım?', answer: 'Pakete göre haftalık veya aylık raporlama yapıyoruz.' },
            { question: 'Hangi platformları yönetiyorsunuz?', answer: 'Instagram, Facebook, Twitter/X, LinkedIn, TikTok ve YouTube.' }
        ]
    },

    'marka-kimligi': {
        slug: 'marka-kimligi',
        title: 'Marka Kimliği',
        heroPromise: '2–3 haftada tutarlı kimlik: logo + sistem + rehber.',
        heroImage: '/hizmetler/marka-kimligi/hero.png',
        proofChips: ['24 saat içinde dönüş', 'Net kapsam + teklif', 'Ölçülebilir sonuç'],

        deliverables: [
            'Logo tasarımı (tüm varyasyonlar)',
            'Renk paleti + tipografi',
            'Marka kullanım rehberi'
        ],
        timeline: '2-3 hafta',
        processSteps: ['Araştırma', 'Tasarım', 'Rehber & Teslim'],

        outcomes: [
            'Ana logo + varyasyonlar (mono, ikon)',
            'Renk paleti (RGB, CMYK, HEX)',
            'Tipografi sistemi',
            'Marka rehberi (PDF)',
            'Tüm kaynak dosyalar (AI, SVG, PNG)',
            'Sosyal medya şablonları (opsiyonel)'
        ],

        packages: [
            {
                name: 'Starter',
                description: 'Temel marka kimliği',
                features: [
                    '3 logo konsepti',
                    'Seçilen logonun varyasyonları',
                    'Renk paleti',
                    'Tipografi önerisi',
                    'Kaynak dosyalar (AI, PNG, SVG)'
                ],
                forWho: 'Yeni başlayan işletmeler ve startup\'lar için'
            },
            {
                name: 'Growth',
                popular: true,
                description: 'Kapsamlı marka sistemi',
                features: [
                    '5 logo konsepti',
                    'Logo sistemi (primary, secondary, ikon)',
                    'Renk paleti + gradyanlar',
                    'Tipografi hiyerarşisi',
                    'Mini marka rehberi (15 sayfa)',
                    'Kartvizit tasarımı',
                    '3 sosyal medya şablonu'
                ],
                forWho: 'Büyüyen markalar ve yeniden konumlananlar için'
            },
            {
                name: 'Pro',
                description: 'Tam marka kimliği paketi',
                features: [
                    'Sınırsız logo konsepti',
                    'Kapsamlı logo sistemi',
                    'Tam marka rehberi (30+ sayfa)',
                    'Tüm kurumsal materyaller',
                    'Sosyal medya kit (10+ şablon)',
                    'Baskı setleri (zarf, antetli, fatura)',
                    'Ambalaj tasarımı konsepti',
                    'Sunum şablonu'
                ],
                forWho: 'Kurumsal markalar ve kapsamlı yenilenme isteyenler için'
            }
        ],

        process: [
            {
                title: 'Brief & Araştırma',
                description: 'Markayı tanıyoruz',
                youDo: 'Vizyonunuzu ve beğenilerinizi paylaşın',
                weDo: 'Rakip analizi + moodboard hazırlıyoruz'
            },
            {
                title: 'Konsept Geliştirme',
                description: 'Logo alternatifleri sunuyoruz',
                youDo: 'Beğendiğiniz yönü belirleyin',
                weDo: 'Farklı yaklaşımlarla konseptler üretiyoruz'
            },
            {
                title: 'Tasarım Geliştirme',
                description: 'Seçilen konsepti geliştiriyoruz',
                youDo: 'Geri bildirim verin',
                weDo: 'Detaylı tasarım + varyasyonlar'
            },
            {
                title: 'Sistem Oluşturma',
                description: 'Marka sistemini kuruyoruz',
                youDo: 'Kullanım alanlarını belirleyin',
                weDo: 'Renk, tipografi, uygulama örnekleri'
            },
            {
                title: 'Rehber & Teslim',
                description: 'Tüm dosyalar hazır',
                youDo: 'Dosyaları alın ve kullanmaya başlayın',
                weDo: 'Marka rehberi + kaynak dosyaları teslim ediyoruz'
            }
        ],

        caseStudies: [
            { title: 'Marka Yenileme', client: 'Teknoloji Startup', metric: '%200 marka bilinirliği artışı' },
            { title: 'Kurumsal Kimlik', client: 'Hukuk Bürosu', metric: 'Profesyonel imaj dönüşümü' },
            { title: 'Yeni Marka Oluşturma', client: 'E-ticaret Markası', metric: '50K+ sosyal takipçi' }
        ],

        faqs: [
            { question: 'Kaç konsept görüyorum?', answer: 'Pakete göre 3-sınırsız konsept sunuyoruz. Her konsept farklı bir yaklaşım içerir.' },
            { question: 'Telif hakları kime ait?', answer: 'Proje tamamlandığında tüm haklar size devredilir.' },
            { question: 'Kaynak dosyaları alabilir miyim?', answer: 'Evet, AI, SVG, PNG, PDF formatlarında tüm kaynak dosyaları teslim ediyoruz.' },
            { question: 'Revizyon sınırı var mı?', answer: 'Pakete göre 2-sınırsız revizyon hakkınız var.' },
            { question: 'Baskı için destek veriyor musunuz?', answer: 'Evet, baskı dosyalarını hazırlıyor ve matbaa ile koordinasyonu sağlıyoruz.' }
        ]
    },

    'web-tasarim': {
        slug: 'web-tasarim',
        title: 'Web Tasarım',
        heroPromise: 'Hızlı, modern ve dönüşüm odaklı web sitesi.',
        heroImage: '/hizmetler/web-tasarim/hero.png',
        proofChips: ['24 saat içinde dönüş', 'Net kapsam + teklif', 'Ölçülebilir sonuç'],

        deliverables: [
            'Modern responsive web sitesi',
            'SEO temel optimizasyonu',
            'Yönetim paneli'
        ],
        timeline: '2-4 hafta',
        processSteps: ['Tasarım', 'Geliştirme', 'Yayın'],

        outcomes: [
            'Responsive web sitesi (mobil uyumlu)',
            'SEO optimizasyonu',
            'Hız optimizasyonu',
            'İletişim formu',
            'WhatsApp entegrasyonu',
            'Google Analytics kurulumu',
            'SSL sertifikası'
        ],

        packages: [
            {
                name: 'Starter',
                description: 'Tek sayfa landing page',
                features: [
                    '1 sayfa landing page',
                    'Responsive tasarım',
                    'İletişim formu',
                    'WhatsApp butonu',
                    'Temel SEO',
                    'SSL sertifikası'
                ],
                forWho: 'Hızlı dijital varlık isteyen bireyler ve küçük işletmeler için'
            },
            {
                name: 'Growth',
                popular: true,
                description: 'Kurumsal web sitesi',
                features: [
                    '5-7 sayfa kurumsal site',
                    'Modern UI/UX tasarım',
                    'Yönetim paneli (CMS)',
                    'Blog modülü',
                    'SEO optimizasyonu',
                    'Hız optimizasyonu',
                    'Google Analytics',
                    '3 aylık destek'
                ],
                forWho: 'Kurumsal kimlik oluşturmak isteyen işletmeler için'
            },
            {
                name: 'Pro',
                description: 'E-ticaret + gelişmiş özellikler',
                features: [
                    'Sınırsız sayfa',
                    'E-ticaret altyapısı',
                    'Ödeme entegrasyonları',
                    'Çok dil desteği',
                    'Gelişmiş SEO',
                    'CDN + hız optimizasyonu',
                    'API entegrasyonları',
                    '6 aylık destek + bakım'
                ],
                forWho: 'Online satış yapmak isteyen veya kompleks ihtiyaçları olan işletmeler için'
            }
        ],

        process: [
            {
                title: 'Brief & Planlama',
                description: 'İhtiyaçları belirliyoruz',
                youDo: 'İçeriklerinizi ve beğenilerinizi paylaşın',
                weDo: 'Site haritası + wireframe hazırlıyoruz'
            },
            {
                title: 'Tasarım',
                description: 'Görsel tasarımı oluşturuyoruz',
                youDo: 'Tasarımı onaylayın',
                weDo: 'UI/UX tasarımı yapıyoruz'
            },
            {
                title: 'Geliştirme',
                description: 'Siteyi kodluyoruz',
                youDo: 'Test aşamasında geri bildirim verin',
                weDo: 'Frontend + backend geliştirme'
            },
            {
                title: 'Test & Optimizasyon',
                description: 'Her şeyi kontrol ediyoruz',
                youDo: 'Son kontrolleri yapın',
                weDo: 'Hız, SEO, mobil testleri'
            },
            {
                title: 'Yayın',
                description: 'Site yayında!',
                youDo: 'Yönetim panelini kullanmaya başlayın',
                weDo: 'Domain + hosting kurulumu, eğitim'
            }
        ],

        caseStudies: [
            { title: 'Kurumsal Site', client: 'Mimarlık Ofisi', metric: '%400 organik trafik artışı' },
            { title: 'E-ticaret Sitesi', client: 'Moda Markası', metric: '₺500K+ aylık satış' },
            { title: 'Landing Page', client: 'SaaS Startup', metric: '%12 dönüşüm oranı' }
        ],

        faqs: [
            { question: 'İçerikleri kim hazırlıyor?', answer: 'Temel içerik sizden, biz düzenleme ve optimizasyon yapıyoruz. İçerik üretimi ayrıca sunulabilir.' },
            { question: 'Domain ve hosting dahil mi?', answer: 'Kurulum dahil, yıllık yenileme ücreti ayrıca faturalandırılır.' },
            { question: 'Bakım hizmeti var mı?', answer: 'Pakete göre 3-6 ay ücretsiz destek, sonrasında aylık bakım paketi sunuyoruz.' },
            { question: 'Site hızı garantisi var mı?', answer: 'Google PageSpeed 90+ puan hedefliyoruz.' },
            { question: 'Değişiklik yapabilir miyim?', answer: 'Yönetim paneli ile içerik güncellemelerini kendiniz yapabilirsiniz.' }
        ]
    },

    'fotograf-cekimi': {
        slug: 'fotograf-cekimi',
        title: 'Fotoğraf Çekimi',
        heroPromise: '1–2 günde çekim + profesyonel retouch teslim.',
        heroImage: '/hizmetler/fotograf-cekimi/hero.png',
        proofChips: ['24 saat içinde dönüş', 'Net kapsam + teklif', 'Ölçülebilir sonuç'],

        deliverables: [
            'Profesyonel fotoğraflar',
            'Retouch işlemi',
            'Yüksek çözünürlük dosyalar'
        ],
        timeline: '1-2 gün çekim + 3-5 gün teslim',
        processSteps: ['Planlama', 'Çekim', 'Retouch & Teslim'],

        outcomes: [
            'Profesyonel çekilmiş fotoğraflar',
            'Renk düzeltme + retouch',
            'Web ve baskı formatları',
            'Yüksek çözünürlük (300 DPI)',
            'RAW dosyalar (opsiyonel)',
            'Kullanım hakları'
        ],

        packages: [
            {
                name: 'Starter',
                description: 'Hızlı ürün çekimi',
                features: [
                    '10 ürün/kare',
                    'Stüdyo çekimi',
                    'Temel retouch',
                    'Web formatı teslim',
                    '1 gün içinde teslim'
                ],
                forWho: 'E-ticaret ürün fotoğrafı ihtiyacı olanlar için'
            },
            {
                name: 'Growth',
                popular: true,
                description: 'Kapsamlı çekim seti',
                features: [
                    '30 ürün/kare',
                    'Stüdyo veya lokasyon',
                    'Detaylı retouch',
                    'Web + baskı formatları',
                    'Stil önerisi',
                    '3-5 gün teslim'
                ],
                forWho: 'Katalog veya geniş ürün yelpazesi olanlar için'
            },
            {
                name: 'Pro',
                description: 'Konseptli çekim + styling',
                features: [
                    'Sınırsız kare',
                    'Konsept geliştirme',
                    'Profesyonel styling',
                    'Model koordinasyonu',
                    'Lokasyon izinleri',
                    'Premium retouch',
                    'RAW dosyalar dahil'
                ],
                forWho: 'Marka kampanyası veya lookbook çekimi için'
            }
        ],

        process: [
            {
                title: 'Brief & Planlama',
                description: 'Çekim detaylarını belirliyoruz',
                youDo: 'Ürünleri/lokasyonu hazırlayın',
                weDo: 'Çekim planı + ekipman hazırlığı'
            },
            {
                title: 'Çekim',
                description: 'Profesyonel çekim günü',
                youDo: 'Çekim yerinde hazır olun',
                weDo: 'Işık düzeni + profesyonel çekim'
            },
            {
                title: 'Seçim',
                description: 'En iyi kareleri seçiyoruz',
                youDo: 'Beğendiğiniz kareleri işaretleyin',
                weDo: 'Ham çekimlerden seçki sunuyoruz'
            },
            {
                title: 'Retouch',
                description: 'Profesyonel düzenleme',
                youDo: 'Revizyon taleplerini iletin',
                weDo: 'Renk, ışık, detay retouch'
            },
            {
                title: 'Teslim',
                description: 'Dosyalar hazır',
                youDo: 'Dosyaları indirin ve kullanın',
                weDo: 'Tüm formatları organize teslim'
            }
        ],

        caseStudies: [
            { title: 'Kızıl Gece', client: 'Portre Çekimi', metric: 'Profesyonel Stüdyo', image: '/hizmetler/fotograf-cekimi/kizil-gece.jpeg' },
            { title: 'Tutku', client: 'Konsept Çekim', metric: 'Lokasyon Çekimi', image: '/hizmetler/fotograf-cekimi/tutku.jpeg' },
            { title: 'Zamanın Ötesi', client: 'Moda Çekimi', metric: 'Yaratıcı Konsept', image: '/hizmetler/fotograf-cekimi/zamanin-otesi.jpeg' },
            { title: 'Mavi Rüya', client: 'Sanatsal Çekim', metric: 'Işık & Renk Tasarımı', image: '/hizmetler/fotograf-cekimi/mavi-ruya.jpeg' }
        ],

        faqs: [
            { question: 'Stüdyo mu lokasyon mu?', answer: 'Her ikisini de sunuyoruz. Ürün çekimleri için stüdyo, lifestyle için lokasyon öneriyoruz.' },
            { question: 'Kaç kare teslim ediliyor?', answer: 'Pakete göre belirli sayıda seçilen kareler retouch edilip teslim edilir.' },
            { question: 'RAW dosyaları alabilir miyim?', answer: 'Pro pakette dahil, diğerlerinde ek ücretle mümkün.' },
            { question: 'Teslim süresi ne kadar?', answer: 'Pakete göre 1-5 iş günü içinde teslim ediyoruz.' },
            { question: 'Model gerekirse?', answer: 'Pro pakette koordinasyon dahil, diğerlerinde ayrıca organize edilebilir.' }
        ]
    },

    'reklam-kampanyasi': {
        slug: 'reklam-kampanyasi',
        title: 'Reklam Kampanyası',
        heroPromise: '7 günde ölçüm + kampanya seti + optimizasyon planı.',
        heroImage: '/hizmetler/reklam-kampanyasi/hero.png',
        proofChips: ['24 saat içinde dönüş', 'Net kapsam + teklif', 'Ölçülebilir sonuç'],

        deliverables: [
            'Kampanya yönetimi',
            'Ölçüm altyapısı',
            'Performans raporları'
        ],
        timeline: '7 gün kurulum + aylık yönetim',
        processSteps: ['Kurulum', 'Kampanya', 'Optimizasyon'],

        outcomes: [
            'Pixel/tag kurulumu',
            'Dönüşüm takibi',
            'Hedef kitle segmentasyonu',
            'Reklam kreatif setleri',
            'A/B test planı',
            'Haftalık optimizasyon',
            'Performans raporu'
        ],

        packages: [
            {
                name: 'Starter',
                description: 'Tek platform kampanya',
                features: [
                    '1 platform (Google veya Meta)',
                    'Ölçüm kurulumu',
                    '1 kampanya yönetimi',
                    'Haftalık optimizasyon',
                    'Aylık rapor'
                ],
                forWho: 'Dijital reklamı denemek isteyenler için'
            },
            {
                name: 'Growth',
                popular: true,
                description: 'Çoklu kampanya + kreatif',
                features: [
                    '2 platform yönetimi',
                    'Kapsamlı ölçüm altyapısı',
                    '2-3 kampanya',
                    'Kreatif test (A/B)',
                    'Haftalık optimizasyon',
                    'Retargeting kurulumu',
                    'Detaylı performans raporu'
                ],
                forWho: 'Aktif büyüme hedefleyen markalar için'
            },
            {
                name: 'Pro',
                description: 'Full funnel + CRO',
                features: [
                    'Tüm platformlar',
                    'Full funnel stratejisi',
                    'Sınırsız kampanya',
                    'Landing page optimizasyonu',
                    'CRO önerileri',
                    'İleri düzey retargeting',
                    'Haftalık strateji toplantısı',
                    'Gerçek zamanlı dashboard'
                ],
                forWho: 'Yüksek bütçeli kampanyalar ve e-ticaret markaları için'
            }
        ],

        process: [
            {
                title: 'Hedefleme & Strateji',
                description: 'Kampanya planı oluşturuyoruz',
                youDo: 'Hedeflerinizi ve bütçeyi belirleyin',
                weDo: 'Hedef kitle analizi + strateji belgesi'
            },
            {
                title: 'Ölçüm Kurulumu',
                description: 'Takip altyapısı kuruyoruz',
                youDo: 'Site erişimi sağlayın',
                weDo: 'Pixel, tag, dönüşüm kurulumu'
            },
            {
                title: 'Kreatif & Kampanya',
                description: 'Reklamları hazırlıyoruz',
                youDo: 'Görselleri/metinleri onaylayın',
                weDo: 'Ad copy + kreatif set hazırlığı'
            },
            {
                title: 'Yayın & Test',
                description: 'Kampanyalar başlıyor',
                youDo: 'Sonuçları takip edin',
                weDo: 'A/B testleri + ilk optimizasyonlar'
            },
            {
                title: 'Optimizasyon & Raporlama',
                description: 'Sürekli iyileştirme',
                youDo: 'Raporları inceleyin, geri bildirim verin',
                weDo: 'Haftalık optimizasyon + performans raporu'
            }
        ],

        caseStudies: [
            { title: 'E-ticaret Kampanyası', client: 'Moda Markası', metric: 'ROAS 4.2x' },
            { title: 'Lead Generation', client: 'B2B Yazılım', metric: '₺45 / Lead maliyeti' },
            { title: 'Marka Bilinirliği', client: 'Gıda Markası', metric: '2M+ erişim' }
        ],

        faqs: [
            { question: 'Minimum bütçe ne kadar olmalı?', answer: 'Starter için aylık ₺5.000, Growth için ₺15.000, Pro için ₺50.000+ öneriyoruz.' },
            { question: 'Reklam bütçesi dahil mi?', answer: 'Hayır, belirtilen ücretler yönetim ücreti. Reklam bütçesi ayrıca faturalandırılır.' },
            { question: 'Sonuçları ne zaman görürüm?', answer: 'İlk sonuçlar 1-2 hafta, optimize sonuçlar 4-6 hafta içinde görülür.' },
            { question: 'Hangi platformlarda çalışıyorsunuz?', answer: 'Google Ads, Meta (Facebook/Instagram), LinkedIn Ads, TikTok Ads, YouTube Ads.' },
            { question: 'Landing page gerekli mi?', answer: 'Öneriyoruz, ancak mevcut siteniz de kullanılabilir. Pro pakette optimizasyon dahil.' }
        ]
    },

    'icerik-uretimi': {
        slug: 'icerik-uretimi',
        title: 'İçerik Üretimi',
        heroPromise: 'Haftalık üretim: SEO + sosyal + e-posta akışı.',
        heroImage: '/hizmetler/icerik-uretimi/hero.png',
        proofChips: ['24 saat içinde dönüş', 'Net kapsam + teklif', 'Ölçülebilir sonuç'],

        deliverables: [
            'SEO uyumlu blog yazıları',
            'Sosyal medya içerikleri',
            'E-posta pazarlama metinleri'
        ],
        timeline: 'Haftalık/Aylık döngü',
        processSteps: ['Strateji', 'Üretim', 'Teslim'],

        outcomes: [
            'SEO optimizeli blog yazıları',
            'Sosyal medya gönderi metinleri',
            'E-posta newsletter içerikleri',
            'Landing page copy',
            'Ürün açıklamaları',
            'Marka ses tonu rehberi'
        ],

        packages: [
            {
                name: 'Starter',
                description: 'Temel içerik paketi',
                features: [
                    '4 blog yazısı/ay',
                    '8 sosyal medya metni',
                    'Temel SEO optimizasyonu',
                    'Anahtar kelime araştırması'
                ],
                forWho: 'Blog başlatmak isteyen küçük işletmeler için'
            },
            {
                name: 'Growth',
                popular: true,
                description: 'Kapsamlı içerik stratejisi',
                features: [
                    '8 blog yazısı/ay',
                    '16 sosyal medya metni',
                    '4 e-posta içeriği',
                    'SEO stratejisi',
                    'İçerik takvimi',
                    'Rakip içerik analizi'
                ],
                forWho: 'Düzenli içerik üretimi hedefleyen markalar için'
            },
            {
                name: 'Pro',
                description: 'Full içerik operasyonu',
                features: [
                    'Sınırsız blog yazısı',
                    'Tam sosyal medya içeriği',
                    'E-posta pazarlama akışları',
                    'Video script yazımı',
                    'PR & basın bülteni',
                    'Marka ses tonu rehberi',
                    'İçerik performans analizi'
                ],
                forWho: 'Kapsamlı içerik pazarlaması yürüten markalar için'
            }
        ],

        process: [
            {
                title: 'Strateji & Planlama',
                description: 'İçerik yol haritası çiziyoruz',
                youDo: 'Hedeflerinizi ve konuları belirleyin',
                weDo: 'Anahtar kelime araştırması + içerik takvimi'
            },
            {
                title: 'Araştırma',
                description: 'Konuları derinlemesine inceliyoruz',
                youDo: 'Sektör bilgilerini paylaşın',
                weDo: 'Kaynak araştırması + outline hazırlama'
            },
            {
                title: 'Yazım',
                description: 'İçerikleri üretiyoruz',
                youDo: 'İlk taslağı inceleyin',
                weDo: 'SEO uyumlu, akıcı içerik yazımı'
            },
            {
                title: 'Düzenleme',
                description: 'İçeriği optimize ediyoruz',
                youDo: 'Geri bildirim verin',
                weDo: 'Revizyon + SEO optimizasyonu'
            },
            {
                title: 'Teslim',
                description: 'İçerikler hazır',
                youDo: 'Yayınlayın ve performansı takip edin',
                weDo: 'Formatlanmış teslim + performans takibi'
            }
        ],

        caseStudies: [
            { title: 'Blog Stratejisi', client: 'SaaS Şirketi', metric: '%300 organik trafik artışı' },
            { title: 'E-posta Pazarlama', client: 'E-ticaret', metric: '%45 açılma oranı' },
            { title: 'SEO İçerik', client: 'Fintech', metric: 'Top 3 Google sıralaması' }
        ],

        faqs: [
            { question: 'İçerik uzunluğu ne kadar?', answer: 'Blog yazıları 1000-2000 kelime, sosyal medya metinleri platforma göre optimize edilir.' },
            { question: 'Ses tonu nasıl belirleniyor?', answer: 'Marka analizi yaparak 3 farklı ton önerisi sunuyoruz: kurumsal, enerjik veya samimi.' },
            { question: 'Revizyon hakkım var mı?', answer: 'Her içerik için 2 revizyon hakkınız var.' },
            { question: 'Görseller dahil mi?', answer: 'Stok görsel önerileri yapıyoruz, özel görsel üretimi ayrıca fiyatlandırılır.' },
            { question: 'İçerikleri kim onaylıyor?', answer: 'Tüm içerikler yayın öncesi size onaya gelir.' }
        ]
    },

    'etkinlik-yonetimi': {
        slug: 'etkinlik-yonetimi',
        title: 'Etkinlik Yönetimi',
        heroPromise: 'Planlama + operasyon + içerik: uçtan uca etkinlik.',
        heroImage: '/hizmetler/etkinlik-yonetimi/hero.png',
        proofChips: ['24 saat içinde dönüş', 'Net kapsam + teklif', 'Ölçülebilir sonuç'],

        deliverables: [
            'Etkinlik planı',
            'Operasyon yönetimi',
            'İçerik & dokümantasyon'
        ],
        timeline: 'Etkinliğe göre değişir',
        processSteps: ['Planlama', 'Hazırlık', 'Etkinlik & Sonrası'],

        outcomes: [
            'Detaylı etkinlik planı',
            'Mekan & tedarikçi koordinasyonu',
            'Davetiye & iletişim yönetimi',
            'Gün akışı & ekip koordinasyonu',
            'Fotoğraf/video dokümantasyon',
            'Post-event raporu'
        ],

        packages: [
            {
                name: 'Starter',
                description: 'Temel etkinlik koordinasyonu',
                features: [
                    'Etkinlik planı',
                    'Gün akışı hazırlama',
                    'Tedarikçi listesi',
                    'Temel koordinasyon',
                    'Gün içi destek'
                ],
                forWho: 'Küçük toplantı veya workshop düzenleyenler için'
            },
            {
                name: 'Growth',
                popular: true,
                description: 'Kapsamlı etkinlik yönetimi',
                features: [
                    'Full planlama & strateji',
                    'Mekan & tedarikçi yönetimi',
                    'Davetiye tasarımı & gönderimi',
                    'Operasyon yönetimi',
                    'Fotoğraf çekimi dahil',
                    'Post-event raporu'
                ],
                forWho: 'Kurumsal etkinlik veya lansman düzenleyenler için'
            },
            {
                name: 'Pro',
                description: 'Premium etkinlik prodüksiyonu',
                features: [
                    'Konsept geliştirme',
                    'Sponsorluk koordinasyonu',
                    'PR & medya ilişkileri',
                    'Video prodüksiyon dahil',
                    'Canlı yayın desteği',
                    'VIP misafir yönetimi',
                    'Kapsamlı raporlama'
                ],
                forWho: 'Büyük ölçekli lansman, gala veya fuar için'
            }
        ],

        process: [
            {
                title: 'Konsept & Planlama',
                description: 'Etkinliği tasarlıyoruz',
                youDo: 'Hedeflerinizi ve bütçeyi belirleyin',
                weDo: 'Konsept + detaylı plan hazırlıyoruz'
            },
            {
                title: 'Tedarik & Koordinasyon',
                description: 'Her şeyi organize ediyoruz',
                youDo: 'Tedarikçi önerilerini onaylayın',
                weDo: 'Mekan, catering, teknik ekip koordinasyonu'
            },
            {
                title: 'İletişim & Davetiye',
                description: 'Katılımcılara ulaşıyoruz',
                youDo: 'Davetli listesini paylaşın',
                weDo: 'Davetiye tasarımı + RSVP takibi'
            },
            {
                title: 'Etkinlik Günü',
                description: 'Kusursuz uygulama',
                youDo: 'Etkinliğin tadını çıkarın',
                weDo: 'Tüm operasyon + koordinasyon'
            },
            {
                title: 'Post-Event',
                description: 'Değerlendirme & dokümantasyon',
                youDo: 'Geri bildirim verin',
                weDo: 'Fotoğraf/video teslimi + rapor'
            }
        ],

        caseStudies: [
            { title: 'Ürün Lansmanı', client: 'Teknoloji Şirketi', metric: '300+ katılımcı' },
            { title: 'Kurumsal Gala', client: 'Holding', metric: 'VIP 150 misafir' },
            { title: 'Fuar Standı', client: 'İhracat Firması', metric: '1000+ kartvizit' }
        ],

        faqs: [
            { question: 'Ne kadar önceden planlamalıyız?', answer: 'Küçük etkinlikler için 2-4 hafta, büyük etkinlikler için 2-3 ay öneriyoruz.' },
            { question: 'Mekan bulmada yardımcı oluyor musunuz?', answer: 'Evet, bütçe ve konsepte uygun mekan önerileri sunuyoruz.' },
            { question: 'Catering dahil mi?', answer: 'Koordinasyon dahil, catering ücreti ayrıca faturalandırılır.' },
            { question: 'Canlı yayın yapılabilir mi?', answer: 'Pro pakette dahil, diğerlerinde ek hizmet olarak sunulabilir.' },
            { question: 'İptal durumunda ne olur?', answer: 'İptal politikamız sözleşmede belirtilir, genelde T-14 güne kadar %50 iade.' }
        ]
    }
}

export function getServiceDetailContent(slug: string): ServiceDetailContent | null {
    return serviceDetailContents[slug] || null
}
