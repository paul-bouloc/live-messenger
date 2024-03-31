import express from 'express'
import cors from 'cors' 
import helmet from 'helmet'
import appRouter from '@/routers'
import errorHandler from '@middlewares/errorHandler'


const app = express(); 

app.use(helmet()); 
app.use(cors()); 
app.use(express.json({ limit: '20kb' }))
app.use(express.urlencoded({ extended: true }))
app.use(appRouter)
app.use(errorHandler)

export default app