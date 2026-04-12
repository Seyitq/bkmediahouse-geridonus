import Link from 'next/link'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-white pt-20 pb-10 border-t border-zinc-200">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="footer-col-brand space-y-6">
                        <Link href="/" className="block">
                            <span className="text-2xl font-bold tracking-tight text-zinc-900">
                                New Social<span className="text-blue-600">.</span>
                            </span>
                        </Link>
                        <p className="text-zinc-500 max-w-xs leading-relaxed">
                            Markanızın dijital dünyadaki potansiyelini modern tasarım ve stratejik içerik ile açığa çıkarıyoruz.
                        </p>
                    </div>

                    {/* Nav Column */}
                    <div className="footer-col-nav space-y-6">
                        <h4 className="text-zinc-900 font-semibold">Site Haritası</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-zinc-500 hover:text-zinc-900 transition-colors">Anasayfa</Link>
                            </li>
                            <li>
                                <Link href="/calismalar" className="text-zinc-500 hover:text-zinc-900 transition-colors">Çalışmalar</Link>
                            </li>
                            <li>
                                <Link href="/hizmetler" className="text-zinc-500 hover:text-zinc-900 transition-colors">Hizmetler</Link>
                            </li>
                            <li>
                                <Link href="/iletisim" className="text-zinc-500 hover:text-zinc-900 transition-colors">İletişim</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="footer-col-contact space-y-6">
                        <h4 className="text-zinc-900 font-semibold">Bize Ulaşın</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-zinc-500">
                                <Mail className="h-5 w-5 shrink-0 mt-0.5" />
                                <a href="mailto:info@newsocialankara.com" className="hover:text-zinc-900 transition-colors">
                                    info@newsocialankara.com
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-zinc-500">
                                <Phone className="h-5 w-5 shrink-0 mt-0.5" />
                                <a href="tel:+905309303276" className="hover:text-zinc-900 transition-colors">
                                    +90 530 930 32 76
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-zinc-500">
                                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                                <span>
                                    Ankara, Türkiye
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* CTA Column */}
                    <div className="footer-col-cta space-y-6">
                        <h4 className="text-zinc-900 font-semibold">Projeniz mi var?</h4>
                        <p className="text-zinc-500">
                            Bizimle çalışmak için hemen bir randevu oluşturun veya teklif alın.
                        </p>
                        <Link href="/booking">
                            <Button className="w-full bg-zinc-900 text-white hover:bg-zinc-800 group">
                                Hemen Başlayın
                                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </div>

                <Separator className="bg-zinc-200 mb-8" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-400 text-sm">
                    <p>© {currentYear} New Social Agency. Tüm hakları saklıdır.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-zinc-600 transition-colors">Gizlilik Politikası</Link>
                        <Link href="/terms" className="hover:text-zinc-600 transition-colors">Kullanım Şartları</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
