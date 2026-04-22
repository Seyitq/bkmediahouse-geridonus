import { db } from '@/lib/db'

// Force dynamic rendering to prevent build-time database calls
export const dynamic = 'force-dynamic'
import { auth } from '@/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Lock, Globe } from 'lucide-react'
import { ProfileForm, PasswordForm, SiteSettingForm } from '@/components/admin/settings-forms'

async function getSettings() {
    const settings = await db.siteSetting.findMany()
    return settings.reduce((acc, setting) => {
        acc[setting.key] = setting.value
        return acc
    }, {} as Record<string, string>)
}

async function getCurrentUser() {
    const session = await auth()
    if (!session?.user?.id) return null
    return db.user.findUnique({ where: { id: session.user.id } })
}

export default async function SettingsPage() {
    const session = await auth()
    const user = await getCurrentUser()

    if (!user) return null

    const isAdmin = session?.user?.role === 'ADMIN'
    const settings = isAdmin ? await getSettings() : {}

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-zinc-900">Ayarlar</h1>
                <p className="text-zinc-500">
                    {isAdmin ? 'Site ve hesap ayarlarýný yönetin' : 'Hesap ayarlarýnýzý yönetin'}
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Profile Settings */}
                <Card className="border-zinc-200 bg-white">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Profil Bilgileri
                        </CardTitle>
                        <CardDescription className="text-zinc-500">
                            Hesap bilgilerinizi güncelleyin
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ProfileForm user={{ name: user.name, email: user.email }} />
                    </CardContent>
                </Card>

                {/* Change Password */}
                <Card className="border-zinc-200 bg-white">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Lock className="h-5 w-5" />
                            Þifre Deðiþtir
                        </CardTitle>
                        <CardDescription className="text-zinc-500">
                            Hesap þifrenizi güncelleyin
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PasswordForm />
                    </CardContent>
                </Card>

                {/* Site Settings - Admin Only */}
                {isAdmin && (
                    <Card className="border-zinc-200 bg-white lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Globe className="h-5 w-5" />
                                Site Ayarlarý
                            </CardTitle>
                            <CardDescription className="text-zinc-500">
                                Genel site ayarlarýný düzenleyin
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6 md:grid-cols-2">
                                <SiteSettingForm
                                    settingKey="site_title"
                                    label="Site Baþlýðý"
                                    initialValue={settings.site_title || 'BK Media House'}
                                />
                                <SiteSettingForm
                                    settingKey="site_tagline"
                                    label="Slogan"
                                    initialValue={settings.site_tagline || 'Dijital Medya Ajansý'}
                                />
                                <SiteSettingForm
                                    settingKey="contact_email"
                                    label="Ýletiþim E-postasý"
                                    initialValue={settings.contact_email || 'info@bkmediahouse.com.tr'}
                                    placeholder="info@..."
                                />
                                <SiteSettingForm
                                    settingKey="contact_phone"
                                    label="Ýletiþim Telefonu"
                                    initialValue={settings.contact_phone || '+90 212 123 45 67'}
                                    placeholder="+90..."
                                />
                                <SiteSettingForm
                                    settingKey="social_instagram"
                                    label="Instagram"
                                    initialValue={settings.social_instagram || '@bkmediahouse'}
                                />
                                <SiteSettingForm
                                    settingKey="social_linkedin"
                                    label="LinkedIn"
                                    initialValue={settings.social_linkedin || ''}
                                    placeholder="linkedin.com/company/..."
                                />
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
