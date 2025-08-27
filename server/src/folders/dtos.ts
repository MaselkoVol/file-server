import z from "zod";
import config from "../config";
import {
  createNameSchema,
  createPathSchema,
  pathnameSchema,
} from "../shared/dtos";
import { ErrorMessages } from "../shared/errors";

export const nameSchema = createNameSchema(config.foderNameMaxLength);
export const pathSchema = createPathSchema(
  config.pathnameMaxLength -
    config.foderNameMaxLength -
    config.fileNameMaxLength,
);

export const createFolderSchema = z.object({
  name: nameSchema,
  path: pathSchema,
});
export type CreateFolderDto = z.infer<typeof createFolderSchema>;

export const deleteManyFoldersSchema = z.object({
  pathnames: z
    .array(pathnameSchema, ErrorMessages.NOT_ARRAY)
    .min(1)
    .max(config.bodyArrayMaxLength),
});
export type DeleteManyFoldersDto = z.infer<typeof deleteManyFoldersSchema>;

export const getFolderContentSchema = z.object({
  pathname: pathnameSchema,
});
export type GetFolderContentDto = z.infer<typeof getFolderContentSchema>;
