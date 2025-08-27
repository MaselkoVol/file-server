import { LoggerMode } from "../../config";
import consoleLogger from "./consoleLogger";

export type Logger = {
  info(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  error(error: string | Error, meta?: Record<string, unknown>): void;
  debug(message: string, meta?: Record<string, unknown>): void;
};

export default function createLogger(mode: LoggerMode): Logger {
  switch (mode) {
    case "CONSOLE":
      return consoleLogger;
    case "FILE":
      throw new Error("Not implemented");
  }
}
