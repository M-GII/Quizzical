import express from "express"
import { registerUser, loginUser } from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
const userRouter = express.Router()

userRouter.post('/register',authUser, registerUser)
userRouter.post('/login', authUser, loginUser)


export default userRouter