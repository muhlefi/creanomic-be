import { AuthMiddleware } from "../middlewares/authMiddleware";
import { Hono } from "hono";
import {
  createSoilType,
  deleteSoilType,
  getAllSoil,
  updateSoilType,
} from "../controllers/soilController";

const router = new Hono();

router.get("/", getAllSoil);
router.get("/:soil-id", getAllSoil);
router.post("/", AuthMiddleware, createSoilType);
router.patch("/:soil-id", AuthMiddleware, updateSoilType);
router.delete("/", AuthMiddleware, deleteSoilType);

export const soilRoute = router;
