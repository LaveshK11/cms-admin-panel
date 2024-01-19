import Team from "../../db/models/TeamModel";


class TeamServices {

    constructor() { }

    private async deleteOpeations(userId: string): Promise<object> {

        let result: number = await Team.destroy({ where: { id: userId } })

        if (result) return { status: true, message: "Team Member Deleted Successfully" }
        else return { sataus: false, message: "No Team Member Found" }
    }

    public async deleteMember(id: string): Promise<object> {
        console.log(id)
        const result: object = this.deleteOpeations(id)
        return result
    }
}


export default TeamServices;