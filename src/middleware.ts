import { TOKEN_COOKIE } from '@constants/config';
import { verifyJwtToken } from '@utils/jwt.helper';
import type { APIContext, MiddlewareNext } from 'astro';

const AUTH_PAGES = ['/login'];
const TOKEN_SECURED_PAGES = ['/private', '/admin'];
const isAuthPages = (url: string) => AUTH_PAGES.some(page => url.startsWith(page));
const isSecuredPages = (url: string) => TOKEN_SECURED_PAGES.some(page => url.startsWith(page));

const apiRouteValidator = (context: APIContext, next: MiddlewareNext) => {
    console.log('API route validation');

    return next();
};

export async function onRequest(context: APIContext, next: MiddlewareNext) {
    const { cookies, url } = context;
    if (url.pathname.startsWith('/icons')) return next();
    if (url.pathname.startsWith('/api/endpoints')) return apiRouteValidator(context, next);

    const token = cookies.get(TOKEN_COOKIE)?.value;
    const hasVerifiedToken = token && (await verifyJwtToken(token));
    const isAuthPageRequested = isAuthPages(url.pathname);
    const isPrivatePageRequested = isSecuredPages(url.pathname);

    if (isAuthPageRequested) {
        if (hasVerifiedToken) {
            return context.redirect('/private', 302);
        }
        cookies.delete(TOKEN_COOKIE);
        return next();
    }

    if (isPrivatePageRequested && !hasVerifiedToken) {
        const searchParams = new URLSearchParams(url.searchParams);
        searchParams.set('next', url.pathname);

        const response = context.redirect('/login', 302);
        cookies.delete(TOKEN_COOKIE);
        return response;
    }

    return next();
}
