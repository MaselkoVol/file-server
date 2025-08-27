import { Router } from "express";
import controller from "./controller";

const router = Router();

router.post("/", controller.createFolder);
router.get("/", controller.getFolderContent);
router.delete("/", controller.deleteManyFolders);
export default router;
