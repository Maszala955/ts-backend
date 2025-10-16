import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod"

export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: "Invalid Body",
        details: result.error.flatten(),
      });
    }
    req.body = result.data;
    next();
  };
}
