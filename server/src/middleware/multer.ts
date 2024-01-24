import { Request } from "express";
import multer from 'multer';
import { normalize } from "path";

type DestinationCallback = (error: Error | null, filename: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;



const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: DestinationCallback) {
        if (req.path == "/addMember") {
            cb(null, normalize('src/images/TeamMemberImage'));
        }
        else {
            cb(null, 'src/images/proertyImage');
        }
    },
    filename: function (req: Request, file: Express.Multer.File, cb: FileNameCallback) {
        cb(null, file.fieldname + '-' + file.originalname);
    }
});

export const upload = multer({ storage: storage });
