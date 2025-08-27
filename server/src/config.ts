export type RepositoryMode = "FILESYSTEM" | "DATABASE-FILESYSTEM" | "MOCK";
export type LoggerMode = "CONSOLE" | "FILE";

const config = {
  repositoryMode: "FILESYSTEM" as RepositoryMode,
  loggerMode: "CONSOLE" as LoggerMode,

  uploadsFolderName: "filesystem",

  foderNameMaxLength: 50,
  fileNameMaxLength: 100,
  pathnameMaxLength: 1000,
  port: 3000,

  bodyArrayMaxLength: 20,
};

export default config;
