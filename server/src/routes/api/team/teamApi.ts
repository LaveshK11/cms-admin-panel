import express, { Request, Response } from 'express';
import { DeleteTeamMember } from '../../../controller/teamController/deleteController';
import { AddTeamMember } from '../../../controller/teamController/addMemberController';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send("Signup Working");
})

router.post('/addMember', AddTeamMember)

router.delete('/delete/:id', DeleteTeamMember)

export default router;