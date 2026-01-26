'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Loader2, Mail, Lock, ArrowRight } from 'lucide-react'
import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'

function LoginForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/admin'

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = async (data: LoginInput) => {
        setIsLoading(true)
        setError(null)

        try {
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            })

            if (result?.error) {
                setError('E-posta veya şifre hatalı')
                return
            }

            if (result?.ok) {
                router.push(callbackUrl)
                router.refresh()
            }
        } catch {
            setError('Bir hata oluştu')
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                >
                    {error}
                </motion.div>
            )}

            <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">
                    E-posta
                </Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <Input
                        id="email"
                        type="email"
                        placeholder="ornek@email.com"
                        className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-zinc-500"
                        {...register('email')}
                    />
                </div>
                {errors.email && (
                    <p className="text-sm text-red-400">{errors.email.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-300">
                    Şifre
                </Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-zinc-500"
                        {...register('password')}
                    />
                </div>
                {errors.password && (
                    <p className="text-sm text-red-400">{errors.password.message}</p>
                )}
            </div>

            <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-zinc-900 hover:bg-zinc-200 transition-all duration-200 group"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Giriş yapılıyor...
                    </>
                ) : (
                    <>
                        Giriş Yap
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                )}
            </Button>
        </form>
    )
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />

            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md"
            >
                <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl shadow-2xl">
                    <CardHeader className="space-y-1 text-center">
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                        >
                            <CardTitle className="text-2xl font-bold text-white">
                                BK Media House
                            </CardTitle>
                            <CardDescription className="text-zinc-400">
                                Yönetim paneline giriş yapın
                            </CardDescription>
                        </motion.div>
                    </CardHeader>
                    <CardContent>
                        <Suspense fallback={<div className="h-32 flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-zinc-400" /></div>}>
                            <LoginForm />
                        </Suspense>
                    </CardContent>
                </Card>

                {/* Decorative elements */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-zinc-800/20 to-transparent blur-3xl" />
            </motion.div>
        </div>
    )
}
