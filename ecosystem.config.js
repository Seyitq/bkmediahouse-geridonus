module.exports = {
  apps: [{
    name: 'newsocialankara',
    script: '.next/standalone/server.js',
    cwd: '/root/var/www/bkmediahouse-geridonus',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOSTNAME: '0.0.0.0',
      AUTH_SECRET: 'u7eYxOlaaz7/pSUs3tMtwJSoii35WV0fc34WZa/+XTg=',
      NEXTAUTH_URL: 'https://newsocialankara.com',
      NEXT_PUBLIC_GA_ID: 'G-77Y7HCGDLB'
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '512M'
  }]
}
