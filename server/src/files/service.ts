import config from "../config";
import {
  InternalError,
  InvalidPathnameError,
  NoFileError,
} from "../shared/errors";
import createFilesRepository from "./repository/createFilesRepository";

export type FileType = { pathname: string; size: number; date: Date };

const repository = createFilesRepository(config.repositoryMode);

export default {
  async getFileInfo(pathname: string) {
    const result = await repository.getFileInfo(pathname);
    switch (result.status) {
      case "OK":
        return result.data;
      case "NO_FILE":
        throw new NoFileError();
      case "INVALID_PATHNAME":
        throw new InvalidPathnameError();
      case "INTERNAL_ERROR":
        throw new InternalError();
    }
  },

  async deleteFile(pathnames: string) {
    const result = await repository.deleteFile(pathnames);
    switch (result.status) {
      case "OK":
      case "INVALID_PATHNAME":
      case "NO_FILE":
        return;

      case "INTERNAL_ERROR":
        throw new InternalError();
    }
  },
  async deleteManyFiles(pathnames: string[]) {
    const promises = pathnames.map((pathname) => this.deleteFile(pathname));
    await Promise.all(promises);
    return pathnames;
  },
};
