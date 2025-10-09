import { Hono } from "hono";

import { authRoutes } from "./authRoutes";
import { userRoutes } from "./userRoutes";
import { locationRoutes } from "./locationRoutes";
import { soilRoute } from "./soilRoutes";
import { treeTypeRoutes } from "./treeTypesRoutes";

const router = new Hono();

router.route("/auth", authRoutes);
router.route("/user", userRoutes);
router.route("/location", locationRoutes);
router.route("/soil-types", soilRoute);
router.route("/tree-types", treeTypeRoutes);

export default router;
