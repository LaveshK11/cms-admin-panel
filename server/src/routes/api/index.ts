import express from 'express';
import loginApi from "./login/userlogin"
import uploadApi from "./uploads/upload"

const router = express.Router();

router.use('/login', loginApi)

router.use('/upload', uploadApi)

    



export default router;