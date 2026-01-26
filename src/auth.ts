import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { loginSchema } from '@/lib/validations/auth'

declare module 'next-auth' {
    interface User {
        role: string
    }
    interface Session {
        user: {
            id: string
            email: string
            name: string | null
            role: string
            image: string | null
        }
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    trustHost: true,
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'E-posta', type: 'email' },
                password: { label: 'Şifre', type: 'password' },
            },
            async authorize(credentials) {
                const parsed = loginSchema.safeParse(credentials)

                if (!parsed.success) {
                    return null
                }

                const { email, password } = parsed.data

                const user = await db.user.findUnique({
                    where: { email },
                })

                if (!user) {
                    return null
                }

                const passwordMatch = await bcrypt.compare(password, user.password)

                if (!passwordMatch) {
                    return null
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    image: user.image,
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id as string
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string
                session.user.role = token.role as string
            }
            return session
        },
    },
    pages: {
        signIn: '/giris',
        error: '/giris',
    },
    session: {
        strategy: 'jwt',
    },
})
