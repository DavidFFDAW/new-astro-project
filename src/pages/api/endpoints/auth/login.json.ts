import { type APIContext } from "astro";

export async function POST(req: APIContext) {
    return new Response(
        JSON.stringify({
            message: "Hello World!"
        }),
        {
            headers: {
                "content-type": "application/json",
            },
        }
    );
}