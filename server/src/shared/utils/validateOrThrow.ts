import { ZodType } from "zod";
import { AppError } from "../errors";

export default function validateOrThrow<T>(
  schema: ZodType<T>,
  data: unknown,
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const fistIssue = result.error.issues[0];
    const code = fistIssue ? fistIssue.message : "BAD_REQUEST";
    throw new AppError({ code: code, statusCode: 400 });
  }
  return result.data;
}
