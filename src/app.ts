import 'dotenv/config'
import express, { Request, Response, Application } from 'express'
import userRoutes from '@routes/users'
import authRoutes from '@routes/auth'
import requestRoutes from '@routes/request'
import { notFoundMiddleware } from '@middlewares/error'
import passport from '@middlewares/passport'
import appRoutes from '@routes/app'
import morgan from 'morgan'
import redis from '@config/redis'
import compression from 'compression'
import ticketRoutes from '@routes/ticket'

const createServer = () => {
  const app: Application = express()

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(compression())
  // cors
  app.use((req: Request, res: Response, next) => {
    const ALLOW = [
      'http://localhost:3000',
      'http://localhost:8080',
      'http://ticketapp.cl'
    ]
    
    const ORIGIN = req.headers.origin as string

    if (ALLOW.includes(ORIGIN)) {
      res.header('Access-Control-Allow-Origin', ORIGIN)
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
      next()
    }

    else next('no cors')
  })

  redis.connect()

  app.disable('x-powered-by')

  app.get('/heal', (req: Request, res: Response) => {
    res.json({
      status: 'UP',
      timestamp: new Date(),
      uptime: parseInt(process.uptime().toString(), 10)
    })
  })

  app.use(morgan('dev'))

  app.use('/favicon.ico', (req, res) => res.status(404))

  app.use('/', appRoutes)

  app.use('/ticket', ticketRoutes)


  app.use('/auth', authRoutes)

  app.use(passport)

  app.use('/users', userRoutes)
  app.use('/request', requestRoutes)

  app.use(notFoundMiddleware)

  // connect to db
  return app

}
export { createServer }