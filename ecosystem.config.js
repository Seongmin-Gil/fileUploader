module.exports = {
    apps: [{
    name: 'uploader',
    script: './app.js',
    wait_ready: true,
    listen_timeout: 50000,
    kill_timeout: 5000
    }]
  }