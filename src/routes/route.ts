import { Hono } from "hono";

import { authRoutes } from "./authRoutes";
import { userRoutes } from "./userRoute";
import { locationRoutes } from "./locationRoutes";
import { soilRoute } from "./soilRoute";

const router = new Hono();

router.route("/auth", authRoutes);
router.route("/user", userRoutes);
router.route("/location", locationRoutes);
router.route("/soil-types", soilRoute);

export default router;
