'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2, Layers, FileText, Palette, Hash, Trash2, ImageIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { updateService, deleteService, getServiceById } from '@/actions/services'
import { ImageUploader } from '@/components/admin/image-uploader'

interface PageProps {
    params: Promise<{ id: string }>
}

const iconOptions = [
    'Video', 'Share2', 'Palette', 'Monitor', 'Camera', 'Megaphone', 'FileText', 'Calendar',
    'Layers', 'Zap', 'Star', 'Heart', 'Target', 'Briefcase', 'Cpu', 'Globe'
]

export default function EditServicePage({ params }: PageProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [serviceId, setServiceId] = useState<string>('')

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        longDescription: '',
        icon: 'Layers',
        color: '#3b82f6',
        features: '',
        photos: '[]',
        order: 0,
        isActive: true,
    })

    useEffect(() => {
        async function loadService() {
            const resolvedParams = await params
            setServiceId(resolvedParams.id)

            const result = await getServiceById(resolvedParams.id)
            if (result.success && result.data) {
                setFormData({
                    name: result.data.name,
                    slug: result.data.slug,
                    description: result.data.description,
                    longDescription: result.data.longDescription || '',
                    icon: result.data.icon,
                    color: result.data.color,
                    features: result.data.features || '',
                    photos: result.data.photos || '[]',
                    order: result.data.order,
                    isActive: result.data.isActive,
                })
            } else {
                setError('Hizmet bulunamadı')
            }
            setIsFetching(false)
        }
        loadService()
    }, [params])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const result = await updateService(serviceId, formData)

            if (!result.success) {
                setError(result.error || 'Hizmet güncellenemedi')
                return
            }

            router.push('/admin/hizmetler')
            router.refresh()
        } catch {
            setError('Bir hata oluştu')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) return

        setIsDeleting(true)
        try {
            await deleteService(serviceId)
            router.push('/admin/hizmetler')
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
                    <Link href="/admin/hizmetler">
                        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Hizmet Düzenle</h1>
                        <p className="text-zinc-500">Hizmet bilgilerini güncelleyin</p>
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

                <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="border-zinc-800 bg-zinc-900/50">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Layers className="h-5 w-5" />
                                Temel Bilgiler
                            </CardTitle>
                            <CardDescription className="text-zinc-500">
                                Hizmetin temel bilgilerini düzenleyin
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-zinc-300">Hizmet Adı *</Label>
                                <Input
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className="bg-zinc-800/50 border-zinc-700 text-white"
                                    placeholder="Video Prodüksiyon"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug" className="text-zinc-300">Slug *</Label>
                                <div className="relative">
                                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                    <Input
                                        id="slug"
                                        required
                                        value={formData.slug}
                                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                        className="pl-10 bg-zinc-800/50 border-zinc-700 text-white"
                                        placeholder="video-produksiyon"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-zinc-300">Kısa Açıklama *</Label>
                                <Textarea
                                    id="description"
                                    required
                                    rows={2}
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    className="bg-zinc-800/50 border-zinc-700 text-white resize-none"
                                    placeholder="Hizmetin kısa açıklaması..."
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="longDescription" className="text-zinc-300">Detaylı Açıklama</Label>
                                <Textarea
                                    id="longDescription"
                                    rows={4}
                                    value={formData.longDescription}
                                    onChange={(e) => setFormData(prev => ({ ...prev, longDescription: e.target.value }))}
                                    className="bg-zinc-800/50 border-zinc-700 text-white resize-none"
                                    placeholder="Hizmet detay sayfası için uzun açıklama..."
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="features" className="text-zinc-300">Özellikler (virgülle ayırın)</Label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                                    <Textarea
                                        id="features"
                                        rows={2}
                                        value={formData.features}
                                        onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                                        className="pl-10 bg-zinc-800/50 border-zinc-700 text-white resize-none"
                                        placeholder="Profesyonel ekipman, Hızlı teslimat, 4K çekim..."
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-zinc-800 bg-zinc-900/50">
                        <CardHeader>
                            <CardTitle className="text-white">Durum</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="isActive" className="text-zinc-300">Aktif</Label>
                                    <p className="text-sm text-zinc-500">Hizmet görünür olsun mu?</p>
                                </div>
                                <Switch
                                    id="isActive"
                                    checked={formData.isActive}
                                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Service Photos */}
                    <Card className="border-zinc-800 bg-zinc-900/50">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <ImageIcon className="h-5 w-5" />
                                Hizmet Fotoğrafları
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ImageUploader
                                multiple
                                values={(() => {
                                    try {
                                        return JSON.parse(formData.photos || '[]')
                                    } catch {
                                        return []
                                    }
                                })()}
                                onMultiChange={(urls) => setFormData(prev => ({ ...prev, photos: JSON.stringify(urls) }))}
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={isLoading || !formData.name || !formData.slug || !formData.description}
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
