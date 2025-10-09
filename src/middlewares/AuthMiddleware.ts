import { Context, Next } from "hono";
import { verifyToken } from "../utils/jwt";
import { baseResponse } from "../helpers/baseResponse";

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const authHeader = c.req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return baseResponse.unauthorized(c);
    }
    const token = verifyToken(authHeader.split(" ")[1]);
    c.set("user", token);

    await next();
  } catch (_) {
    return baseResponse.unauthorized(c);
  }
};
