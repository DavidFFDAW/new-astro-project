import { db } from '../db.js'
import { wrestlers } from '@database/schema/wrestler.js';

export function getPagedWrestlers(limit = 10, offset = 0) {
    return db.select().from(wrestlers).limit(limit).offset(offset).execute();
}