import { Router } from "express";
import { login, register, userLists, userProfile } from "../controller/userController";

const userRouter = Router();

userRouter.post("/", login);

userRouter.post("/signup", register);

userRouter.get("/profile", userProfile);

userRouter.get("/list", userLists);

export default userRouter;