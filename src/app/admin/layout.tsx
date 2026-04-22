import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Topbar } from '@/components/dashboard/topbar'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session?.user) {
        redirect('/giris')
    }

    if (session.user.role !== 'ADMIN' && session.user.role !== 'STAFF') {
        redirect('/')
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar userRole={session.user.role} />
            <div className="lg:pl-64">
                <Topbar user={session.user} />
                <main className="p-4 sm:p-6 pt-16 lg:pt-6">
                    {children}
                </main>
            </div>
        </div>
    )
}

