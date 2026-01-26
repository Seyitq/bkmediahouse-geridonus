'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Error:', error)
    }, [error])

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="text-center max-w-md">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-4">Bir Hata Oluştu</h1>
                <p className="text-zinc-400 mb-8">
                    Sayfa yüklenirken beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        onClick={reset}
                        className="bg-white text-black hover:bg-zinc-200"
                    >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Tekrar Dene
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => window.location.href = '/'}
                        className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                    >
                        Ana Sayfaya Git
                    </Button>
                </div>
            </div>
        </div>
    )
}
