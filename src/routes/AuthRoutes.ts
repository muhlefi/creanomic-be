import { Hono } from "hono";
import { login, logout, register } from "../controllers/authController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const router = new Hono();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", AuthMiddleware, logout);

export const authRoutes = router;
