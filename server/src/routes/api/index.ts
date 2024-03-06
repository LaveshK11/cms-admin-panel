import express from 'express';
import loginApi from "./auth/login/userlogin"
import uploadApi from "./uploads/upload"
import team from "./team/teamApi"
import tokensApi from "./auth/verifyTokens/verifyToken"
import userSignup from './auth/createUser/createUser';
import roles from "./role/roles"
import permission from "./permissions/permission"
const router = express.Router();

router.use('/login', loginApi)

router.use('/create_user', userSignup)

router.use('/upload', uploadApi)

router.use('/team', team)

router.use('/token', tokensApi)

router.use('/role', roles)

router.use('/permission', permission)

export default router;