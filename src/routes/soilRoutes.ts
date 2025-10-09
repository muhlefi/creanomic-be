import { authMiddleware } from "../middlewares/authMiddleware";
import { Hono } from "hono";
import {
  createSoilType,
  deleteSoilType,
  getAllSoil,
  updateSoilType,
  getSoilTypeById
} from "../controllers/soilController";

const router = new Hono();

router.get("/", getAllSoil);
router.get("/:soil-id", getSoilTypeById);
router.post("/", authMiddleware, createSoilType);
router.post("/:soil-id", authMiddleware, updateSoilType);
router.delete("/", authMiddleware, deleteSoilType);

export const soilRoute = router;
