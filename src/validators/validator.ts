import { z, ZodTypeAny } from "zod";

export const validateData = <T extends ZodTypeAny>(
  schema: T,
  data: unknown
):
  | { data: z.infer<T>; error: null }
  | { data: null; error: { path: string; message: string }[] } => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const formattedErrors = result.error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));

    return { data: null, error: formattedErrors };
  }

  return { data: result.data, error: null };
};
