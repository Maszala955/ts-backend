import "dotenv/config";
import { getPool } from "./pool.js";

async function migrate() {
    const pool = getPool();
    const client = await pool.connect();

    try {
        await client.query("BEGIN");
        await client.query(`
          CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL
          );
        `);
    const { rows } = await client.query(
        "SELECT COUNT(*)::int AS count FROM users"
    );

    const count = Number(rows[0]?.count ?? 0);
    if (count === 0) {
        await client.query(
        `INSERT INTO users (email, name)
         VALUES ($1, $2), ($3, $4), ($5, $6)`,
        [
          "alice@example.com", "Alice",
          "bob@example.com",   "Bob",
          "carol@example.com", "Carol",
        ]
      );
        console.log("Seeded users !!");
        
    } else {
        console.log("Users already seeded !!");
    }

    await client.query("COMMIT");
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
        await getPool().end();
    }
}

migrate().then(() => {
    console.log("Migration Done !!");
    process.exit(0);
})
.catch((err) => {
    console.error(err);
    process.exit(1);
});