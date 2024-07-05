import { datetime, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    username: varchar('username', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    email_verified_at: datetime('email_verified_at'),
    password: varchar('password', { length: 255 }).notNull(),
    last_connection: datetime('last_connection'),
    image: varchar('image', { length: 255 }).notNull(),
    type: varchar('type', { length: 255 }).notNull(),
    remember_token: varchar('remember_token', { length: 100 }),
    created_at: datetime('created_at'),
    updated_at: datetime('updated_at'),
    api_token: varchar('api_token', { length: 255 }),
});
