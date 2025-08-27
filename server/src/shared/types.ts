export type ResponseType<T = unknown> = {
  success: boolean;
  code?: string;
  data?: T;
};

export type RepositoryResponse<S, T = undefined> = T extends undefined
  ? { status: S }
  : { status: S; data: T };

export type ServerToClientEvents = {
  "folder-created": (path: string) => void;
  "folder-deleted": (path: string) => void;
  "current-folder-deleted": () => void;
};

export type ItemBaseType = { path: string; name: string };
export type ItemType = { pathname: string; isFolder: boolean };
