import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: import.meta.env.DB_HOST,
    user: import.meta.env.DB_USER,
    database: import.meta.env.DB_NAME,
    password: import.meta.env.DB_PASSWORD,
});

export const db = drizzle(connection);
