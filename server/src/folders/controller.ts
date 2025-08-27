import { NextFunction, Request, Response } from "express";
import { ItemBaseType, ItemType, ResponseType } from "../shared/types";
import {
  CreateFolderDto,
  createFolderSchema,
  DeleteManyFoldersDto,
  deleteManyFoldersSchema,
  GetFolderContentDto,
  getFolderContentSchema,
} from "./dtos";

import { io } from "..";
import validateOrThrow from "../shared/utils/validateOrThrow";
import service from "./service";

function emitMessagesToDeletedFolders(deletedFolders: ItemType[][]) {
  for (const arrayOfSubfolders of deletedFolders) {
    if (arrayOfSubfolders[0] && arrayOfSubfolders[0].isFolder) {
      io.emit("folder-deleted", arrayOfSubfolders[0].pathname);
    }
    for (const item of arrayOfSubfolders) {
      if (item.isFolder) {
        io.to(item.pathname).emit("current-folder-deleted");
      }
    }
  }
}

export default {
  async createFolder(
    req: Request<{}, {}, ItemBaseType>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = validateOrThrow<CreateFolderDto>(
        createFolderSchema,
        req.body,
      );
      const pathname = data.path + data.name;
      await service.createFolder(pathname);
      io.emit("folder-created", pathname);
      res
        .status(200)
        .send({ success: true, data: { pathname: pathname } } as ResponseType);
    } catch (e: any) {
      next(e);
    }
  },

  async deleteManyFolders(
    req: Request<{}, {}, { pathnames: string[] }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = validateOrThrow<DeleteManyFoldersDto>(
        deleteManyFoldersSchema,
        req.body,
      );
      const deletedFolders = await service.deleteManyFolders(data.pathnames);
      emitMessagesToDeletedFolders(deletedFolders);

      res.status(200).send({ success: true } as ResponseType);
    } catch (e: any) {
      next(e);
    }
  },

  async getFolderContent(
    req: Request<{}, {}, {}, { pathname: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = validateOrThrow<GetFolderContentDto>(
        getFolderContentSchema,
        req.query,
      );
      const result = await service.getFolderContent(data.pathname);
      return res
        .status(200)
        .json({ success: true, data: result } as ResponseType);
    } catch (error) {
      next(error);
    }
  },
};
