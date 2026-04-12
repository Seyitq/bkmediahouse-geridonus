import { db } from '@/lib/db'

// Force dynamic rendering to prevent build-time database calls
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { Plus, Layers, MoreHorizontal, Trash2, Eye, EyeOff, Sparkles } from 'lucide-react'
import * as Icons from 'lucide-react'

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
import { deleteService, toggleServiceActive, seedDefaultServices } from '@/actions/services'
import { revalidatePath } from 'next/cache'

async function getServices() {
    return await db.service.findMany({
        orderBy: { order: 'asc' },
    })
}

// Dynamic icon component
function DynamicIcon({ name, className, style }: { name: string; className?: string; style?: React.CSSProperties }) {
    const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>>)[name]
    if (!IconComponent) return <Layers className={className} style={style} />
    return <IconComponent className={className} style={style} />
}

export default async function ServicesPage() {
    const services = await getServices()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Hizmetler</h1>
                    <p className="text-zinc-500">Hizmetleri yönetin</p>
                </div>
                <div className="flex gap-2">
                    {services.length === 0 && (
                        <form action={async () => {
                            'use server'
                            await seedDefaultServices()
                            revalidatePath('/admin/hizmetler')
                        }}>
                            <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white">
                                <Sparkles className="mr-2 h-4 w-4" />
                                Varsayılan Hizmetleri Ekle
                            </Button>
                        </form>
                    )}
                    <Link href="/admin/hizmetler/yeni">
                        <Button className="bg-white text-zinc-900 hover:bg-zinc-200">
                            <Plus className="mr-2 h-4 w-4" />
                            Yeni Hizmet Ekle
                        </Button>
                    </Link>
                </div>
            </div>

            <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                    <CardTitle className="text-white">Tüm Hizmetler</CardTitle>
                    <CardDescription className="text-zinc-500">
                        Ana sayfada gösterilecek hizmetler
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {services.length === 0 ? (
                        <div className="text-center py-12">
                            <Layers className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
                            <p className="text-zinc-500">Henüz hizmet eklenmemiş.</p>
                            <p className="text-zinc-600 text-sm mt-2">
                                Varsayılan hizmetleri eklemek için yukarıdaki butonu kullanabilirsiniz.
                            </p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="border-zinc-800 hover:bg-transparent">
                                    <TableHead className="text-zinc-400 w-16">Sıra</TableHead>
                                    <TableHead className="text-zinc-400">Icon</TableHead>
                                    <TableHead className="text-zinc-400">Hizmet</TableHead>
                                    <TableHead className="text-zinc-400">Durum</TableHead>
                                    <TableHead className="text-zinc-400 text-right">İşlemler</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {services.map((service) => (
                                    <TableRow key={service.id} className="border-zinc-800">
                                        <TableCell className="text-zinc-500">{service.order}</TableCell>
                                        <TableCell>
                                            <div
                                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                                style={{ backgroundColor: `${service.color}20` }}
                                            >
                                                <DynamicIcon name={service.icon} className="h-5 w-5" style={{ color: service.color } as React.CSSProperties} />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="text-white font-medium">{service.name}</div>
                                                <div className="text-sm text-zinc-500">{service.slug}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={service.isActive ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'}>
                                                {service.isActive ? 'Aktif' : 'Pasif'}
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
                                                    <Link href={`/admin/hizmetler/${service.id}`}>
                                                        <DropdownMenuItem>Düzenle</DropdownMenuItem>
                                                    </Link>
                                                    <form action={async () => {
                                                        'use server'
                                                        await toggleServiceActive(service.id, !service.isActive)
                                                        revalidatePath('/admin/hizmetler')
                                                    }}>
                                                        <DropdownMenuItem asChild>
                                                            <button className="w-full text-left flex items-center">
                                                                {service.isActive ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                                                                {service.isActive ? 'Pasif Yap' : 'Aktif Yap'}
                                                            </button>
                                                        </DropdownMenuItem>
                                                    </form>
                                                    <form action={async () => {
                                                        'use server'
                                                        await deleteService(service.id)
                                                        revalidatePath('/admin/hizmetler')
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
