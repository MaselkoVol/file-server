import { Request, Response } from "express";
import { ZodAny } from "zod";
import { ResponseType } from "../types";

export default function validate(schema: ZodAny) {
  return (req: Request, res: Response) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const fistIssue = result.error.issues[0];
      const code = fistIssue ? fistIssue.message : "BAD_REQUEST";
      res.status(400).json({
        success: false,
        code: code,
      } as ResponseType);
    }
  };
}
