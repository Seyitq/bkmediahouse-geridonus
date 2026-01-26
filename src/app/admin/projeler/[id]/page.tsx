import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EditProjectForm } from '@/components/admin/project-form'

async function getProject(id: string) {
    const { db } = await import('@/lib/db')
    return db.project.findUnique({ where: { id } })
}

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const project = await getProject(id)

    if (!project) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-white mb-2">Proje Bulunamadı</h2>
                    <p className="text-zinc-500 mb-4">İstenen proje mevcut değil.</p>
                    <Link href="/admin/projeler">
                        <Button>Projelere Dön</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/projeler">
                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">Proje Düzenle</h1>
                    <p className="text-zinc-500">{project.title}</p>
                </div>
            </div>

            <EditProjectForm project={project} />
        </div>
    )
}
