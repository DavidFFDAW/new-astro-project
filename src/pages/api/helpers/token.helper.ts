import { TOKEN_COOKIE } from '@constants/config';
import { getJwtSecretKey, verifyJwtToken } from '@utils/jwt.helper';
import { type APIContext } from "astro";
import { SignJWT } from 'jose';
import userDao from '@database/models/user.dao';

export async function getJWT(req: APIContext) {
    const cookieToken = req.cookies.get(TOKEN_COOKIE);
    const bearerToken = {
        value: req.request.headers.get('Authorization')?.split(' ')[1],
    };
    const token = !bearerToken ? cookieToken : bearerToken;

    if (!token || !token.value) return null;
    return verifyJwtToken(token.value);
}

export async function isTokenValid(token: string) {
    const tokenUser: any = await verifyJwtToken(token);
    if (!tokenUser) return false;

    const user = await userDao.getUserByAPIToken(tokenUser.api_token);
    if (!user) return false;

    return tokenUser.email === user.email;
}

export function getSignedToken(datas: {}) {
    return (
        new SignJWT({ ...datas })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            // .setExpirationTime('15d')
            .sign(getJwtSecretKey())
    );
}

export default {
    getJWT,
    isTokenValid,
    getSignedToken,
}