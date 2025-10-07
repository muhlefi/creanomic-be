import z from "zod";

export const registerSchema = z
  .object({
    email: z.string().email(),
    fullname: z.string().min(4),
    password: z.string().min(8),
    confirm_password: z.string().min(8),
    phone_number: z.string().optional(),
    organization: z.string().optional(),
    role_id: z.number().default(1),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type RegisterType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type LoginType = z.infer<typeof loginSchema>;
