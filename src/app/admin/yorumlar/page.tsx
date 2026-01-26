import { db } from '@/lib/db'

// Force dynamic rendering to prevent build-time database calls
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, MessageCircle, Star, MoreHorizontal, Trash2, Eye, EyeOff, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { deleteTestimonial, toggleTestimonialActive } from '@/actions/social-proof'
import { revalidatePath } from 'next/cache'

async function getTestimonials() {
    return await db.testimonial.findMany({
        orderBy: { order: 'asc' },
    })
}

export default async function TestimonialsPage() {
    const testimonials = await getTestimonials()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Müşteri Yorumları</h1>
                    <p className="text-zinc-500">Müşteri referanslarını yönetin</p>
                </div>
                <Link href="/admin/yorumlar/yeni">
                    <Button className="bg-white text-zinc-900 hover:bg-zinc-200">
                        <Plus className="mr-2 h-4 w-4" />
                        Yeni Yorum Ekle
                    </Button>
                </Link>
            </div>

            <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                    <CardTitle className="text-white">Tüm Yorumlar</CardTitle>
                    <CardDescription className="text-zinc-500">
                        Ana sayfada gösterilecek müşteri yorumları
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {testimonials.length === 0 ? (
                        <div className="text-center py-12">
                            <MessageCircle className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
                            <p className="text-zinc-500">Henüz yorum eklenmemiş.</p>
                            <Link href="/admin/yorumlar/yeni" className="mt-4 inline-block">
                                <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white">
                                    İlk Yorumu Ekle
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="border-zinc-800 hover:bg-transparent">
                                    <TableHead className="text-zinc-400">Fotoğraf</TableHead>
                                    <TableHead className="text-zinc-400">Kişi</TableHead>
                                    <TableHead className="text-zinc-400">Yorum</TableHead>
                                    <TableHead className="text-zinc-400">Puan</TableHead>
                                    <TableHead className="text-zinc-400">Durum</TableHead>
                                    <TableHead className="text-zinc-400 text-right">İşlemler</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {testimonials.map((testimonial) => (
                                    <TableRow key={testimonial.id} className="border-zinc-800">
                                        <TableCell>
                                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
                                                {testimonial.photoUrl ? (
                                                    <Image
                                                        src={testimonial.photoUrl}
                                                        alt={testimonial.name}
                                                        width={40}
                                                        height={40}
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <User className="h-5 w-5 text-zinc-600" />
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="text-white font-medium">{testimonial.name}</div>
                                                <div className="text-sm text-zinc-500">{testimonial.title}{testimonial.company && `, ${testimonial.company}`}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="max-w-xs">
                                            <p className="text-zinc-400 truncate">{testimonial.content}</p>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={testimonial.isActive ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'}>
                                                {testimonial.isActive ? 'Aktif' : 'Pasif'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                                                    <Link href={`/admin/yorumlar/${testimonial.id}`}>
                                                        <DropdownMenuItem>Düzenle</DropdownMenuItem>
                                                    </Link>
                                                    <form action={async () => {
                                                        'use server'
                                                        await toggleTestimonialActive(testimonial.id, !testimonial.isActive)
                                                        revalidatePath('/admin/yorumlar')
                                                    }}>
                                                        <DropdownMenuItem asChild>
                                                            <button className="w-full text-left flex items-center">
                                                                {testimonial.isActive ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                                                                {testimonial.isActive ? 'Pasif Yap' : 'Aktif Yap'}
                                                            </button>
                                                        </DropdownMenuItem>
                                                    </form>
                                                    <form action={async () => {
                                                        'use server'
                                                        await deleteTestimonial(testimonial.id)
                                                        revalidatePath('/admin/yorumlar')
                                                    }}>
                                                        <DropdownMenuItem asChild className="text-red-400 focus:text-red-400">
                                                            <button className="w-full text-left">
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Sil
                                                            </button>
                                                        </DropdownMenuItem>
                                                    </form>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
