import express from 'express';
import tryCatch from '@utils/tryCatch'
import isAuthenticated from '@/middlewares/isAuthenticated';
import { getRoom, getUserRooms } from '@/controllers/roomController';

const roomRouter = express.Router();

roomRouter.get('/', isAuthenticated,tryCatch(getUserRooms))
roomRouter.get('/:roomId', isAuthenticated,tryCatch(getRoom))

export default roomRouter;