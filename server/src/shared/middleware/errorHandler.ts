import { NextFunction, Request, Response } from "express";
import { ResponseType } from "../types";
import { AppError, InternalError } from "../errors";
import { Logger } from "../logger/createLogger";

export default function errorHandler(logger: Logger) {
  return (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      logger.error(err, { code: err.code });
      res
        .status(err.statusCode)
        .json({ success: false, code: err.code } as ResponseType);
    } else {
      logger.error(err, { path: req.path });
      const internalError = new InternalError();
      res
        .status(internalError.statusCode)
        .json({ success: false, code: internalError.code } as ResponseType);
    }
  };
}
