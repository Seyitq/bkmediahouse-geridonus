'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2, Layers, FileText, Palette, Hash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { createService } from '@/actions/services'

const modelTypes = [
    { value: 'box', label: 'Küp' },
    { value: 'sphere', label: 'Küre' },
    { value: 'cylinder', label: 'Silindir' },
    { value: 'cone', label: 'Koni' },
    { value: 'torus', label: 'Halka' },
    { value: 'octahedron', label: 'Oktahedron' },
    { value: 'dodecahedron', label: 'Dodecahedron' },
    { value: 'icosahedron', label: 'Icosahedron' },
]

const iconOptions = [
    'Video', 'Share2', 'Palette', 'Monitor', 'Camera', 'Megaphone', 'FileText', 'Calendar',
    'Layers', 'Zap', 'Star', 'Heart', 'Target', 'Briefcase', 'Cpu', 'Globe'
]

const effectTypes = [
    { value: 'flash', label: 'Flash (Işık Patlaması)' },
    { value: 'glitch', label: 'Glitch (Bozulma)' },
    { value: 'wireframe', label: 'Wireframe (Tel Kafes)' },
    { value: 'particles', label: 'Particles (Parçacıklar)' },
]

export default function NewServicePage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        longDescription: '',
        icon: 'Layers',
        modelType: 'box',
        modelUrl: '',
        effectType: 'flash',
        color: '#3b82f6',
        features: '',
        order: 0,
        isActive: true,
    })

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
    }

    const handleNameChange = (name: string) => {
        setFormData(prev => ({
            ...prev,
            name,
            slug: generateSlug(name),
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const result = await createService(formData)

            if (!result.success) {
                setError(result.error || 'Hizmet eklenemedi')
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

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/hizmetler">
                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">Yeni Hizmet Ekle</h1>
                    <p className="text-zinc-500">Yeni bir hizmet ve 3D model ekleyin</p>
                </div>
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
                                Hizmetin temel bilgilerini girin
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-zinc-300">Hizmet Adı *</Label>
                                <Input
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => handleNameChange(e.target.value)}
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
