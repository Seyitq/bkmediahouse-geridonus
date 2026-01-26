'use server'

import { signIn, signOut } from '@/auth'
import { db } from '@/lib/db'
import { loginSchema, registerSchema, type LoginInput, type RegisterInput } from '@/lib/validations/auth'
import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'

export interface ActionResult {
    success: boolean
    error?: string
}

export async function login(data: LoginInput): Promise<ActionResult> {
    try {
        const parsed = loginSchema.safeParse(data)

        if (!parsed.success) {
            return {
                success: false,
                error: parsed.error.issues[0]?.message || 'Geçersiz veri',
            }
        }

        // First verify the user exists and password is correct
        const user = await db.user.findUnique({
            where: { email: parsed.data.email },
        })

        if (!user) {
            return { success: false, error: 'E-posta veya şifre hatalı' }
        }

        const passwordMatch = await bcrypt.compare(parsed.data.password, user.password)

        if (!passwordMatch) {
            return { success: false, error: 'E-posta veya şifre hatalı' }
        }

        // Now sign in - this may throw NEXT_REDIRECT which is expected
        await signIn('credentials', {
            email: parsed.data.email,
            password: parsed.data.password,
            redirect: false,
        })

        return { success: true }
    } catch (error: unknown) {
        console.error('Login error:', error)

        // Check if it's a redirect (NextAuth v5 throws this on success with redirect:false sometimes)
        if (error && typeof error === 'object' && 'digest' in error) {
            const digest = (error as { digest?: string }).digest
            if (digest?.includes('NEXT_REDIRECT')) {
                return { success: true }
            }
        }

        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                case 'CallbackRouteError':
                    return { success: false, error: 'E-posta veya şifre hatalı' }
                default:
                    return { success: false, error: 'Giriş yapılırken bir hata oluştu' }
            }
        }

        return { success: false, error: 'Bir hata oluştu, lütfen tekrar deneyin' }
    }
}

export async function logout(): Promise<void> {
    await signOut({ redirect: false })
}

export async function register(data: RegisterInput): Promise<ActionResult> {
    try {
        const parsed = registerSchema.safeParse(data)

        if (!parsed.success) {
            return {
                success: false,
                error: parsed.error.issues[0]?.message || 'Geçersiz veri',
            }
        }

        const { name, email, password } = parsed.data

        // Check if user already exists
        const existingUser = await db.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return {
                success: false,
                error: 'Bu e-posta adresi zaten kayıtlı',
            }
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12)

        // Create user
        await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'CLIENT', // Default role
            },
        })

        return { success: true }
    } catch (error) {
        console.error('Register error:', error)
        return {
            success: false,
            error: 'Kayıt sırasında bir hata oluştu',
        }
    }
}

// Create initial admin user (for development/setup)
export async function createAdminUser(email: string, password: string, name: string): Promise<ActionResult> {
    try {
        const existingUser = await db.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return { success: false, error: 'Bu e-posta adresi zaten kayıtlı' }
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'ADMIN',
            },
        })

        return { success: true }
    } catch (error) {
        console.error('Create admin error:', error)
        return { success: false, error: 'Admin oluşturulurken bir hata oluştu' }
    }
}
