import { getPool } from "../db/pool.js";
import { userSchema } from "../schemas/user.schema.js";
import type { CreateUserInput, UserOutput } from "../schemas/user.schema.js";

export async function listUsers(): Promise<UserOutput[]> {
  const pool = getPool();
  const { rows } = await pool.query("SELECT id, email, name FROM users ORDER BY id");
  return userSchema.array().parse(rows);
}

export async function getUserById(id: number): Promise<UserOutput | null> {
  const { rows } = await getPool().query(
    "SELECT id, email, name FROM users WHERE id = $1",
    [id]
  );
  const row = rows[0]
  return row ? userSchema.parse(row) : null;
}

export async function createUser(data: CreateUserInput): Promise<UserOutput> {
  const { rows } = await getPool().query(
    "INSERT INTO users (email, name) VALUES ($1, $2) RETURNING id, email, name",
    [data.email, data.name]
  );
  return userSchema.parse(rows[0]);
}

export async function deleteUser(id: number): Promise<boolean> {
  const result = await getPool().query("DELETE FROM users WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
}
