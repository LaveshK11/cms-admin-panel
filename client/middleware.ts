import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';



export async function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;

    const isPublicPath = path.includes('/auth/signin') || path.includes('/auth/signup');

    const url = request.nextUrl.clone()

    url.pathname = '/auth/signin'

    if (!isPublicPath) {

        const currentUserToken: string | undefined = request.cookies.get('A_T')?.value

        if (currentUserToken != undefined && currentUserToken != null) {

            const result: boolean = await verifyToken(currentUserToken);

            if (!result) {
                return NextResponse.redirect(url)
            }
            else {
                return NextResponse.next();
            }
        }
        else {
            return NextResponse.redirect(url)
        }
    }
    else {
        return NextResponse.next();
    }
}



export const config = {
    matcher: ['/team/:path*', '/'],

};
