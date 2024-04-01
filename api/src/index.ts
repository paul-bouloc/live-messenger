import express from 'express'
import cors from 'cors' 
import helmet from 'helmet'
import appRouter from '@/routers'
import errorHandler from '@middlewares/errorHandler'
import cookieParser from 'cookie-parser'
import extractUserFromJwt from '@/middlewares/extractUserFromJwt'

const app = express(); 

app.use(helmet())
  .use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }))
  .use(express.json({ limit: '20kb' }))
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser(process.env.COOKIE_SECRET_KEY))
  .use(extractUserFromJwt)
  .use(appRouter)
  .use(errorHandler);

export default app