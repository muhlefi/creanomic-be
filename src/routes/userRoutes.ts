import { Context, Hono } from "hono";
import { authMiddleware } from "../middlewares/authMiddleware";
import { baseResponse } from "../helpers/baseResponse";

export const userRoutes = new Hono();

userRoutes.get("/profile", authMiddleware, async (c: Context) => {
  const user = c.get("user");
  if (!user) return baseResponse.unauthorized(c);
  return c.json({
    success: true,
    message: "User profile fetched successfully",
    data: user,
  });
});
