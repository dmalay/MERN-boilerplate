import express from 'express'
import cors from 'cors'
import path from 'path'
import http from 'http'

import options from './config'
import mongooseService from './services/mongoose'

const app = express()

const PORT = options.port

mongooseService.connect()

const middleware = [
  cors(),
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  express.json({ limit: '50mb', extended: true }),
]

middleware.forEach((it) => app.use(it))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve('client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client/build', 'index.html'))
  })
}

const server = http.createServer(app)

server.listen(PORT, (error) => {
  if (error) throw error
  console.log(`listening on port:${PORT}`)
})
