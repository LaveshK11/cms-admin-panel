import { NextFunction, Response, Request } from "express"
import ListingServices from "../../services/uploads/listing";

const LisitngService = new ListingServices()

export async function uploadController(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        // let result = await loginProcess.getUserCred(req.body)


        res.status(200).json();
    } catch (error) {
        next(error);
    }
}



export async function bulkImages(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {

        let data: object = await LisitngService.upload_lisitng(req.body)

        res.status(200).json(data)

    } catch (error) {
        console.log(error)
        next(error)
    }

}