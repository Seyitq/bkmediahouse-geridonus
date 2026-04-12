'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2, Building2, Link2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { ImageUploader } from '@/components/admin/image-uploader'
import { createTrustedCompany } from '@/actions/social-proof'

export default function NewCompanyPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        name: '',
        logoUrl: '',
        websiteUrl: '',
        order: 0,
        isActive: true,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const result = await createTrustedCompany(formData)

            if (!result.success) {
                setError(result.error || 'Firma eklenemedi')
                return
            }

            router.push('/admin/firmalar')
            router.refresh()
        } catch {
            setError('Bir hata oluştu')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/firmalar">
                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">Yeni Firma Ekle</h1>
                    <p className="text-zinc-500">Referans firmaları listesine yeni firma ekleyin</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                        {error}
                    </div>
                )}

                <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Building2 className="h-5 w-5" />
                            Firma Bilgileri
                        </CardTitle>
                        <CardDescription className="text-zinc-500">
                            Firmanın temel bilgilerini girin
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-zinc-300">Firma Adı *</Label>
                            <Input
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="bg-zinc-800/50 border-zinc-700 text-white"
                                placeholder="Örn: Google"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-zinc-300">Firma Logosu *</Label>
                            <ImageUploader
                                value={formData.logoUrl}
                                onChange={(url) => setFormData(prev => ({ ...prev, logoUrl: url }))}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="websiteUrl" className="text-zinc-300">Website URL</Label>
                            <div className="relative">
                                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                <Input
                                    id="websiteUrl"
                                    value={formData.websiteUrl}
                                    onChange={(e) => setFormData(prev => ({ ...prev, websiteUrl: e.target.value }))}
                                    className="pl-10 bg-zinc-800/50 border-zinc-700 text-white"
                                    placeholder="https://example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="order" className="text-zinc-300">Sıralama</Label>
                            <Input
                                id="order"
                                type="number"
                                value={formData.order}
                                onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                                className="bg-zinc-800/50 border-zinc-700 text-white w-32"
                            />
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            <div>
                                <Label htmlFor="isActive" className="text-zinc-300">Aktif</Label>
                                <p className="text-sm text-zinc-500">Firma ana sayfada gösterilsin mi?</p>
                            </div>
                            <Switch
                                id="isActive"
                                checked={formData.isActive}
                                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={isLoading || !formData.name || !formData.logoUrl}
                        className="bg-white text-zinc-900 hover:bg-zinc-200 min-w-[150px]"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Kaydediliyor...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Kaydet
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}
