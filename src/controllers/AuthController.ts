import { Context } from "hono";
import { validateData } from "../validators/validator";
import { baseResponse } from "../helpers/baseResponse";
import { registerSchema, RegisterType } from "../validators/authValidator";
import { prisma } from "../utils/prisma";
import { hash } from "bcrypt-ts";
export const register = async (c: Context) => {
  const body: RegisterType = await c.req.json();
  const { data, error } = validateData(registerSchema, body);
  if (error) {
    return baseResponse.error(c, JSON.stringify(error), 400);
  }
  const { email, fullname, password, role_id } = data;
  const existingUser = await prisma.users.findUnique({ where: { email } });
  if (existingUser) return baseResponse.error(c, "User already exists", 400);
  const hashedPassword = await hash(password, 10);
  const user = await prisma.users.create({
    data: {
      email,
      full_name: fullname,
      password: hashedPassword,
      role_id,
    },
  });
  return baseResponse.created(c, user);
};
