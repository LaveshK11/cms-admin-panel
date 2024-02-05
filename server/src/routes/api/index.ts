import express from 'express';
import loginApi from "./auth/login/userlogin"
import uploadApi from "./uploads/upload"
import team from "./team/teamApi"
import tokensApi from "./auth/verifyTokens/verifyToken"
import userSignup from './auth/signup/userSingup';
const router = express.Router();

router.use('/login', loginApi)

router.use('/signup', userSignup)

router.use('/upload', uploadApi)

router.use('/team', team)

router.use('/token', tokensApi)



export default router;