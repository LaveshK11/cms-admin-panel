import express, { Request, Response } from "express";
import { bulkImages, uploadController } from "../../../controller/uploadController/uploads";
import { upload } from "../../../middleware/multer";

const router = express.Router();

router.get('/testing', (req: Request, res: Response) => {
    res.send("Login working");
})

router.post('/', uploadController)

router.post('/uploadForm', upload.array('PropertyImage' ,10), bulkImages)


export default router;