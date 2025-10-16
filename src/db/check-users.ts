import "dotenv/config";
import { getPool } from "./pool.js";

async function main() {
  const pool = getPool();
  const { rows } = await pool.query("SELECT id, email, name FROM users ORDER BY id");
  console.log(rows);
  await pool.end();
}
main().catch((e) => { console.error(e); process.exit(1); });
