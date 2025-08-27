import config from "../config";
import { NAME_REGEX, PATH_REGEX } from "./constants";
import { ErrorMessages } from "./errors";
import z from "zod";

export function createNameSchema(maxLength: number) {
  return z
    .string(ErrorMessages.NAME_NOT_STRING)
    .min(1, ErrorMessages.NAME_EMPTY)
    .max(maxLength, ErrorMessages.NAME_TOO_LONG)
    .regex(NAME_REGEX, ErrorMessages.NAME_INVALID);
}

export function createPathSchema(maxLength: number) {
  return z
    .string(ErrorMessages.PATH_NOT_STRING)
    .max(maxLength, ErrorMessages.PATH_TOO_LONG)
    .regex(PATH_REGEX, ErrorMessages.PATH_INVALID);
}

export const pathnameSchema = z
  .string(ErrorMessages.PATHNAME_NOT_STRING)
  // .min(1, ErrorMessages.PATHNAME_EMPTY)
  .max(config.pathnameMaxLength, ErrorMessages.PATHNAME_TOO_LONG)
  .regex(PATH_REGEX, ErrorMessages.PATHNAME_INVALID);
