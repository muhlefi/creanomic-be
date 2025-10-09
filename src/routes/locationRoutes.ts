import { Hono } from "hono";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  createLocation,
  deleteLocation,
  getAllLocation,
  getLocationById,
  updateLocation,
} from "../controllers/locationController";

const router = new Hono();

router.get("/", authMiddleware, getAllLocation);
router.get("/id", authMiddleware, getLocationById);
router.post("/", authMiddleware, createLocation);
router.patch("/id", authMiddleware, updateLocation);
router.delete("/", authMiddleware, deleteLocation);

export const locationRoutes = router;
