import { Router } from "express";
import controller from "./controller";

const router = Router();

router.delete("/", controller.deleteManyFiles);

export default router;
