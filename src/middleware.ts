import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/auth'

// Routes that require authentication
const protectedRoutes = ['/admin']

// Routes that are only for unauthenticated users
const authRoutes = ['/giris']

export default auth((req) => {
    const { nextUrl } = req
    const session = req.auth

    const isLoggedIn = !!session?.user
    const userRole = session?.user?.role as string | undefined

    const isProtectedRoute = protectedRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
    )

    const isAuthRoute = authRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
    )

    // Redirect logged out users from protected routes to login
    if (isProtectedRoute && !isLoggedIn) {
        const loginUrl = new URL('/giris', nextUrl.origin)
        loginUrl.searchParams.set('callbackUrl', nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
    }

    // Redirect logged in non-admin/staff users from admin routes
    if (isProtectedRoute && isLoggedIn) {
        if (userRole !== 'ADMIN' && userRole !== 'STAFF') {
            return NextResponse.redirect(new URL('/', nextUrl.origin))
        }
    }

    // Redirect logged in users from auth routes to dashboard
    if (isAuthRoute && isLoggedIn) {
        if (userRole === 'ADMIN' || userRole === 'STAFF') {
            return NextResponse.redirect(new URL('/admin', nextUrl.origin))
        }
        return NextResponse.redirect(new URL('/', nextUrl.origin))
    }

    return NextResponse.next()
})

export const config = {
    matcher: [
        '/admin/:path*',
        '/giris',
    ],
}

