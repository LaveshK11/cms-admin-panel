import Team from "@/models/teams/TeamsModel";

interface Slug {
    params: {
        slug: string
    }
}
export async function GET(request: Request, params: Slug): Promise<object> {

    try {
        if (Number(params.params.slug)) {
            const data: object | null = await Team.findByPk(params.params.slug);
            return new Response(JSON.stringify(data != null ? { status: true, data } : { message: "No Data Found" }), {
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            console.log("ger")
            return new Response(JSON.stringify({ status: false, message: "No Data Found" }), {
                headers: { 'Content-Type': 'application/json' },
            })
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }


}   