import { sign, verify } from "jsonwebtoken";

export const createToken = (payload: object) =>
  sign(payload, process.env.JWT_SECRET as string, { expiresIn: "8h" });

export const verifyToken = (token: string) => {
  try {
    return verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    return null;
  }
};
