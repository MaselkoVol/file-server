import { NextFunction, Request, Response } from "express";
import { DeleteManyFilesDto, deleteManyFilesSchema } from "./dtos";
import validateOrThrow from "../shared/utils/validateOrThrow";
import service from "./service";
import { ResponseType } from "../shared/types";

export default {
  async deleteManyFiles(
    req: Request<{}, {}, { pathnames: string[] }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = validateOrThrow<DeleteManyFilesDto>(
        deleteManyFilesSchema,
        req.body,
      );
      await service.deleteManyFiles(data.pathnames);
      res.status(200).send({ success: true } as ResponseType);
    } catch (error) {
      next(error);
    }
  },
};
