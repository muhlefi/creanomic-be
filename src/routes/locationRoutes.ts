import { Hono } from "hono";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import {
  createLocation,
  deleteLocation,
  getAllLocation,
  getLocationById,
  updateLocation,
} from "../controllers/locationController";

const router = new Hono();

router.get("/", getAllLocation);
router.get("/id", getLocationById);
router.post("/", AuthMiddleware, createLocation);
router.patch("/id", AuthMiddleware, updateLocation);
router.delete("/", AuthMiddleware, deleteLocation);

export const locationRoutes = router;
