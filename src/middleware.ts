import { TOKEN_COOKIE } from '@constants/config';
import { verifyJwtToken } from '@utils/jwt.helper';
import type { APIContext, MiddlewareNext } from 'astro';
import { Helpers } from './pages/api/helpers/api.helpers';

const AUTH_PAGES = ['/login'];
const TOKEN_SECURED_PAGES = ['/private', '/admin'];
const isAuthPages = (url: string) => AUTH_PAGES.some(page => url.startsWith(page));
const isSecuredPages = (url: string) => TOKEN_SECURED_PAGES.some(page => url.startsWith(page));

const apiRouteValidator = async (context: APIContext, next: MiddlewareNext) => {
    const { url } = context;
    const [_, rest] = url.pathname.split('/api/endpoints');

    if (rest.startsWith('/protected')) {
        const auth = context.request.headers.get('Authorization');
        if (!auth) return Helpers.json('No tienes permisos para hacer eso', 401);

        const token = auth.replace('Bearer ', '');
        if (!token) return Helpers.json('No tienes permisos para hacer eso', 401);

        const tokenValid = await verifyJwtToken(token);
        if (!tokenValid) return Helpers.json('El token proporcionado no es válido', 401);

        return next();
    }

    return next();
};

export async function onRequest(context: APIContext, next: MiddlewareNext) {
    const { cookies, url } = context;
    if (url.pathname.startsWith('/icons')) return next();
    if (url.pathname.startsWith('/api/endpoints')) return await apiRouteValidator(context, next);

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

    if (isPrivatePageRequested && hasVerifiedToken) {
        context.locals.user = hasVerifiedToken;
    }

    return next();
}
