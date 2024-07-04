import { type APIContext } from "astro";
import { Helpers } from "../../helpers/api.helpers";

export async function POST({request}: APIContext) {
    const body = await request.json();
    console.log({
        body
    });
    
    return Helpers.json(
        'Holi', 202
    );
}