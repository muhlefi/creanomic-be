import { Hono } from "hono";

import { authRoutes } from "./authRoutes";
import { userRoutes } from "./userRoute";
import { locationRoutes } from "./locationRoutes";

const router = new Hono();

router.route("/auth", authRoutes);
router.route("/user", userRoutes);
router.route("/location", locationRoutes); 

export default router;