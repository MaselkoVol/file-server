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
import path from "node:path";

async function getItemSize(absolutePathname: string) {
  try {
    const stats = await fs.stat(absolutePathname);
    if (stats.isDirectory()) return 0;
    return stats.size;
  } catch (error) {
    return 0;
  }
}

async function getFolderItemsWithAbsolutePathnames(
  absolutePathname: string,
): Promise<ItemType[]> {
  try {
    const items = await fs.readdir(absolutePathname, { withFileTypes: true });
    return items.map((item) => ({
      pathname: path.join(absolutePathname, item.name),
      isFolder: item.isDirectory(),
    }));
  } catch {
    return [];
  }
}

function addFoldersIntoQueue(items: ItemType[], allNestedFolders: string[]) {
  for (const item of items) {
    if (!item.isFolder) continue;
    allNestedFolders.push(item.pathname);
  }
}

async function getCurrentFolderSize(
  absolutePathname: string,
  allNestedFolders: string[],
) {
  let currentSize = 0;
  const items = await getFolderItemsWithAbsolutePathnames(absolutePathname);
  addFoldersIntoQueue(items, allNestedFolders);

  const itemsSizesPromises = items.map((item) => getItemSize(item.pathname));
  const sizes = await Promise.all(itemsSizesPromises);
  sizes.forEach((size) => (currentSize += size));
  return currentSize;
}

async function getRecursivelyFolderSize(absolutePathname: string) {
  let totalSize = 0;
  const allNestedFolders = [absolutePathname];
  while (allNestedFolders.length) {
    const firstItem = allNestedFolders.shift();
    if (!firstItem) break;
    const size = await getCurrentFolderSize(firstItem, allNestedFolders);
    totalSize += size;
  }
  return totalSize;
}

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

  async getFolderInfo(pathname) {
    const absolutePathname = getUploadsAbsolutePath(pathname);
    try {
      const stats = await fs.stat(absolutePathname);
      if (!stats.isDirectory()) {
        return { status: "NO_FOLDER" };
      }
      const folderSize = await getRecursivelyFolderSize(absolutePathname);
      return {
        status: "OK",
        data: {
          pathname: pathname,
          size: folderSize,
          date: stats.mtime,
        },
      };
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
