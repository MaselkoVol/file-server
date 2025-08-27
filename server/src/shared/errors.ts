export const ErrorMessages = {
  INTERNAL_ERROR: "INTERNAL_ERROR",
  DISK_FULL: "DISK_FULL",
  ALREADY_EXISTS: "ALREADY_EXISTS",

  PATH_NOT_STRING: "PATH_NOT_STRING",
  PATH_TOO_LONG: "PATH_TOO_LONG",
  PATH_INVALID: "PATH_INVALID",

  NAME_NOT_STRING: "NAME_NOT_STRING",
  NAME_EMPTY: "NAME_EMPTY",
  NAME_TOO_LONG: "NAME_TOO_LONG",
  NAME_INVALID: "NAME_INVALID",

  PATHNAME_NOT_STRING: "PATHNAME_NOT_STRING",
  PATHNAME_EMPTY: "PATHNAME_EMPTY",
  PATHNAME_TOO_LONG: "PATHNAME_TOO_LONG",
  PATHNAME_INVALID: "PATHNAME_INVALID",

  NO_FOLDER: "NO_FOLDER",
  NO_FILE: "NO_FILE",

  NOT_ARRAY: "NOT_ARRAY",
  EMPTY_ARRAY: "EMPTY_ARRAY",
  ARRAY_TOO_LONG: "ARRAY_TOO_LONG",
};

export type AppErrorType = {
  statusCode: number;
  code: string;
};

export class AppError extends Error {
  public statusCode: number;
  public code: string;
  constructor({ code, statusCode }: AppErrorType) {
    super(code);
    this.statusCode = statusCode;
    this.code = code;
  }
}

export class InternalError extends AppError {
  constructor() {
    super({ code: ErrorMessages.INTERNAL_ERROR, statusCode: 500 });
  }
}

export class DiskFullError extends AppError {
  constructor() {
    super({ code: ErrorMessages.DISK_FULL, statusCode: 509 });
  }
}

export class AlreadyExistsError extends AppError {
  constructor() {
    super({ code: ErrorMessages.ALREADY_EXISTS, statusCode: 409 });
  }
}

export class InvalidPathnameError extends AppError {
  constructor() {
    super({ code: ErrorMessages.PATHNAME_INVALID, statusCode: 400 });
  }
}

export class NoFolderError extends AppError {
  constructor() {
    super({ code: ErrorMessages.NO_FOLDER, statusCode: 404 });
  }
}

export class NoFileError extends AppError {
  constructor() {
    super({ code: ErrorMessages.NO_FILE, statusCode: 404 });
  }
}
