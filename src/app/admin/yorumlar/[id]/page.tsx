'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2, MessageCircle, User, Building2, Star, Image as ImageIcon, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { updateTestimonial, deleteTestimonial, getTestimonialById } from '@/actions/social-proof'

interface PageProps {
    params: Promise<{ id: string }>
}

export default function EditTestimonialPage({ params }: PageProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [testimonialId, setTestimonialId] = useState<string>('')

    const [formData, setFormData] = useState({
        name: '',
        title: '',
        company: '',
        content: '',
        photoUrl: '',
        rating: 5,
        order: 0,
        isActive: true,
    })

    useEffect(() => {
        async function loadTestimonial() {
            const resolvedParams = await params
            setTestimonialId(resolvedParams.id)

            const result = await getTestimonialById(resolvedParams.id)
            if (result.success && result.data) {
                setFormData({
                    name: result.data.name,
                    title: result.data.title,
                    company: result.data.company || '',
                    content: result.data.content,
                    photoUrl: result.data.photoUrl || '',
                    rating: result.data.rating,
                    order: result.data.order,
                    isActive: result.data.isActive,
                })
            } else {
                setError('Yorum bulunamadı')
            }
            setIsFetching(false)
        }
        loadTestimonial()
    }, [params])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const result = await updateTestimonial(testimonialId, formData)

            if (!result.success) {
                setError(result.error || 'Yorum güncellenemedi')
                return
            }

            router.push('/admin/yorumlar')
            router.refresh()
        } catch {
            setError('Bir hata oluştu')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm('Bu yorumu silmek istediğinizden emin misiniz?')) return

        setIsDeleting(true)
        try {
            await deleteTestimonial(testimonialId)
            router.push('/admin/yorumlar')
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
                    <Link href="/admin/yorumlar">
                        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-900">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-900">Yorum Düzenle</h1>
                        <p className="text-zinc-500">Müşteri yorumunu güncelleyin</p>
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

                <Card className="border-zinc-200 bg-white">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <MessageCircle className="h-5 w-5" />
                            Yorum Bilgileri
                        </CardTitle>
                        <CardDescription className="text-zinc-500">
                            Müşteri yorumunun detaylarını düzenleyin
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-zinc-700">İsim *</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                    <Input
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className="pl-10 bg-zinc-100/50 border-zinc-700 text-white"
                                        placeholder="Ahmet Yılmaz"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-zinc-700">Unvan *</Label>
                                <Input
                                    id="title"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    className="bg-zinc-100/50 border-zinc-700 text-white"
                                    placeholder="CEO"
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="company" className="text-zinc-700">Şirket</Label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                    <Input
                                        id="company"
                                        value={formData.company}
                                        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                                        className="pl-10 bg-zinc-100/50 border-zinc-700 text-white"
                                        placeholder="ABC Şirketi"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="photoUrl" className="text-zinc-700">Fotoğraf URL</Label>
                                <div className="relative">
                                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                    <Input
                                        id="photoUrl"
                                        value={formData.photoUrl}
                                        onChange={(e) => setFormData(prev => ({ ...prev, photoUrl: e.target.value }))}
                                        className="pl-10 bg-zinc-100/50 border-zinc-700 text-white"
                                        placeholder="https://example.com/photo.jpg"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content" className="text-zinc-700">Yorum *</Label>
                            <Textarea
                                id="content"
                                required
                                rows={4}
                                value={formData.content}
                                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                className="bg-zinc-100/50 border-zinc-700 text-white resize-none"
                                placeholder="Müşterinin yorumunu buraya yazın..."
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="text-zinc-700">Puan</Label>
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                                            className="focus:outline-none"
                                        >
                                            <Star
                                                className={`h-6 w-6 transition-colors ${star <= formData.rating
                                                        ? 'fill-yellow-500 text-yellow-500'
                                                        : 'text-zinc-600 hover:text-yellow-500/50'
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="order" className="text-zinc-700">Sıralama</Label>
                                <Input
                                    id="order"
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                                    className="bg-zinc-100/50 border-zinc-700 text-white w-32"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            <div>
                                <Label htmlFor="isActive" className="text-zinc-700">Aktif</Label>
                                <p className="text-sm text-zinc-500">Yorum ana sayfada gösterilsin mi?</p>
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
                        disabled={isLoading || !formData.name || !formData.title || !formData.content}
                        className="bg-zinc-900 text-white hover:bg-zinc-800 min-w-[150px]"
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
