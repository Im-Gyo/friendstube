import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConn = {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_SCHEMA,
    connectionLimit: process.env.DATABASE_LIMIT,
}

export default mysql.createPool(dbConn);