import cors from "cors";
import express from "express";
import { createServer } from "node:http";
import { DefaultEventsMap, Server } from "socket.io";
import config from "./config";
import foldersRouter from "./folders/router";
import createLogger from "./shared/logger/createLogger";
import errorHandler from "./shared/middleware/errorHandler";
import { ServerToClientEvents } from "./shared/types";

const app = express();
const server = createServer(app);
export const io = new Server<DefaultEventsMap, ServerToClientEvents>(server);

const logger = createLogger(config.loggerMode);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/folders", foldersRouter);

app.use(errorHandler(logger));

server.listen(config.port, () => logger.info(`Running on port ${config.port}`));
