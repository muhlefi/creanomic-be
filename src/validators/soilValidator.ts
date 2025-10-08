import { z } from "zod";

export const soilTypeSchema = z.object({
  soil_type_id: z.number().int().optional(),
  soil_name: z.string().min(1, "Soil name is required"),
  characteristics: z.string().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  created_by: z.number().optional(),
  updated_by: z.number().optional(),
  deleted_at: z.date().nullable().optional(),
  deleted_by: z.number().optional(),
});

export const createSoilTypeSchema = z.object({
  soil_name: z.string().min(1, "Soil name is required"),
  characteristics: z.string().optional(),
});

export const updateSoilTypeSchema = z.object({
  soil_name: z.string().optional(),
  characteristics: z.string().optional(),
});

export type SoilSchemaType = z.infer<typeof soilTypeSchema>;
export type CreateSoilSchemaType = z.infer<typeof createSoilTypeSchema>;
export type UpdateSoilSchemaType = z.infer<typeof updateSoilTypeSchema>;
