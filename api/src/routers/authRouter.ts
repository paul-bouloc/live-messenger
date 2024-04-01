import express from 'express';
import { currentUser, login, logout, register } from '@/controllers/authController';
import tryCatch from '@utils/tryCatch'
import schemaValidator from '@/middlewares/schemaValidator';
import { authLoginSchema, authRegisterSchema } from '@/schemas/auth';
import isAuthenticated from '@/middlewares/isAuthenticated';

const authRouter = express.Router();

authRouter.post('/register', schemaValidator(authRegisterSchema),tryCatch(register))
authRouter.post('/login', schemaValidator(authLoginSchema),tryCatch(login))

authRouter.get('/me', isAuthenticated, tryCatch(currentUser))
authRouter.get('/logout', tryCatch(logout))

export default authRouter;