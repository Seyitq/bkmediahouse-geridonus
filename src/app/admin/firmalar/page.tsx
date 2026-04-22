import { db } from '@/lib/db'

// Force dynamic rendering to prevent build-time database calls
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { Plus, Building2, Link2, GripVertical, MoreHorizontal, Trash2, Eye, EyeOff, AlertCircle } from 'lucide-react'

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
import { deleteTrustedCompany, toggleCompanyActive } from '@/actions/social-proof'
import { revalidatePath } from 'next/cache'

// Helper to validate image URL
function isValidImageUrl(url: string): boolean {
    if (!url) return false
    return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')
}

async function getCompanies() {
    return await db.trustedCompany.findMany({
        orderBy: { order: 'asc' },
    })
}

export default async function CompaniesPage() {
    const companies = await getCompanies()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Referans Firmalar</h1>
                    <p className="text-zinc-500">Güvenilen firmaların logolarını yönetin</p>
                </div>
                <Link href="/admin/firmalar/yeni">
                    <Button className="bg-zinc-50 text-white hover:bg-zinc-100">
                        <Plus className="mr-2 h-4 w-4" />
                        Yeni Firma Ekle
                    </Button>
                </Link>
            </div>

            <Card className="border-zinc-200 bg-white">
                <CardHeader>
                    <CardTitle className="text-zinc-900">Tüm Firmalar</CardTitle>
                    <CardDescription className="text-zinc-500">
                        Ana sayfada gösterilecek firma logoları
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {companies.length === 0 ? (
                        <div className="text-center py-12">
                            <Building2 className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
                            <p className="text-zinc-500">Henüz firma eklenmemiş.</p>
                            <Link href="/admin/firmalar/yeni" className="mt-4 inline-block">
                                <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-zinc-900">
                                    İlk Firmayı Ekle
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="border-zinc-200 hover:bg-transparent">
                                    <TableHead className="text-zinc-400 w-16">Sıra</TableHead>
                                    <TableHead className="text-zinc-400">Logo</TableHead>
                                    <TableHead className="text-zinc-400">Firma Adı</TableHead>
                                    <TableHead className="text-zinc-400">Website</TableHead>
                                    <TableHead className="text-zinc-400">Durum</TableHead>
                                    <TableHead className="text-zinc-400 text-right">İşlemler</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {companies.map((company) => {
                                    const hasValidLogo = isValidImageUrl(company.logoUrl)
                                    return (
                                        <TableRow key={company.id} className="border-zinc-200">
                                            <TableCell className="text-zinc-500">
                                                <GripVertical className="h-4 w-4" />
                                            </TableCell>
                                            <TableCell>
                                                <div className="w-24 h-12 relative bg-zinc-100 rounded flex items-center justify-center overflow-hidden">
                                                    {hasValidLogo ? (
                                                        /* eslint-disable-next-line @next/next/no-img-element */
                                                        <img
                                                            src={company.logoUrl}
                                                            alt={company.name}
                                                            className="w-full h-full object-contain p-2"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center gap-1 text-amber-500" title="Geçersiz URL formatı">
                                                            <AlertCircle className="h-4 w-4" />
                                                        </div>
                                                    )}
                                                </div>
                                                {!hasValidLogo && (
                                                    <p className="text-xs text-amber-500 mt-1">URL https:// ile başlamalı</p>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-white font-medium">{company.name}</TableCell>
                                            <TableCell>
                                                {company.websiteUrl ? (
                                                    <a
                                                        href={company.websiteUrl.startsWith('http') ? company.websiteUrl : `https://${company.websiteUrl}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                                    >
                                                        <Link2 className="h-3 w-3" />
                                                        Link
                                                    </a>
                                                ) : (
                                                    <span className="text-zinc-600">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={company.isActive ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'}>
                                                    {company.isActive ? 'Aktif' : 'Pasif'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="bg-white border-zinc-200">
                                                        <Link href={`/admin/firmalar/${company.id}`}>
                                                            <DropdownMenuItem>Düzenle</DropdownMenuItem>
                                                        </Link>
                                                        <form action={async () => {
                                                            'use server'
                                                            await toggleCompanyActive(company.id, !company.isActive)
                                                            revalidatePath('/admin/firmalar')
                                                        }}>
                                                            <DropdownMenuItem asChild>
                                                                <button className="w-full text-left flex items-center">
                                                                    {company.isActive ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                                                                    {company.isActive ? 'Pasif Yap' : 'Aktif Yap'}
                                                                </button>
                                                            </DropdownMenuItem>
                                                        </form>
                                                        <form action={async () => {
                                                            'use server'
                                                            await deleteTrustedCompany(company.id)
                                                            revalidatePath('/admin/firmalar')
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
                                    )
                                })}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
