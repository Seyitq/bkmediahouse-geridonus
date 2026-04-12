// Environment variable validation
// Ensures all required environment variables are present

function getEnvVar(key: string, required: boolean = true): string {
    const value = process.env[key]

    if (!value && required) {
        throw new Error(`Missing required environment variable: ${key}`)
    }

    return value || ''
}

export const env = {
    // Auth
    AUTH_SECRET: getEnvVar('AUTH_SECRET'),

    // Google Analytics (optional)
    NEXT_PUBLIC_GA_ID: getEnvVar('NEXT_PUBLIC_GA_ID', false),

    // Environment
    NODE_ENV: process.env.NODE_ENV || 'development',
    IS_PRODUCTION: process.env.NODE_ENV === 'production',
} as const

export type Env = typeof env
