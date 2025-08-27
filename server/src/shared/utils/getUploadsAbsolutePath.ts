import path from "node:path";
import config from "../../config";

export default function getUploadsAbsolutePath(relativePath: string) {
  return path.join(process.cwd(), config.uploadsFolderName, relativePath);
}
