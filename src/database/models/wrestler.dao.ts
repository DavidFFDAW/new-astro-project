import { eq, like } from 'drizzle-orm';
import { db } from '../db.js'
import { wrestlers } from '@database/schema/wrestler.js';

export function getPagedWrestlers(limit: number = 10, offset: number = 0) {
    return db.select().from(wrestlers).limit(limit).offset(offset).execute();
}
export function getFilterableWrestlers(filters: any, limit: number = 10, offset: number = 0) {
    const query = db.select().from(wrestlers);
    
    if (filters.name) query.where(like(wrestlers.name, `%${filters.name}%`));

    return query.limit(limit).offset(offset).execute();
}

export function getWrestlerById(id: number) {
    return db.select().from(wrestlers).where(eq(wrestlers.id, id)).execute().then((results) => results[0]);
}

export default {
    getPagedWrestlers,
    getFilterableWrestlers,
    getWrestlerById,
}