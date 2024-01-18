import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send("Signup Working");
})

router.post('/login',)

export default router;