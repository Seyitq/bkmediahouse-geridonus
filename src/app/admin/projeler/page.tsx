import Link from 'next/link'
import { Plus, MoreHorizontal, Star, Eye, EyeOff, Pencil, Trash2 } from 'lucide-react'
import { db } from '@/lib/db'

// Force dynamic rendering to prevent build-time database calls
export const dynamic = 'force-dynamic'

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
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { deleteProject, toggleProjectFeatured, publishProject, unpublishProject } from '@/actions/projects'

async function getProjects() {
    return db.project.findMany({
        orderBy: { createdAt: 'desc' },
    })
}

function ProjectActions({ project }: { project: { id: string; slug: string; featured: boolean; publishedAt: Date | null } }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-900">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border-zinc-200">
                <DropdownMenuItem asChild className="cursor-pointer text-zinc-400 focus:bg-zinc-50 focus:text-zinc-900">
                    <Link href={`/admin/projeler/${project.id}`}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Düzenle
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer text-zinc-400 focus:bg-zinc-50 focus:text-zinc-900">
                    <Link href={`/calismalar/${project.slug}`} target="_blank">
                        <Eye className="mr-2 h-4 w-4" />
                        Görüntüle
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-100" />
                <form action={async () => {
                    'use server'
                    await toggleProjectFeatured(project.id)
                }}>
                    <DropdownMenuItem asChild className="cursor-pointer text-zinc-400 focus:bg-zinc-50 focus:text-zinc-900">
                        <button type="submit" className="w-full flex items-center">
                            <Star className={`mr-2 h-4 w-4 ${project.featured ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                            {project.featured ? 'Öne Çıkarmayı Kaldır' : 'Öne Çıkar'}
                        </button>
                    </DropdownMenuItem>
                </form>
                <form action={async () => {
                    'use server'
                    if (project.publishedAt) {
                        await unpublishProject(project.id)
                    } else {
                        await publishProject(project.id)
                    }
                }}>
                    <DropdownMenuItem asChild className="cursor-pointer text-zinc-400 focus:bg-zinc-50 focus:text-zinc-900">
                        <button type="submit" className="w-full flex items-center">
                            {project.publishedAt ? (
                                <>
                                    <EyeOff className="mr-2 h-4 w-4" />
                                    Yayından Kaldır
                                </>
                            ) : (
                                <>
                                    <Eye className="mr-2 h-4 w-4" />
                                    Yayınla
                                </>
                            )}
                        </button>
                    </DropdownMenuItem>
                </form>
                <DropdownMenuSeparator className="bg-zinc-100" />
                <form action={async () => {
                    'use server'
                    await deleteProject(project.id)
                }}>
                    <DropdownMenuItem asChild className="cursor-pointer text-red-400 focus:bg-zinc-50 focus:text-red-400">
                        <button type="submit" className="w-full flex items-center">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Sil
                        </button>
                    </DropdownMenuItem>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default async function ProjectsPage() {
    const projects = await getProjects()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Projeler</h1>
                    <p className="text-zinc-500">Portföy projelerinizi yönetin</p>
                </div>
                <Link href="/admin/projeler/yeni">
                    <Button className="bg-zinc-50 text-white hover:bg-zinc-100">
                        <Plus className="mr-2 h-4 w-4" />
                        Yeni Proje
                    </Button>
                </Link>
            </div>

            <Card className="border-zinc-200 bg-white">
                <CardHeader>
                    <CardTitle className="text-zinc-900">Tüm Projeler</CardTitle>
                    <CardDescription className="text-zinc-500">
                        Toplam {projects.length} proje
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {projects.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-zinc-500 mb-4">Henüz proje eklenmemiş</p>
                            <Link href="/admin/projeler/yeni">
                                <Button className="bg-zinc-50 text-white hover:bg-zinc-100">
                                    <Plus className="mr-2 h-4 w-4" />
                                    İlk Projeyi Ekle
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="border-zinc-200 hover:bg-transparent">
                                    <TableHead className="text-zinc-400">Proje</TableHead>
                                    <TableHead className="text-zinc-400">Müşteri</TableHead>
                                    <TableHead className="text-zinc-400">Durum</TableHead>
                                    <TableHead className="text-zinc-400">Tarih</TableHead>
                                    <TableHead className="text-zinc-400 w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {projects.map((project) => (
                                    <TableRow key={project.id} className="border-zinc-200 hover:bg-zinc-100/50">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="h-10 w-14 rounded bg-cover bg-center bg-zinc-100"
                                                    style={{ backgroundImage: `url(${project.coverImage})` }}
                                                />
                                                <div>
                                                    <div className="font-medium text-white flex items-center gap-2">
                                                        {project.title}
                                                        {project.featured && (
                                                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-zinc-500">/{project.slug}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-zinc-700">{project.clientName}</TableCell>
                                        <TableCell>
                                            {project.publishedAt ? (
                                                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                                    Yayında
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="bg-zinc-500/10 text-zinc-500 border-zinc-500/20">
                                                    Taslak
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-zinc-500">
                                            {new Date(project.createdAt).toLocaleDateString('tr-TR')}
                                        </TableCell>
                                        <TableCell>
                                            <ProjectActions project={project} />
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
