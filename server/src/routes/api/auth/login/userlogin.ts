import express, { Request, Response } from 'express';
import { userLogin } from '../../../../controller/loginController/login';

const router = express.Router();

router.get('/testing', (req: Request, res: Response) => {
    res.send("Login working");
})

router.post('/', userLogin)

export default router;