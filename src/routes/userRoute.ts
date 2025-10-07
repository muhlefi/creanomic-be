import { Context, Hono } from "hono";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { baseResponse } from "../helpers/baseResponse";

export const userRoutes = new Hono();

userRoutes.get("/profile", AuthMiddleware, async (c: Context) => {
  const user = c.get("user"); // 🔥 hasil decode dari token
  if (!user) return baseResponse.unauthorized(c);
  return c.json({
    success: true,
    message: "User profile fetched successfully",
    data: user,
  });
});
