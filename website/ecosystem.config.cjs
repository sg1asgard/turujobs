module.exports = {
  apps: [
    {
      name: 'Turujobs',
      port: '3300',
      exec_mode: 'cluster',
      instances: 1,
      script: './.output/server/index.mjs',
      env: {
        NUXT_DB_JSON_PATH: '../database/db.json'
      }
    }
  ]
}