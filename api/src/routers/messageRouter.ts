import express from 'express';
import tryCatch from '@utils/tryCatch'
import isAuthenticated from '@/middlewares/isAuthenticated';
import { getRoomMessages } from '@/controllers/messageController';

const messageRouter = express.Router();

messageRouter.get('/room/:id', isAuthenticated,tryCatch(getRoomMessages))

export default messageRouter;