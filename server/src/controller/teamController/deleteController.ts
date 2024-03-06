import { NextFunction, Response, Request } from "express"
import Team_Services from "../../services/team/teamServices";


const TeamService = new Team_Services()
export async function DeleteTeamMember(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        const id: string = req.params.id

        let result = await TeamService.deleteMember(id)

        res.status(200).json(result);

    } catch (error) {
        next(error);
    }
}
