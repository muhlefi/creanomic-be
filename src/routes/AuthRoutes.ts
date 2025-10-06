import { Hono } from "hono";
import { register } from "../controllers/authController";

const router = new Hono();

router.post("/register", register);

export const AuthRoutes = router;
