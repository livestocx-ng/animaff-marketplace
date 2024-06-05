export {default} from 'next-auth/middleware';
import {NextRequest, NextResponse} from 'next/server';

export const config = {matcher: ['/account']};

// type Middleware = (req: NextRequest) => Promise<NextResponse>;

// export const middleware: Middleware = async (req) => {
// 	const response = await fetch(`http://ip-api.com/json`);
// 	const data = await response.json();

// 	console.log(`[MIDDLEWARE-RESPONSE] :: `, data);

// 	if (data.countryCode === 'NG') {
// 		const newPath = `https://linkedin.com/in/yada-martins`;
// 		// const newPath = `/country/us${req.nextUrl.pathname}${req.nextUrl.search}`;
// 		const newUrl = new URL(newPath, req.url);

// 		if (req.nextUrl.pathname.startsWith('/country/us')) {
// 			return NextResponse.next();
// 		}

// 		// Redirect with the new URL
// 		return NextResponse.redirect(newUrl, {status: 301});
// 	} else {
// 		return NextResponse.next();
// 	}
// };

// export const config = {
//     matcher: [
//         /*
//          * Match all request paths except for the ones starting with:
//          * - api (API routes)
//          * - static (static files)
//          * - favicon.ico (favicon file)
//          * - _next (debug files)
//          */
//         '/account',
//         "/((?!api|static|favicon.ico|_next|_next/image|images).*)"
//     ]
// };
