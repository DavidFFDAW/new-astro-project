import { db } from '@database/db.js';
import { eq } from 'drizzle-orm';
import { users } from '@database/schema/user';
import bcrypt from 'bcryptjs';

export function getUserByAPIToken(apiToken: string) {
    return db
        .select()
        .from(users)
        .where(eq(users.api_token, apiToken))
        .execute()
        .then(results => results[0]);
}

export function getUserByEmail(email: string) {
    return db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .execute()
        .then(results => results[0]);
}

export function doPasswordMatch(password: string, hash: string) {
    return bcrypt.compare(password, hash);
}

export default {
    getUserByAPIToken,
    getUserByEmail,
    doPasswordMatch,
};
