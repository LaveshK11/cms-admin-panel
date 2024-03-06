export async function verifyToken(token: string): Promise<boolean> {
    try {
        const response = await fetch('http://localhost:8080/api/v1/token/verify-accessToken', {
            method: 'POST',
            cache: 'force-cache',
            headers: {
                "Content-Type": "application/json",
                "Cookie": `A_T=${token}`
            }
        });
        const result = await response.json();


        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return result.status;

    } catch (error) {
        console.error('Error occurred during token verification:', error);
        // throw new Error('Error while verifying user');
        return false
    }
}
