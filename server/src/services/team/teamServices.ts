import Team, { TeamAttributes } from "../../db/models/TeamModel";
import { ServerError, ValidationError } from "../../utils/custom/customError";
import { ValidationResult } from "../../utils/interface/jodResullt";
import { TeamMemberFormSchema } from "../../utils/validation/schemas/dataObj";

class TeamServices {

    constructor() { }

    private async deleteOpeations(userId: string): Promise<object> {

        let result: number = await Team.destroy({ where: { id: userId } })

        if (result) return { status: true, message: "Team Member Deleted Successfully" }
        else return { sataus: false, message: "No Team Member Found" }
    }


    private async isExsistingMember(email: string): Promise<boolean> {

        let result: object | null = await Team.findOne({ where: { email: email } })

        if (result == null) return false;

        return true;
    }

    private async addOperation(data: TeamAttributes): Promise<object> {

        try {

            const alreayMember: boolean = await this.isExsistingMember(data.email)

            if (alreayMember) return { status: false, message: "Already Ateam Member" }
            else {
                
                await Team.create(data)

                return { status: true, message: "Team Member added successfully" }

            }

        } catch (error) {

            throw new ServerError()

        }


    }

    public async deleteMember(id: string): Promise<object> {
        const result: object = await this.deleteOpeations(id)
        return result
    }

    public async addTeamMember(data: TeamAttributes): Promise<object> {
        const validateData: ValidationResult = TeamMemberFormSchema.validate(data)

        if (validateData.error) return new ValidationError(validateData.error.message)

        const result: object = await this.addOperation(data)

        return result;
    }


}


export default TeamServices;