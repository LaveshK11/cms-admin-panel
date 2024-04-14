import Team, { TeamAttributes } from "../../db/models/TeamModel";
import { ServerError, ValidationError } from "../../utils/custom/customError";
import { ValidationResult } from "../../utils/interface/jodResult";
import { TeamMemberFormSchema } from "../../utils/validation/schemas/dataObj";

class Team_Services {

    constructor() { }

    private async deleteOperations(userId: string): Promise<object> {

        let result: number = await Team.destroy({ where: { id: userId } })

        if (result) return { status: true, message: "Team Member Deleted Successfully" }
        else return { status: false, message: "No Team Member Found" }
    }

    private async isExistingMember(email: string): Promise<boolean> {

        let result: object | null = await Team.findOne({ where: { email: email } })

        if (result == null) return false;

        return true;
    }

    private async addOperation(data: TeamAttributes): Promise<object> {

        try {

            const alreadyMember: boolean = await this.isExistingMember(data.email)

            if (alreadyMember) return { status: false, message: "Already team member" }
            else {

                await Team.create(data)

                return { status: true, message: "Team Member added successfully" }

            }

        } catch (error) {

            throw new ServerError()

        }


    }

    public async deleteMember(id: string): Promise<object> {
        const result: object = await this.deleteOperations(id)
        return result
    }

    public async addTeamMember(data: TeamAttributes): Promise<object> {
        try {
            const validateData: ValidationResult = TeamMemberFormSchema.validate(data)

            if (validateData.error) return new ValidationError(validateData.error.message)

            const result: object = await this.addOperation(data)

            return result;
        } catch (error: any) {
            return new ServerError(error.message);

        }

    }

}


export default Team_Services;