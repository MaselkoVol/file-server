import axios from "axios";
import { getResponseBody } from "../shared/utils/response";
import type { ResponseType } from "../shared/types";
import config from "../config";
import type { FileType } from "./files";

export type FolderType = { pathname: string };
export type FolderContentType = {
  folders: FolderType[];
  files: FileType[];
};

export type GetFolderContentRequestType = { pathname: string };
export type GetFolderContentResponseType = FolderContentType;

export const getFolderContent = async ({
  pathname,
}: GetFolderContentRequestType): Promise<GetFolderContentResponseType> => {
  const searchParams = new URLSearchParams();
  searchParams.append("pathname", pathname);
  const url = `${config.serverUrl}/folders?${searchParams.toString()}`;
  const request = axios.get<ResponseType<GetFolderContentResponseType>>(url);

  const body = await getResponseBody(request);
  return body;
};
