import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTASection() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-900/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            <div className="container relative z-10 px-4 mx-auto text-center">
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-8 max-w-3xl mx-auto">
                    Bir Sonraki Projenizi<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Birlikte Tasarlayalım</span>
                </h2>
                <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
                    Siz hayal edin, biz gerçekleştirelim. Markanızı bir adım öne taşımak için hazırız.
                </p>
                <Link href="/booking">
                    <Button size="lg" className="h-16 px-10 text-xl bg-white text-black hover:bg-zinc-200 rounded-full">
                        Hemen İletişime Geçin
                        <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                </Link>
            </div>
        </section>
    )
}
