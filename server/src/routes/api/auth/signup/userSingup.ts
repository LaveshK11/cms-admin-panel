import express, { Request, Response } from 'express';
import { userSignup } from '../../../../controller/signupController/signup';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send("Signup Working");
})

router.post('/', userSignup)

export default router;