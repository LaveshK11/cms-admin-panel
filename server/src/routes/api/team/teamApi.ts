import express, { Request, Response } from 'express';
import { DeleteTeamMember } from '../../../controller/teamController/deleteController';
import { AddTeamMember } from '../../../controller/teamController/addMemberController';
import { upload } from '../../../middleware/multer';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send("Signup Working");
})

router.post('/addMember', upload.single('image'), AddTeamMember)

router.delete('/delete/:id', DeleteTeamMember)


export default router;