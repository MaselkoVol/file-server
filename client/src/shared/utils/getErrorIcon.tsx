import { ErrorMessages } from "../errors";

import {
  ExclamationTriangleIcon,
  FolderMinusIcon,
  NoSymbolIcon,
} from "@heroicons/react/16/solid";

export const getErrorIcon = (errorCode: string) => {
  switch (errorCode) {
    case ErrorMessages.NO_FOLDER:
      return <FolderMinusIcon />;
    case ErrorMessages.NETWORK_ERROR:
      return <ExclamationTriangleIcon />;
    default:
      return <NoSymbolIcon />;
  }
};
