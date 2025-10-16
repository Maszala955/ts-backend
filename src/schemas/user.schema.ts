import { z } from "zod";

export const createUserSchema = z.object({
    email: z.email(),
    name: z.string().min(1)
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const userSchema = createUserSchema.extend({
    id: z.number().int().positive()
});
export type UserOutput = z.infer<typeof userSchema>;