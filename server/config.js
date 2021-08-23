const dotenv = require('dotenv')

if (process.env.NODE_ENV !== 'production') dotenv.config()

const options = {
  port: process.env.PORT || 5001,
  env: process.env.NODE_ENV,
  app: process.env.APP,
  mongoURL: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
}

export default options
