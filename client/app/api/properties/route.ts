import AllProperties from "@/models/listPropertyModel/PropertiesModel";

export async function GET(request: Request): Promise<object> {

    try {
        const data: object[] = await AllProperties.findAll({
            attributes: ["id", "Property_Ref_No"]
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