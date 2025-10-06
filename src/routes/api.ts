import { Hono } from "hono";
import { AuthRoutes } from "./AuthRoutes";
import app from "..";

const router = new Hono();

router.route("/auth", AuthRoutes);

export default router;
