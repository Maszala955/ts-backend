import type { Request, Response } from "express";
import type { CreateUserInput } from "../schemas/user.schema.js";
import {
  listUsers,
  getUserById,
  createUser,
  deleteUser
} from "../services/user.service.js";

export async function listUsersCtrl(_req: Request, res: Response) {
  const data = await listUsers();
  res.json({ data });
}

export async function getUserCtrl(req: Request<{ id: string }>, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0)
    return res.status(400).json({ error: "Invalid id" });

  const user = await getUserById(id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ data: user });
}

export async function createUserCtrl(
  req: Request<unknown, unknown, CreateUserInput>,
  res: Response
) {
  const user = await createUser(req.body);
  res.status(201).json({ data: user });
}

export async function deleteUserCtrl(req: Request<{ id: string }>, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0)
    return res.status(400).json({ error: "Invalid id" });

  const ok = await deleteUser(id);
  if (!ok) return res.status(404).json({ error: "User not found" });
  res.status(204).send();
}
