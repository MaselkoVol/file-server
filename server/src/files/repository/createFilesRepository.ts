import { RepositoryMode } from "../../config";
import { ItemType, RepositoryResponse } from "../../shared/types";
import { FileType } from "../service";
import filesystemRepository from "./filesystemRepository";

export type DeleteFileResponse = RepositoryResponse<
  "OK" | "NO_FILE" | "INVALID_PATHNAME" | "INTERNAL_ERROR"
>;

export type GetFileInfoResponse =
  | RepositoryResponse<"OK", FileType>
  | RepositoryResponse<"NO_FILE" | "INVALID_PATHNAME" | "INTERNAL_ERROR">;

export type FilesRepository = {
  deleteFile: (pathname: string) => Promise<DeleteFileResponse>;
  getFileInfo: (pathname: string) => Promise<GetFileInfoResponse>;
};

export default function createFilesRepository(
  mode: RepositoryMode,
): FilesRepository {
  switch (mode) {
    case "FILESYSTEM":
      return filesystemRepository;
    case "DATABASE-FILESYSTEM":
      throw new Error("Not implemented");
    case "MOCK":
      throw new Error("Not implemented");
  }
}
