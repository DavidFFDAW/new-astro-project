import type { APIContext } from 'astro';
import { Helpers } from '../../helpers/api.helpers';

export async function POST(ctx: APIContext) {
    return Helpers.json('Hello from the protected login endpoint', 404);
}
