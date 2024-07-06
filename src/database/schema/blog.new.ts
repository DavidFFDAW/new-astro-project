import { bigint, boolean, datetime, mysqlTable, serial, text, varchar } from 'drizzle-orm/mysql-core';

export const blog = mysqlTable('blog', {
    id: serial('id').primaryKey(),
    image: varchar('image', { length: 255 }),
    title: varchar('title', { length: 255 }).notNull(),
    content: text('content').notNull(),
    admin_id: bigint('admin_id', { mode: 'number', unsigned: true }).notNull(),
    created_at: datetime('created_at'),
    updated_at: datetime('updated_at'),
    excerpt: text('exceptr'),
    visible: boolean('visible'),
    category: varchar('category', { length: 255 }),
    deletable: boolean('deletable'),
});
