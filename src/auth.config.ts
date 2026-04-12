import type { NextAuthConfig } from 'next-auth'

// Edge-compatible auth config (NO database imports!)
// This is used by middleware which runs in Edge Runtime
export const authConfig = {
    trustHost: true,
    providers: [], // Providers are added in auth.ts (Node.js runtime)
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id as string
                token.role = (user as { role: string }).role
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
} satisfies NextAuthConfig
