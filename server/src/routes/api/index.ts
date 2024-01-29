import express from 'express';
import loginApi from "./auth/login/userlogin"
import uploadApi from "./uploads/upload"
import team from "./team/teamApi"
const router = express.Router();

router.use('/login', loginApi)

router.use('/upload', uploadApi)

router.use('/team' , team)
    



export default router;