import { mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';

export const wrestlers = mysqlTable('wrestler', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }),
    image: varchar('image_name', { length: 255 }),
});
