import { NextFunction, Response, Request } from "express"
import TeamServices from "../../services/team/teamServices";


const TeamService = new TeamServices()
export async function AddTeamMember(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        req.body.image = "http://localhost:8080/src/images/TeamMemberImages/" + req.file?.filename

        console.log(req.body)
        let result = await TeamService.addTeamMember(req.body)

        res.status(200).json(result);

    } catch (error) {
        console.log(error   )
        next(error);
    }
}
