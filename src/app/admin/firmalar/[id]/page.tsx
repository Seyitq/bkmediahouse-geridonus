'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2, Building2, Link2, Image as ImageIcon, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { updateTrustedCompany, deleteTrustedCompany, getTrustedCompanyById } from '@/actions/social-proof'

interface PageProps {
    params: Promise<{ id: string }>
}

export default function EditCompanyPage({ params }: PageProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [companyId, setCompanyId] = useState<string>('')

    const [formData, setFormData] = useState({
        name: '',
        logoUrl: '',
        websiteUrl: '',
        order: 0,
        isActive: true,
    })

    useEffect(() => {
        async function loadCompany() {
            const resolvedParams = await params
            setCompanyId(resolvedParams.id)

            const result = await getTrustedCompanyById(resolvedParams.id)
            if (result.success && result.data) {
                setFormData({
                    name: result.data.name,
                    logoUrl: result.data.logoUrl,
                    websiteUrl: result.data.websiteUrl || '',
                    order: result.data.order,
                    isActive: result.data.isActive,
                })
            } else {
                setError('Firma bulunamadı')
            }
            setIsFetching(false)
        }
        loadCompany()
    }, [params])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const result = await updateTrustedCompany(companyId, formData)

            if (!result.success) {
                setError(result.error || 'Firma güncellenemedi')
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

    const handleDelete = async () => {
        if (!confirm('Bu firmayı silmek istediğinizden emin misiniz?')) return

        setIsDeleting(true)
        try {
            await deleteTrustedCompany(companyId)
            router.push('/admin/firmalar')
            router.refresh()
        } catch {
            setError('Silme işlemi başarısız')
        } finally {
            setIsDeleting(false)
        }
    }

    if (isFetching) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/firmalar">
                        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Firma Düzenle</h1>
                        <p className="text-zinc-500">Firma bilgilerini güncelleyin</p>
                    </div>
                </div>
                <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isDeleting}
                >
                    {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 mr-2" />}
                    Sil
                </Button>
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
                            Firma detaylarını düzenleyin
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-zinc-300">Firma Adı *</Label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                <Input
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className="pl-10 bg-zinc-800/50 border-zinc-700 text-white"
                                    placeholder="Firma Adı"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="logoUrl" className="text-zinc-300">Logo URL *</Label>
                            <div className="relative">
                                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                <Input
                                    id="logoUrl"
                                    required
                                    value={formData.logoUrl}
                                    onChange={(e) => setFormData(prev => ({ ...prev, logoUrl: e.target.value }))}
                                    className="pl-10 bg-zinc-800/50 border-zinc-700 text-white"
                                    placeholder="https://example.com/logo.png"
                                />
                            </div>
                            <p className="text-xs text-zinc-500">URL https:// ile başlamalıdır</p>
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
