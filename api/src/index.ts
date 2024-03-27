//Importing project dependancies that we installed earlier
import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors' 
import helmet from 'helmet'

import validateEnv from '@utils/validateEnv'

dotenv.config()

validateEnv();

const app = express(); 

app.use(helmet()); 
app.use(cors()); 
app.use(express.json())

export default app