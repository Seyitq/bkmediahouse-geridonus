import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-[#09090b] pt-20 pb-10 border-t border-zinc-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="footer-col-brand space-y-6">
                        <Link href="/" className="block">
                            <Image
                                src="/bk-logo.png"
                                alt="BK Media House"
                                width={56}
                                height={56}
                                className="h-14 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-zinc-400 max-w-xs leading-relaxed">
                            Markanızın dijital dünyadaki potansiyelini modern tasarım ve stratejik içerik ile açığa çıkarıyoruz.
                        </p>
                    </div>

                    {/* Nav Column */}
                    <div className="footer-col-nav space-y-6">
                        <h4 className="text-white font-semibold">Site Haritası</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-zinc-400 hover:text-white transition-colors">Anasayfa</Link>
                            </li>
                            <li>
                                <Link href="/calismalar" className="text-zinc-400 hover:text-white transition-colors">Çalışmalar</Link>
                            </li>
                            <li>
                                <Link href="/hizmetler" className="text-zinc-400 hover:text-white transition-colors">Hizmetler</Link>
                            </li>
                            <li>
                                <Link href="/iletisim" className="text-zinc-400 hover:text-white transition-colors">İletişim</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="footer-col-contact space-y-6">
                        <h4 className="text-white font-semibold">Bize Ulaşın</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-zinc-400">
                                <Mail className="h-5 w-5 shrink-0 mt-0.5" />
                                <a href="mailto:info@bkmediahouse.com.tr" className="hover:text-white transition-colors">
                                    info@bkmediahouse.com.tr
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-zinc-400">
                                <Phone className="h-5 w-5 shrink-0 mt-0.5" />
                                <a href="tel:+905412717795" className="hover:text-white transition-colors">
                                    +90 541 271 77 95
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-zinc-400">
                                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                                <span>
                                    Selçuklu, Konya, Türkiye
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* CTA Column */}
                    <div className="footer-col-cta space-y-6">
                        <h4 className="text-white font-semibold">Projeniz mi var?</h4>
                        <p className="text-zinc-400">
                            Bizimle çalışmak için hemen bir randevu oluşturun veya teklif alın.
                        </p>
                        <Link href="/booking">
                            <Button className="w-full bg-white text-zinc-900 hover:bg-zinc-200 group">
                                Hemen Başlayın
                                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </div>

                <Separator className="bg-zinc-800 mb-8" />

                {/* Google Maps */}
                <div className="mb-8 rounded-xl overflow-hidden border border-zinc-800">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25150.489285149884!2d32.551607880114744!3d38.00486494691209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x65bde36cdde7320f%3A0xcb7164630e7c473c!2sBK%20Media%20House!5e0!3m2!1str!2str!4v1776981738835!5m2!1str!2str"
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="BK Media House Konum"
                    />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-sm">
                    <p>© {currentYear} BK Media House. Tüm hakları saklıdır.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Gizlilik Politikası</Link>
                        <Link href="/terms" className="hover:text-zinc-300 transition-colors">Kullanım Şartları</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
