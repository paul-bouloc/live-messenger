import express from "express";
import authRouter from "./authRouter";
import roomRouter from "./roomRouter";
import messageRouter from "./messageRouter";

const appRouter = express.Router();

appRouter.use('/auth', authRouter)
appRouter.use('/room', roomRouter)
appRouter.use('/message', messageRouter)

export default appRouter;