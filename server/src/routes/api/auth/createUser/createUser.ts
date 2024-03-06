import express, { Request, Response } from 'express';
import { createUser } from '../../../../controller/signupController/createUser';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send("Signup Working");
})

router.post('/', createUser)

export default router;