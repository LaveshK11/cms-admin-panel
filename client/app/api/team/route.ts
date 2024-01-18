import Team from "@/models/teams/TeamsModel";

export async function GET(request: Request): Promise<object> {

    try {
        const data: object[] = await Team.findAll({
        });
        return new Response(JSON.stringify(data.length > 0 ? data : { message: "No Data Found" }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }


}   