import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';



export async function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;
    const isPublicPath = path.includes('/auth/signin') || path.includes('/auth/signup');

    if (!isPublicPath) {
        const currentUser: string | undefined = request.cookies.get('A_T')?.value
        if (currentUser != undefined && currentUser != null) {
            const result: boolean = await verifyToken();
            if (!result) {
                return NextResponse.redirect('/auth/signin')
            }
            else {
                return NextResponse.next();
            }
        }
        else {
            return NextResponse.redirect('/auth/signin')
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/team/:path*'],

};
