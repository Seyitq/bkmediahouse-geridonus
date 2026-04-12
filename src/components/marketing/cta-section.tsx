import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTASection() {
    return (
        <section className="py-24 relative overflow-hidden bg-zinc-50">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-50 via-transparent to-transparent" />

            <div className="container relative z-10 px-4 mx-auto text-center">
                <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tighter mb-8 max-w-3xl mx-auto">
                    Bir Sonraki Projenizi<br />
                    <span className="text-blue-600">Birlikte Tasarlayalım</span>
                </h2>
                <p className="text-xl text-zinc-500 mb-10 max-w-2xl mx-auto">
                    Siz hayal edin, biz gerçekleştirelim. Markanızı bir adım öne taşımak için hazırız.
                </p>
                <Link href="/booking">
                    <Button size="lg" className="h-16 px-10 text-xl bg-zinc-900 text-white hover:bg-zinc-800 rounded-full shadow-lg">
                        Hemen İletişime Geçin
                        <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                </Link>
            </div>
        </section>
    )
}
