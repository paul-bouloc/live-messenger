import express from "express";
import authRouter from "./authRouter";

const appRouter = express.Router();

appRouter.use('/auth', authRouter)

export default appRouter;