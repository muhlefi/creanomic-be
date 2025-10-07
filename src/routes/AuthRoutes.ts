import { Hono } from "hono";
import { login, register } from "../controllers/authController";

const router = new Hono();

router.post("/register", register);
router.post("/login", login);

export const authRoutes = router;
