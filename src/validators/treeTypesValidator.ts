import { z } from "zod";

export const createTreeTypeSchema = z.object({
  tree_name: z.string().min(1, "Tree name is required"),
  description: z.string().optional(),
  care_needs: z.string().optional(),
});

export const updateTreeTypeSchema = createTreeTypeSchema.partial();

export type CreateTreeType = z.infer<typeof createTreeTypeSchema>;
export type UpdateTreeType = z.infer<typeof updateTreeTypeSchema>;