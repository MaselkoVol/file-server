import z from "zod";
import config from "../config";
import {
  createNameSchema,
  createPathSchema,
  pathnameSchema,
} from "../shared/dtos";
import { ErrorMessages } from "../shared/errors";

const nameSchema = createNameSchema(config.fileNameMaxLength);
const pathSchema = createPathSchema(
  config.pathnameMaxLength - config.fileNameMaxLength,
);

export const deleteManyFilesSchema = z.object({
  pathnames: z
    .array(pathnameSchema, ErrorMessages.NOT_ARRAY)
    .min(1, ErrorMessages.EMPTY_ARRAY)
    .max(config.bodyArrayMaxLength, ErrorMessages.ARRAY_TOO_LONG),
});

export type DeleteManyFilesDto = z.infer<typeof deleteManyFilesSchema>;
