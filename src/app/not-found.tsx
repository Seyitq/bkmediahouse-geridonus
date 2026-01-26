import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileQuestion, Home } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="text-center max-w-md">
                <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-6">
                    <FileQuestion className="w-8 h-8 text-zinc-500" />
                </div>
                <h1 className="text-6xl font-bold text-white mb-4">404</h1>
                <h2 className="text-xl font-medium text-zinc-400 mb-2">Sayfa Bulunamadı</h2>
                <p className="text-zinc-500 mb-8">
                    Aradığınız sayfa mevcut değil veya taşınmış olabilir.
                </p>
                <Link href="/">
                    <Button className="bg-white text-black hover:bg-zinc-200">
                        <Home className="mr-2 h-4 w-4" />
                        Ana Sayfaya Dön
                    </Button>
                </Link>
            </div>
        </div>
    )
}
