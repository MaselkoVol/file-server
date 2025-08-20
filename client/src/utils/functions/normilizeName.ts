const MAX_LETTERS_IN_NAME = 20;
const ENDING_STRING = "...";

type Options = {
  maxLetters: number;
  endingString: string;
};

export const normilizeName = (name: string, options?: Options) => {
  const maxLetters = (options && options.maxLetters) || MAX_LETTERS_IN_NAME;
  const endingString = (options && options.endingString) || ENDING_STRING;
  return name.slice(0, maxLetters) + endingString;
};

export const normilizeFilename = (name: string, options?: Options) => {
  if (name.length < MAX_LETTERS_IN_NAME) return name;

  const filenameParts = name.split(".");
  const filename = filenameParts.slice(0, -1).join(".");
  const normilizedFilename = normilizeName(filename, options);
  return normilizedFilename + filenameParts[1];
};

export const normilizeFoldername = (name: string, options?: Options) => {
  const nameArray = name.split("/");
  const folderName = nameArray[nameArray.length - 1];
  if (folderName.length < MAX_LETTERS_IN_NAME) return folderName;
  return normilizeName(folderName, options);
};
