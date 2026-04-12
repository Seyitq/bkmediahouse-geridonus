module.exports = {
  apps: [{
    name: 'newsocialankara',
    script: 'node_modules/.bin/next',
    args: 'start -p 3000',
    cwd: '/root/var/www/bkmediahouse-geridonus',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '512M'
  }]
}
