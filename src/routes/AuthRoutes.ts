import { Hono } from "hono";
import { login, logout, register } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = new Hono();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);

export const authRoutes = router;
