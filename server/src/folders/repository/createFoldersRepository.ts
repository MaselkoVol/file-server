import { RepositoryMode } from "../../config";
import { ItemType, RepositoryResponse } from "../../shared/types";
import filesystemRepository from "./filesystemRepository";

export type CreateFolderResponse = RepositoryResponse<
  "OK" | "ALREADY_EXISTS" | "INVALID_PATHNAME" | "DISK_FULL" | "INTERNAL_ERROR"
>;

export type GetFolderItemsResponse =
  | RepositoryResponse<"OK", ItemType[]>
  | RepositoryResponse<"NO_FOLDER" | "INVALID_PATHNAME" | "INTERNAL_ERROR">;

export type DeleteFolderResponse = RepositoryResponse<
  "OK" | "NO_FOLDER" | "INVALID_PATHNAME" | "INTERNAL_ERROR"
>;

export type FoldersRepository = {
  createFolder: (pathname: string) => Promise<CreateFolderResponse>;
  getFolderItems: (pathname: string) => Promise<GetFolderItemsResponse>;
  deleteFolder: (pathname: string) => Promise<DeleteFolderResponse>;
};

export default function createFoldersRepository(
  mode: RepositoryMode,
): FoldersRepository {
  switch (mode) {
    case "FILESYSTEM":
      return filesystemRepository;
    case "DATABASE-FILESYSTEM":
      throw new Error("Not implemented");
    case "MOCK":
      throw new Error("Not implemented");
  }
}
