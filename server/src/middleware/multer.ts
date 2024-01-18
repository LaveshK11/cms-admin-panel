import { Request, Express } from "express";
import multer from 'multer';

type DestinationCallback = (error: Error | null, filename: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;



const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: DestinationCallback) {
        cb(null, 'src/images/propertyImage');
    },
    filename: function (req: Request, file: Express.Multer.File, cb: FileNameCallback) {
        cb(null, file.fieldname + '-' + file.originalname);
    }
});
    
export const upload = multer({ storage: storage });
