import { db } from '@/lib/db'

// Force dynamic rendering to prevent build-time database calls
export const dynamic = 'force-dynamic'
import { Mail, Phone, Building, Calendar, Eye, Archive, MoreHorizontal, MessageSquare } from 'lucide-react'
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
import { revalidatePath } from 'next/cache'

const SERVICE_LABELS: Record<string, string> = {
    'video-produksiyon': 'Video Prodüksiyon',
    'sosyal-medya-yonetimi': 'Sosyal Medya Yönetimi',
    'marka-kimligi': 'Marka Kimliği',
    'web-tasarim': 'Web Tasarım',
    'fotograf-cekimi': 'Fotoğraf Çekimi',
    'reklam-kampanyasi': 'Reklam Kampanyası',
    'icerik-uretimi': 'İçerik Üretimi',
    'etkinlik-yonetimi': 'Etkinlik Yönetimi',
}

const BUDGET_LABELS: Record<string, string> = {
    '10000-25000': '₺10.000 - ₺25.000',
    '25000-50000': '₺25.000 - ₺50.000',
    '50000-100000': '₺50.000 - ₺100.000',
    '100000-250000': '₺100.000 - ₺250.000',
    '250000+': '₺250.000+',
}

async function getInquiries() {
    return db.inquiry.findMany({
        orderBy: { createdAt: 'desc' },
    })
}

async function markAsRead(id: string) {
    'use server'
    await db.inquiry.update({
        where: { id },
        data: { isRead: true },
    })
    revalidatePath('/admin/talepler')
}

async function toggleArchive(id: string, isArchived: boolean) {
    'use server'
    await db.inquiry.update({
        where: { id },
        data: { isArchived: !isArchived },
    })
    revalidatePath('/admin/talepler')
}

async function deleteInquiry(id: string) {
    'use server'
    await db.inquiry.delete({ where: { id } })
    revalidatePath('/admin/talepler')
}

function InquiryActions({ inquiry }: { inquiry: { id: string; isRead: boolean; isArchived: boolean } }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-900">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border-zinc-200">
                {!inquiry.isRead && (
                    <form action={async () => {
                        'use server'
                        await markAsRead(inquiry.id)
                    }}>
                        <DropdownMenuItem asChild className="cursor-pointer text-zinc-400 focus:bg-zinc-50 focus:text-zinc-900">
                            <button type="submit" className="w-full flex items-center">
                                <Eye className="mr-2 h-4 w-4" />
                                Okundu İşaretle
                            </button>
                        </DropdownMenuItem>
                    </form>
                )}
                <form action={async () => {
                    'use server'
                    await toggleArchive(inquiry.id, inquiry.isArchived)
                }}>
                    <DropdownMenuItem asChild className="cursor-pointer text-zinc-400 focus:bg-zinc-50 focus:text-zinc-900">
                        <button type="submit" className="w-full flex items-center">
                            <Archive className="mr-2 h-4 w-4" />
                            {inquiry.isArchived ? 'Arşivden Çıkar' : 'Arşivle'}
                        </button>
                    </DropdownMenuItem>
                </form>
                <DropdownMenuSeparator className="bg-zinc-100" />
                <form action={async () => {
                    'use server'
                    await deleteInquiry(inquiry.id)
                }}>
                    <DropdownMenuItem asChild className="cursor-pointer text-red-400 focus:bg-zinc-50 focus:text-red-400">
                        <button type="submit" className="w-full flex items-center">
                            Sil
                        </button>
                    </DropdownMenuItem>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default async function InquiriesPage() {
    const inquiries = await getInquiries()

    const unreadInquiries = inquiries.filter(i => !i.isRead && !i.isArchived)
    const readInquiries = inquiries.filter(i => i.isRead && !i.isArchived)
    const archivedInquiries = inquiries.filter(i => i.isArchived)

    const stats = {
        total: inquiries.length,
        unread: unreadInquiries.length,
        thisWeek: inquiries.filter(i => {
            const weekAgo = new Date()
            weekAgo.setDate(weekAgo.getDate() - 7)
            return new Date(i.createdAt) > weekAgo
        }).length,
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-zinc-900">Talepler</h1>
                <p className="text-zinc-500">İletişim formundan gelen talepleri yönetin</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-zinc-200 bg-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Toplam Talep</CardTitle>
                        <MessageSquare className="h-4 w-4 text-zinc-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-zinc-900">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card className="border-zinc-200 bg-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Okunmamış</CardTitle>
                        <Mail className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-500">{stats.unread}</div>
                    </CardContent>
                </Card>
                <Card className="border-zinc-200 bg-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Bu Hafta</CardTitle>
                        <Calendar className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-500">{stats.thisWeek}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Unread Inquiries */}
            {unreadInquiries.length > 0 && (
                <Card className="border-zinc-200 bg-white">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                            Okunmamış Talepler
                        </CardTitle>
                        <CardDescription className="text-zinc-500">
                            {unreadInquiries.length} yeni talep bekliyor
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <InquiriesTable inquiries={unreadInquiries} />
                    </CardContent>
                </Card>
            )}

            {/* Read Inquiries */}
            <Card className="border-zinc-200 bg-white">
                <CardHeader>
                    <CardTitle className="text-zinc-900">Tüm Talepler</CardTitle>
                    <CardDescription className="text-zinc-500">
                        {readInquiries.length} okunmuş talep
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {readInquiries.length === 0 && unreadInquiries.length === 0 ? (
                        <div className="text-center py-12">
                            <MessageSquare className="h-12 w-12 mx-auto text-zinc-700 mb-4" />
                            <p className="text-zinc-500">Henüz talep yok</p>
                        </div>
                    ) : (
                        <InquiriesTable inquiries={readInquiries} />
                    )}
                </CardContent>
            </Card>

            {/* Archived */}
            {archivedInquiries.length > 0 && (
                <Card className="border-zinc-200 bg-white">
                    <CardHeader>
                        <CardTitle className="text-white text-zinc-500">Arşivlenenler</CardTitle>
                        <CardDescription className="text-zinc-600">
                            {archivedInquiries.length} arşivlenmiş talep
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <InquiriesTable inquiries={archivedInquiries} />
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

function InquiriesTable({ inquiries }: { inquiries: Awaited<ReturnType<typeof getInquiries>> }) {
    if (inquiries.length === 0) {
        return <p className="text-zinc-500 text-center py-4">Talep bulunamadı</p>
    }

    return (
        <Table>
            <TableHeader>
                <TableRow className="border-zinc-200 hover:bg-transparent">
                    <TableHead className="text-zinc-400">Müşteri</TableHead>
                    <TableHead className="text-zinc-400">Hizmetler</TableHead>
                    <TableHead className="text-zinc-400">Bütçe</TableHead>
                    <TableHead className="text-zinc-400">Tarih</TableHead>
                    <TableHead className="text-zinc-400 w-[50px]"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {inquiries.map((inquiry) => {
                    let services: string[] = []
                    try {
                        services = JSON.parse(inquiry.services || '[]')
                    } catch {
                        services = []
                    }

                    return (
                        <TableRow key={inquiry.id} className="border-zinc-200 hover:bg-zinc-100/50">
                            <TableCell>
                                <div className="space-y-1">
                                    <div className="font-medium text-white flex items-center gap-2">
                                        {inquiry.name}
                                        {!inquiry.isRead && (
                                            <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-0.5 text-xs text-zinc-500">
                                        <span className="flex items-center gap-1">
                                            <Mail className="h-3 w-3" />
                                            {inquiry.email}
                                        </span>
                                        {inquiry.phone && (
                                            <span className="flex items-center gap-1">
                                                <Phone className="h-3 w-3" />
                                                {inquiry.phone}
                                            </span>
                                        )}
                                        {inquiry.company && (
                                            <span className="flex items-center gap-1">
                                                <Building className="h-3 w-3" />
                                                {inquiry.company}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-wrap gap-1">
                                    {services.slice(0, 2).map((service) => (
                                        <Badge key={service} variant="outline" className="text-xs text-zinc-400 border-zinc-700">
                                            {SERVICE_LABELS[service] || service}
                                        </Badge>
                                    ))}
                                    {services.length > 2 && (
                                        <Badge variant="outline" className="text-xs text-zinc-500 border-zinc-700">
                                            +{services.length - 2}
                                        </Badge>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="text-zinc-700">
                                    {BUDGET_LABELS[inquiry.budgetRange] || inquiry.budgetRange}
                                </span>
                            </TableCell>
                            <TableCell className="text-zinc-500">
                                {new Date(inquiry.createdAt).toLocaleDateString('tr-TR')}
                            </TableCell>
                            <TableCell>
                                <InquiryActions inquiry={inquiry} />
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}
