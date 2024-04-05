import express from "express";
import authRouter from "./authRouter";
import roomRouter from "./roomRouter";

const appRouter = express.Router();

appRouter.use('/auth', authRouter)
appRouter.use('/room', roomRouter)

export default appRouter;