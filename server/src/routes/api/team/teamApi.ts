import express, { Request, Response } from 'express';
import { DeleteTeamMember } from '../../../controller/teamController/deleteController';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send("Signup Working");
})


router.delete('/delete/:id', DeleteTeamMember)

export default router;