import express from 'express';
import tryCatch from '@utils/tryCatch'
import isAuthenticated from '@/middlewares/isAuthenticated';
import { getUserRooms } from '@/controllers/roomController';

const roomRouter = express.Router();

roomRouter.get('/', isAuthenticated,tryCatch(getUserRooms))

export default roomRouter;