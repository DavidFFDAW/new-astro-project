import { boolean, datetime, int, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';

export const wrestlers = mysqlTable('wrestler', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    alias: varchar('alias', { length: 255 }),
    brand: varchar('brand', { length: 255 }).notNull(),
    status: varchar('status', { length: 255 }).notNull(),
    isTag: boolean('is_tag'),
    isChampion: boolean('is_champ'),
    twitter_name: varchar('twitter_name', { length: 255 }).notNull(),
    twitter_acc: varchar('twitter_acc', { length: 255 }).notNull(),
    twitter_image: varchar('twitter_image', { length: 255 }),
    finisher: varchar('finisher', { length: 255 }).notNull(),
    overall: int('overall').notNull(),
    sex: varchar('sex', { length: 1 }).notNull(),
    kayfabe_status: varchar('kayfabe_status', { length: 255 }).notNull(),
    created_at: datetime('created_at'),
    updated_at: datetime('updated_at'),
    image: varchar('image_name', { length: 255 }),
    categories: varchar('categories', { length: 150 }),
});
