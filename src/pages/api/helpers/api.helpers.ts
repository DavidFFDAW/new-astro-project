import { type APIContext } from 'astro';
import { getJWT } from './token.helper';

export class Helpers {
    public static json(text: string, code: number) {
        return new Response(
            JSON.stringify({
                message: text,
            }),
            {
                status: code,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
    }

    public static redirect(endpoint: string, status: number) {
        return new Response(
            JSON.stringify({
                message: 'Redirecting...',
            }),
            {
                status: status,
                headers: {
                    Location: endpoint,
                },
            },
        );
    }

    public static getBodySanitized = (field: any, def: any = '') => {
        return field ? field : def;
    };

    public static tryCatch = (callback: any) => {
        try {
            return callback();
        } catch (error: any) {
            return Helpers.json(error.message, 500);
        }
    };

    public static checkRequiredFields(
        requestBody: any,
        requiredFields: string[],
    ): { error: boolean; fields: string[]; joinedFields: string } {
        const missingFields: string[] = requiredFields.reduce((acc: any, key: string) => {
            const isInBody = key in requestBody;
            if (isInBody) return acc;
            if (!isInBody && !requestBody[key]) acc.push(key);
            return acc;
        }, []);

        if (missingFields.length > 0)
            return { error: true, fields: missingFields, joinedFields: missingFields.join(',') };

        return { error: false, fields: [], joinedFields: '' };
    }

    public static getJWT(req: APIContext) {
        return getJWT(req);
    }

    public static getNonTokenResponse() {
        return Response.json(
            {
                message:
                    'No tienes permisos para realizar esta acción. Contacta con un administrador o inicia sesión en la API',
                status: 401,
            },
            { status: 401 },
        );
    }

    public static getNonValidTokenResponse() {
        return Response.json(
            {
                message: 'El token introducido no es válido. Contacta con un administrador o inicia sesión en la API',
                status: 401,
            },
            { status: 401 },
        );
    }
}
