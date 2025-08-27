import { promises as fs } from "node:fs";
import { ItemType } from "../../shared/types";
import getUploadsAbsolutePath from "../../shared/utils/getUploadsAbsolutePath";
import {
  CreateFolderResponse,
  DeleteFolderResponse,
  FoldersRepository,
  GetFolderItemsResponse,
} from "./createFoldersRepository";
import { joinPathnames } from "../../shared/utils/joinPathnames";

const filesystemRepository: FoldersRepository = {
  async createFolder(pathname: string): Promise<CreateFolderResponse> {
    const absolutePathname = getUploadsAbsolutePath(pathname);
    try {
      await fs.mkdir(absolutePathname);
      return { status: "OK" };
    } catch (error: any) {
      switch (error.code) {
        case "EEXIST":
          return { status: "ALREADY_EXISTS" };

        case "ENOENT":
        case "ENAMETOOLONG":
        case "EINVAL":
          return { status: "INVALID_PATHNAME" };

        case "ENOSPC":
          return { status: "DISK_FULL" };

        default:
          return { status: "INTERNAL_ERROR" };
      }
    }
  },

  async getFolderItems(pathname: string): Promise<GetFolderItemsResponse> {
    const absolutePathname = getUploadsAbsolutePath(pathname);
    try {
      const items = await fs.readdir(absolutePathname, { withFileTypes: true });

      const data: ItemType[] = items.map((item) => ({
        pathname: joinPathnames(pathname, item.name),
        isFolder: item.isDirectory(),
      }));
      return { status: "OK", data: data };
    } catch (error: any) {
      switch (error.code) {
        case "ENOENT":
        case "ENOTDIR":
          return { status: "NO_FOLDER" };

        case "ENAMETOOLONG":
        case "EINVAL":
          return { status: "INVALID_PATHNAME" };

        default:
          return { status: "INTERNAL_ERROR" };
      }
    }
  },

  async deleteFolder(pathname: string): Promise<DeleteFolderResponse> {
    const absolutePathname = getUploadsAbsolutePath(pathname);
    try {
      const itemStats = await fs.stat(absolutePathname);
      if (!itemStats.isDirectory()) {
        return { status: "NO_FOLDER" };
      }
      await fs.rm(absolutePathname, { recursive: true });
      return { status: "OK" };
    } catch (error: any) {
      switch (error.code) {
        case "ENOENT":
        case "ENOTDIR":
          return { status: "NO_FOLDER" };

        case "ENAMETOOLONG":
        case "EINVAL":
          return { status: "INVALID_PATHNAME" };

        default:
          return { status: "INTERNAL_ERROR" };
      }
    }
  },
};

export default filesystemRepository;
