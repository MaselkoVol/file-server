import config from "../config";
import {
  AlreadyExistsError,
  DiskFullError,
  InternalError,
  InvalidPathnameError,
  NoFolderError,
} from "../shared/errors";
import createFoldersRepository from "./repository/createFoldersRepository";

import filesService, { FileType } from "../files/service";
import { ItemType } from "../shared/types";
import removeRedundantPathnames from "../shared/utils/removeRedundentPathnames";

export type FolderType = { pathname: string };

export type FolderContentType = {
  folders: FolderType[];
  files: FileType[];
};

const repository = createFoldersRepository(config.repositoryMode);

async function appendCurrentItemsTo(
  allNestedItems: ItemType[],
  items: ItemType[],
) {
  for (const item of items) {
    allNestedItems.push(item);
    if (item.isFolder) {
      await appendRecursivelyAllItemsTo(allNestedItems, item.pathname);
    }
  }
}

async function appendRecursivelyAllItemsTo(
  allNestedItems: ItemType[],
  pathname: string,
) {
  const items = await repository.getFolderItems(pathname);
  switch (items.status) {
    case "OK":
      await appendCurrentItemsTo(allNestedItems, items.data);
    case "INVALID_PATHNAME":
    case "NO_FOLDER":
      return;
    case "INTERNAL_ERROR":
      throw new InternalError();
  }
}

async function deleteEmptyFolder(pathname: string) {
  const result = await repository.deleteFolder(pathname);
  switch (result.status) {
    case "OK":
    case "INVALID_PATHNAME":
    case "NO_FOLDER":
      return;

    case "INTERNAL_ERROR":
      throw new InternalError();
  }
}

async function deleteAllNestedItems(pathname: ItemType[]) {
  while (pathname.length) {
    const item = pathname.pop();
    if (!item) return;
    if (item.isFolder) {
      await deleteEmptyFolder(item.pathname);
    } else {
      await filesService.deleteFile(item.pathname);
    }
  }
}

async function getFolderItems(pathname: string) {
  const items = await repository.getFolderItems(pathname);
  switch (items.status) {
    case "OK":
      return items.data;
    case "INVALID_PATHNAME":
      throw new InvalidPathnameError();
    case "NO_FOLDER":
      throw new NoFolderError();
    case "INTERNAL_ERROR":
      throw new InternalError();
  }
}

async function sortByPathname(items: { pathname: string }[]) {
  items.sort((item1, item2) =>
    item1.pathname.localeCompare(item2.pathname, "en"),
  );
}

export default {
  async createFolder(pathname: string) {
    const result = await repository.createFolder(pathname);
    switch (result.status) {
      case "OK":
        return pathname;
      case "ALREADY_EXISTS":
        throw new AlreadyExistsError();
      case "INVALID_PATHNAME":
        throw new InvalidPathnameError();
      case "DISK_FULL":
        throw new DiskFullError();
      case "INTERNAL_ERROR":
        throw new InternalError();
    }
  },

  async deleteFolder(pathname: string): Promise<ItemType[]> {
    const allNestedItems: ItemType[] = [];
    await appendRecursivelyAllItemsTo(allNestedItems, pathname);
    if (allNestedItems.length > 0) {
      allNestedItems.unshift({ pathname: pathname, isFolder: true });
    } else {
      return allNestedItems;
    }
    const allNestedItemsCopy = allNestedItems.slice();
    await deleteAllNestedItems(allNestedItemsCopy);
    return allNestedItems;
  },

  async deleteManyFolders(pathnames: string[]) {
    const filteredPathnames = removeRedundantPathnames(pathnames);
    const promises = filteredPathnames.map((pathname) =>
      this.deleteFolder(pathname),
    );
    const allDeletedItems = await Promise.all(promises);
    return allDeletedItems;
  },

  async getFolderContent(pathname: string): Promise<FolderContentType> {
    console.log(pathname);
    const items = await getFolderItems(pathname);
    const folderItems: ItemType[] = [];
    const filesPromises: Promise<FileType>[] = [];
    for (const item of items) {
      if (item.isFolder) {
        folderItems.push(item);
        continue;
      }
      filesPromises.push(filesService.getFileInfo(item.pathname));
    }
    const folders: FolderType[] = folderItems.map((item) => ({
      pathname: item.pathname,
    }));
    const files = await Promise.all(filesPromises);
    sortByPathname(folders);
    sortByPathname(files);
    return {
      folders: folders,
      files: files,
    };
  },
};
