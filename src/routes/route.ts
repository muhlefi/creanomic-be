import { Hono } from "hono";

import { authRoutes } from "./AuthRoutes";
import { userRoutes } from "./userRoute";

const router = new Hono();

router.route("/auth", authRoutes);
router.route("/user", userRoutes);
export default router;
