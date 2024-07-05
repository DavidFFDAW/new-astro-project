import { type APIContext } from 'astro';
import { Helpers } from '../../helpers/api.helpers';
import userDao from '@database/models/user.dao';
import { getSignedToken } from '../../helpers/token.helper';
import { TOKEN_COOKIE } from '@constants/config';

export async function POST({ request }: APIContext) {
    try {
        const body = await request.json();
        const { error, joinedFields } = Helpers.checkRequiredFields(body, ['email', 'password']);
        if (error) {
            return Helpers.json(`Los campos: [${joinedFields}] son requeridos`, 400);
        }

        const foundUser = await userDao.getUserByEmail(body.email.trim());
        if (!foundUser) {
            return Helpers.json('Usuario no encontrado', 404);
        }
        const passwordMatch = await userDao.doPasswordMatch(body.password, foundUser.password);
        if (!passwordMatch) {
            return Helpers.json('Alguno de los datos de inicio de sesión utilizados no es correcto. Revisalo', 401);
        }

        const userTokenize = {
            id: foundUser.id,
            name: foundUser.name,
            username: foundUser.username,
            email: foundUser.email,
            api_token: foundUser.api_token,
            role: foundUser.type,
        };

        const token = await getSignedToken(userTokenize);
        const cookieMaxAge = 60 * 60 * 24 * 30; // 30 days
        const response = Helpers.json('Inicio de sesión exitoso', 200);
        response.headers.set(
            'Set-Cookie',
            `${TOKEN_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${cookieMaxAge}`,
        );

        return response;
    } catch (error) {
        return Helpers.json('Error al intentar iniciar sesión', 500);
    }
}

// set the token in the cookie
