import express from 'express';
import { register } from '@/controllers/authController';
import tryCatch from '@utils/tryCatch'
import schemaValidator from '@/middlewares/schemaValidator';
import { authRegisterSchema } from '@/schemas/auth';

const authRouter = express.Router();

authRouter.post('/register', schemaValidator(authRegisterSchema),tryCatch(register))

export default authRouter;