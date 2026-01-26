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
    // Database
    DATABASE_URL: getEnvVar('DATABASE_URL'),

    // Auth
    AUTH_SECRET: getEnvVar('AUTH_SECRET'),

    // Cloudinary (optional)
    CLOUDINARY_CLOUD_NAME: getEnvVar('CLOUDINARY_CLOUD_NAME', false),
    CLOUDINARY_API_KEY: getEnvVar('CLOUDINARY_API_KEY', false),
    CLOUDINARY_API_SECRET: getEnvVar('CLOUDINARY_API_SECRET', false),

    // Google Analytics (optional)
    NEXT_PUBLIC_GA_ID: getEnvVar('NEXT_PUBLIC_GA_ID', false),

    // Environment
    NODE_ENV: process.env.NODE_ENV || 'development',
    IS_PRODUCTION: process.env.NODE_ENV === 'production',
} as const

export type Env = typeof env
