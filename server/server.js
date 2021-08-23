// import options from './config'

const express = require('express')
const cors = require('cors')
const path = require('path')
const http = require('http')

const app = express()
const port = process.env.PORT || 5001

// const PORT = options.port

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

server.listen(port, (error) => {
  if (error) throw error
  console.log(`listening on port:${port}`)
})
