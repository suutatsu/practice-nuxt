import express from 'express'
import consola from 'consola'
import { Nuxt, Builder } from 'nuxt'

// Import and Set Nuxt.js options
import nuxtConfig from '../nuxt.config'
const app = express()
nuxtConfig.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(nuxtConfig)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
