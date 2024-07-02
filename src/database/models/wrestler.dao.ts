import { eq } from 'drizzle-orm';
import { db } from '../db.js'
import { wrestlers } from '@database/schema/wrestler.js';

export function getPagedWrestlers(limit: number = 10, offset: number = 0) {
    return db.select().from(wrestlers).limit(limit).offset(offset).execute();
}

export function getWrestlerById(id: number) {
    return db.select().from(wrestlers).where(eq(wrestlers.id, id)).execute().then((results) => results[0]);
}