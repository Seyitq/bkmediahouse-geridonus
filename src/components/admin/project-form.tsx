'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Save, Loader2, ImageIcon, Trash2, TrendingUp, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { updateProject, deleteProject } from '@/actions/projects'
import { SERVICES, SERVICE_LABELS } from '@/lib/validations/inquiry'
import { ImageUploader } from '@/components/admin/image-uploader'

interface Project {
    id: string
    title: string
    slug: string
    clientName: string
    coverImage: string
    images: string
    description: string
    challenge: string | null
    solution: string | null
    result: string | null
    servicesProvided: string
    stats: string | null
    featured: boolean
    publishedAt: Date | null
}

interface ProjectFormData {
    title: string
    slug: string
    clientName: string
    coverImage: string
    description: string
    challenge: string
    solution: string
    result: string
}

export function EditProjectForm({ project }: { project: Project }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedServices, setSelectedServices] = useState<string[]>([])
    const [stats, setStats] = useState<{ label: string; value: string }[]>([])
    const [coverImage, setCoverImage] = useState(project.coverImage || '')
    const [galleryImages, setGalleryImages] = useState<string[]>(() => {
        try {
            return JSON.parse(project.images || '[]')
        } catch {
            return []
        }
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProjectFormData>({
        defaultValues: {
            title: project.title,
            slug: project.slug,
            clientName: project.clientName,
            coverImage: project.coverImage,
            description: project.description,
            challenge: project.challenge || '',
            solution: project.solution || '',
            result: project.result || '',
        },
    })

    useEffect(() => {
        try {
            const services = JSON.parse(project.servicesProvided || '[]')
            setSelectedServices(services)
        } catch {
            setSelectedServices([])
        }

        // Initialize stats from project
        try {
            const statsData = project.stats ? JSON.parse(project.stats) : {}
            const statsArray = Object.entries(statsData).map(([label, value]) => ({
                label,
                value: String(value)
            }))
            setStats(statsArray)
        } catch {
            setStats([])
        }
    }, [project.servicesProvided, project.stats])

    const toggleService = (service: string) => {
        const newServices = selectedServices.includes(service)
            ? selectedServices.filter((s) => s !== service)
            : [...selectedServices, service]
        setSelectedServices(newServices)
    }

    const addStat = () => {
        setStats([...stats, { label: '', value: '' }])
    }

    const removeStat = (index: number) => {
        setStats(stats.filter((_, i) => i !== index))
    }

    const updateStat = (index: number, field: 'label' | 'value', value: string) => {
        const newStats = [...stats]
        newStats[index][field] = value
        setStats(newStats)
    }

    const onSubmit = async (data: ProjectFormData) => {
        setIsLoading(true)
        setError(null)

        try {
            // Convert stats array to object
            const statsObject: Record<string, string> = {}
            stats.forEach(stat => {
                if (stat.label && stat.value) {
                    statsObject[stat.label] = stat.value
                }
            })

            const result = await updateProject({
                id: project.id,
                ...data,
                coverImage,
                servicesProvided: selectedServices,
                images: galleryImages,
                stats: Object.keys(statsObject).length > 0 ? statsObject : undefined,
            })

            if (!result.success) {
                setError(result.error || 'Proje güncellenemedi')
                return
            }

            router.push('/admin/projeler')
            router.refresh()
        } catch {
            setError('Bir hata oluştu')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm('Bu projeyi silmek istediğinize emin misiniz?')) return

        setIsDeleting(true)
        try {
            const result = await deleteProject(project.id)
            if (!result.success) {
                setError(result.error || 'Proje silinemedi')
                return
            }
            router.push('/admin/projeler')
            router.refresh()
        } catch {
            setError('Bir hata oluştu')
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400"
                >
                    {error}
                </motion.div>
            )}

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <Card className="border-zinc-200 bg-white">
                        <CardHeader>
                            <CardTitle className="text-zinc-900">Temel Bilgiler</CardTitle>
                            <CardDescription className="text-zinc-500">
                                Projenin temel bilgilerini düzenleyin
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-zinc-700">Proje Başlığı</Label>
                                    <Input
                                        id="title"
                                        className="bg-zinc-100/50 border-zinc-700 text-white"
                                        {...register('title')}
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-red-400">{errors.title.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug" className="text-zinc-700">URL Slug</Label>
                                    <Input
                                        id="slug"
                                        className="bg-zinc-100/50 border-zinc-700 text-white"
                                        {...register('slug')}
                                    />
                                    {errors.slug && (
                                        <p className="text-sm text-red-400">{errors.slug.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="clientName" className="text-zinc-700">Müşteri Adı</Label>
                                <Input
                                    id="clientName"
                                    className="bg-zinc-100/50 border-zinc-700 text-white"
                                    {...register('clientName')}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-zinc-700">Açıklama</Label>
                                <Textarea
                                    id="description"
                                    rows={4}
                                    className="bg-zinc-100/50 border-zinc-700 text-white resize-none"
                                    {...register('description')}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Case Study Details */}
                    <Card className="border-zinc-200 bg-white">
                        <CardHeader>
                            <CardTitle className="text-zinc-900">Vaka Çalışması Detayları</CardTitle>
                            <CardDescription className="text-zinc-500">
                                Zorluk, Çözüm ve Sonuç formatında detaylar
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="challenge" className="text-zinc-700">Zorluk</Label>
                                <Textarea
                                    id="challenge"
                                    rows={3}
                                    className="bg-zinc-100/50 border-zinc-700 text-white resize-none"
                                    {...register('challenge')}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="solution" className="text-zinc-700">Çözüm</Label>
                                <Textarea
                                    id="solution"
                                    rows={3}
                                    className="bg-zinc-100/50 border-zinc-700 text-white resize-none"
                                    {...register('solution')}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="result" className="text-zinc-700">Sonuç</Label>
                                <Textarea
                                    id="result"
                                    rows={3}
                                    className="bg-zinc-100/50 border-zinc-700 text-white resize-none"
                                    {...register('result')}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats/Results */}
                    <Card className="border-zinc-200 bg-white">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Sonuçlar / İstatistikler
                            </CardTitle>
                            <CardDescription className="text-zinc-500">
                                Proje sonuçlarını yüzdelik olarak girin
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="flex gap-2 items-start">
                                    <div className="flex-1">
                                        <Input
                                            placeholder="İstatistik Adı"
                                            value={stat.label}
                                            onChange={(e) => updateStat(index, 'label', e.target.value)}
                                            className="bg-zinc-100/50 border-zinc-700 text-white"
                                        />
                                    </div>
                                    <div className="w-24">
                                        <Input
                                            placeholder="%150"
                                            value={stat.value}
                                            onChange={(e) => updateStat(index, 'value', e.target.value)}
                                            className="bg-zinc-100/50 border-zinc-700 text-white"
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeStat(index)}
                                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={addStat}
                                className="w-full border-zinc-700 text-zinc-400 hover:text-zinc-900"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                İstatistik Ekle
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Cover Image */}
                    <Card className="border-zinc-200 bg-white">
                        <CardHeader>
                            <CardTitle className="text-white text-base">Kapak Görseli</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ImageUploader
                                value={coverImage}
                                onChange={setCoverImage}
                            />
                        </CardContent>
                    </Card>

                    {/* Gallery Images */}
                    <Card className="border-zinc-200 bg-white">
                        <CardHeader>
                            <CardTitle className="text-white text-base">Proje Görselleri</CardTitle>
                            <CardDescription className="text-zinc-500">
                                Birden fazla görsel ekleyebilirsiniz
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ImageUploader
                                multiple
                                values={galleryImages}
                                onMultiChange={setGalleryImages}
                            />
                        </CardContent>
                    </Card>

                    {/* Services */}
                    <Card className="border-zinc-200 bg-white">
                        <CardHeader>
                            <CardTitle className="text-white text-base">Sunulan Hizmetler</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {SERVICES.map((service) => (
                                    <Badge
                                        key={service}
                                        variant="outline"
                                        className={`cursor-pointer transition-colors ${selectedServices.includes(service)
                                            ? 'bg-white text-zinc-900 border-white'
                                            : 'text-zinc-400 border-zinc-700 hover:border-zinc-500'
                                            }`}
                                        onClick={() => toggleService(service)}
                                    >
                                        {SERVICE_LABELS[service]}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Status */}
                    <Card className="border-zinc-200 bg-white">
                        <CardHeader>
                            <CardTitle className="text-white text-base">Durum</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-zinc-400">Yayın Durumu</span>
                                <Badge variant="outline" className={project.publishedAt ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'}>
                                    {project.publishedAt ? 'Yayında' : 'Taslak'}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-zinc-400">Öne Çıkan</span>
                                <Badge variant="outline" className={project.featured ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'}>
                                    {project.featured ? 'Evet' : 'Hayır'}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <Card className="border-zinc-200 bg-white">
                        <CardContent className="pt-6 space-y-3">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-zinc-50 text-white hover:bg-zinc-100"
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
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isDeleting}
                                onClick={handleDelete}
                                className="w-full border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-400"
                            >
                                {isDeleting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Siliniyor...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Projeyi Sil
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    )
}
