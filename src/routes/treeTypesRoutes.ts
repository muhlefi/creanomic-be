// src/routes/treeTypeRoutes.ts

import { Hono } from "hono";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  createTreeType,
  deleteTreeType,
  getAllTreeTypes,
  getTreeTypeById,
  updateTreeType,
} from "../controllers/treeTypesController";

const router = new Hono();

router.use("/*", authMiddleware);

router.get("/", getAllTreeTypes);
router.get("/:id", getTreeTypeById);
router.post("/", createTreeType);
router.post("/:id", updateTreeType);
router.delete("/:id", deleteTreeType);

export const treeTypeRoutes = router;