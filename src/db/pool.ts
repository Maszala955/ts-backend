import { Pool } from "pg";
type DbPool = InstanceType<typeof Pool>;


let pool: DbPool | null = null;

export function getPool() {
    if (!pool) {
        const connectionString = process.env.DATABASE_URL;
        if (!connectionString) {
            throw new Error("DATABASE URL is not set");
        }
        pool = new Pool({
            connectionString,

        });
    }
    return pool;
}
