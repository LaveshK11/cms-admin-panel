import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

console.log("middleware");

export async function middleware(request: NextRequest,) {

    const path = request.nextUrl.pathname;
    const isPublicPath = path.includes('/auth/signin') || path.includes('/auth/signup');

    if (isPublicPath) {
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
    else{
        console.log("here")
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/team/:p '],
};
