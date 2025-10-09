import { z } from "zod";

export const createSupplierSchema = z.object({
  location_id: z.number().int("Location ID must be an integer"),
  supplier_name: z.string().min(1, "Supplier name is required"),
  contact: z.string().optional(),
  stock: z
    .number()
    .int("Stock must be an integer")
    .nonnegative("Stock cannot be negative"),
  price_per_unit: z
    .number()
    .positive("Price per unit must be a positive number"),
});

export const updateSupplierSchema = createSupplierSchema.partial();

export type CreateSupplier = z.infer<typeof createSupplierSchema>;
export type UpdateSupplier = z.infer<typeof updateSupplierSchema>;