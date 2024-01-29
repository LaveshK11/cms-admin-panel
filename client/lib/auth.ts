import ServerApi from "./instance/serverApiInstance";

export async function verifyToken(): Promise<boolean> {
    const result: any = await ServerApi.post('verify-accessToken')
    return result;
}
