import { Logger } from "./createLogger";

const consoleLogger: Logger = {
  info(message: string, meta?: Record<string, unknown>) {
    console.info(`[INFO] ${message}`, meta || "");
  },
  warn(message: string, meta?: Record<string, unknown>) {
    console.warn(`[WARN] ${message}`, meta || "");
  },
  error(error: string | Error, meta?: Record<string, unknown>) {
    if (error instanceof Error) {
      console.error(`[ERROR] ${error.message}`, {
        stack: error.stack,
        ...meta,
      });
    } else {
      console.error(`[ERROR] ${error}`, meta || "");
    }
  },
  debug(message: string, meta?: Record<string, unknown>): void {
    if (process.env.NODE_ENV === "development") {
      console.debug(`[DEBUG] ${message}`, meta || "");
    }
  },
};

export default consoleLogger;
