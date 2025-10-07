import { Context } from "hono";
import { validateData } from "../validators/validator";
import { baseResponse } from "../helpers/baseResponse";
import {
  loginSchema,
  LoginType,
  registerSchema,
  RegisterType,
} from "../validators/authValidator";
import { prisma } from "../utils/prisma";
import { compare, hash } from "bcrypt-ts";
import { createToken } from "../utils/jwt";
export const register = async (c: Context) => {
  try {
    const body: RegisterType = await c.req.json();

    const { data, error } = validateData(registerSchema, body);
    if (error) return baseResponse.error(c, JSON.stringify(error), 400);

    const { email, fullname, password, role_id } = data!;

    const [existingUser, hashedPassword] = await Promise.all([
      prisma.users.findUnique({ where: { email } }),
      hash(password, 10),
    ]);

    if (existingUser) {
      return baseResponse.error(c, "User already exists", 400);
    }

    const newUser = await prisma.users.create({
      data: {
        email,
        full_name: fullname,
        password: hashedPassword,
        role_id,
      },
    });

    const { password: _, ...safeUser } = newUser;

    return baseResponse.created(c, safeUser, "User registered successfully");
  } catch (err: any) {
    return baseResponse.error(c, err?.message || "Internal server error", 500);
  }
};

export const login = async (c: Context) => {
  try {
    const body: LoginType = await c.req.json();

    const { data, error } = validateData(loginSchema, body);
    if (error) {
      return baseResponse.error(c, JSON.stringify(error), 400);
    }

    const { email, password } = data!;

    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      return baseResponse.error(c, "User not found", 404);
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      return baseResponse.error(c, "Invalid email or password", 401);
    }

    const token = createToken({
      user_id: user.user_id,
      email: user.email,
      role_id: user.role_id,
    });

    const { password: _, ...safeUser } = user;

    return baseResponse.show(c, { user: safeUser, token }, "Login successful");
  } catch (err: any) {
    return baseResponse.error(c, err?.message || "Internal server error", 500);
  }
};
