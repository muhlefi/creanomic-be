import { z } from "zod";

const latLngSchema = z.object({
  latitude: z
    .number("Latitude is required")
    .min(-90, "Latitude must be >= -90")
    .max(90, "Latitude must be <= 90"),
  longitude: z
    .number("Longitude is required")
    .min(-180, "Longitude must be >= -180")
    .max(180, "Longitude must be <= 180"),
});

export const locationSchema = z
  .object({
    location_id: z.number().int().optional(),
    province: z.string().min(1, "Province is required"),
    city: z.string().min(1, "City is required"),
    vegetation_rate: z.string().min(1, "Vegetation rate is required"),
    tree_density: z.number().int().nonnegative().optional(),
    soil_type_id: z.number().int().optional(),
    created_at: z.date().optional(),
    updated_at: z.date().optional(),
    created_by: z.number().optional(),
    updated_by: z.number().optional(),
    deleted_at: z.date().nullable().optional(),
    deleted_by: z.number().optional(),
  })
  .merge(latLngSchema)
  .transform((data) => ({
    ...data,
    coordinates: [data.latitude, data.longitude] as [number, number],
  }));

export const createLocationSchema = z
  .object({
    province: z.string().min(1, "Province is required"),
    city: z.string().min(1, "City is required"),
    vegetation_rate: z.string().min(1, "Vegetation rate is required"),
    tree_density: z.number().int().nonnegative().optional(),
    soil_type_id: z.number().int().optional(),
  })
  .merge(latLngSchema);

export const updateLocationSchema = z
  .object({
    province: z.string().optional(),
    city: z.string().optional(),
    vegetation_rate: z.string().optional(),
    tree_density: z.number().optional(),
    soil_type_id: z.number().optional(),
  })
  .merge(latLngSchema.partial());

export type CreateLocationType = z.infer<typeof createLocationSchema>;
export type LocationType = z.infer<typeof locationSchema>;
export type UpdateLocationType = z.infer<typeof updateLocationSchema>;
