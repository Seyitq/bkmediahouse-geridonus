module.exports = {
  apps: [{
    name: 'bkmediahouse',
    script: '.next/standalone/server.js',
    cwd: '/root/var/www/bkmediahouse-geridonus',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOSTNAME: '0.0.0.0',
      AUTH_SECRET: 'u7eYxOlaaz7/pSUs3tMtwJSoii35WV0fc34WZa/+XTg=',
      NEXTAUTH_URL: 'https://bkmediahouse.com.tr',
      NEXT_PUBLIC_GA_ID: 'G-8GR0EFGE21',
      DATABASE_URL: 'file:/root/var/www/bkmediahouse-geridonus/prisma/dev.db'
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '512M'
  }]
}
