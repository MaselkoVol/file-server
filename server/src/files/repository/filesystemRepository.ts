import { promises as fs } from "node:fs";
import getUploadsAbsolutePath from "../../shared/utils/getUploadsAbsolutePath";
import { FilesRepository } from "./createFilesRepository";

const filesystemRepository: FilesRepository = {
  async deleteFile(pathname: string) {
    const absolutePathname = getUploadsAbsolutePath(pathname);
    try {
      const itemStats = await fs.stat(absolutePathname);
      if (!itemStats.isFile()) {
        return { status: "NO_FILE" };
      }
      await fs.rm(absolutePathname, { recursive: true });
      return { status: "OK" };
    } catch (error: any) {
      switch (error.code) {
        case "ENOENT":
        case "EISDIR":
          return { status: "NO_FILE" };

        case "ENAMETOOLONG":
        case "EINVAL":
          return { status: "INVALID_PATHNAME" };

        default:
          return { status: "INTERNAL_ERROR" };
      }
    }
  },

  async getFileInfo(pathname: string) {
    const absolutePathname = getUploadsAbsolutePath(pathname);
    try {
      const stats = await fs.stat(absolutePathname);
      if (!stats.isFile()) {
        return { status: "NO_FILE" };
      }
      return {
        status: "OK",
        data: {
          pathname: pathname,
          size: stats.size,
          date: stats.mtime,
        },
      };
    } catch (error: any) {
      switch (error) {
        case "ENOENT":
        case "EISDIR":
          return { status: "NO_FILE" };

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
