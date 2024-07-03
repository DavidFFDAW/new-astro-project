import { db } from '@database/db.js';
import { eq } from 'drizzle-orm';
import { users } from '@database/schema/user';

export function getUserByAPIToken(apiToken: string) {
    return db.select().from(users).where(eq(users.api_token, apiToken)).execute()
        .then((results) => results[0]);
}

export default {
    getUserByAPIToken,
}