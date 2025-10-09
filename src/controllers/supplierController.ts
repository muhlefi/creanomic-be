// src/controllers/supplierController.ts

import { Context } from "hono";
import { prisma } from "../utils/prisma";
import { baseResponse } from "../helpers/baseResponse";
import { handlePaginate } from "../helpers/handlePaginate";
import { validateData } from "../validators/validator";
import {
  createSupplierSchema,
  CreateSupplier,
  updateSupplierSchema,
  UpdateSupplier,
} from "../validators/supplierValidator";

export const getAllSuppliers = async (c: Context) => {
  try {
    const page = parseInt(c.req.query("page") || "1", 10);
    const perPage = parseInt(c.req.query("perPage") || "10", 10);
    const search = c.req.query("search") || "";

    const result = await handlePaginate(
      prisma.suppliers,
      {
        supplier_name: {
          contains: search,
        },
        deleted_at: null,
      },
      {
        location: true,
      },
      page,
      perPage
    );

    return baseResponse.success(c, result);
  } catch (e: unknown) {
    return baseResponse.error(
      c,
      `Error: ${e instanceof Error ? e.message : "Unknown error"}`
    );
  }
};

export const getSupplierById = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const supplier = await prisma.suppliers.findFirst({
      where: { supplier_id: Number(id), deleted_at: null },
      include: {
        location: true,
      },
    });

    if (!supplier) {
      return baseResponse.error(c, "Supplier not found", 404);
    }

    return baseResponse.show(c, supplier);
  } catch (e: unknown) {
    return baseResponse.error(
      c,
      `Error: ${e instanceof Error ? e.message : "Unknown error"}`
    );
  }
};

export const createSupplier = async (c: Context) => {
  try {
    const user = c.get("user");
    if (!user?.user_id) return baseResponse.unauthorized(c);

    const body: CreateSupplier = await c.req.json();
    const { data, error } = validateData(createSupplierSchema, body);
    if (error) return baseResponse.error(c, JSON.stringify(error), 400);

    const supplier = await prisma.suppliers.create({
      data: { ...data, created_by: user.user_id },
    });
    return baseResponse.created(c, supplier);
  } catch (_) {
    return baseResponse.error(c, "Internal Server Error");
  }
};

export const updateSupplier = async (c: Context) => {
  try {
    const user = c.get("user");
    if (!user?.user_id) return baseResponse.unauthorized(c);

    const id = Number(c.req.param("id"));
    if (isNaN(id)) return baseResponse.error(c, "Invalid supplier ID", 400);

    const body: UpdateSupplier = await c.req.json();
    const { data, error } = validateData(updateSupplierSchema, body);
    if (error) return baseResponse.error(c, JSON.stringify(error), 400);

    const existing = await prisma.suppliers.findFirst({
      where: { supplier_id: id, deleted_at: null },
    });
    if (!existing) return baseResponse.error(c, "Supplier not found", 404);

    const supplier = await prisma.suppliers.update({
      where: { supplier_id: id },
      data: {
        ...data,
        updated_by: user.user_id,
      },
    });

    return baseResponse.updated(c, supplier);
  } catch (error) {
    return baseResponse.error(c, "Internal Server Error", 500);
  }
};

export const deleteSupplier = async (c: Context) => {
  try {
    const user = c.get("user");
    if (!user?.user_id) return baseResponse.unauthorized(c);

    const id = Number(c.req.param("id"));
    if (isNaN(id)) return baseResponse.error(c, "Invalid supplier ID", 400);

    const existing = await prisma.suppliers.findFirst({
      where: { supplier_id: id, deleted_at: null },
    });
    if (!existing) return baseResponse.error(c, "Supplier not found", 404);

    await prisma.suppliers.update({
      where: { supplier_id: id },
      data: {
        deleted_at: new Date(),
        deleted_by: user.user_id,
      },
    });

    return baseResponse.deleted(c);
  } catch (error) {
    return baseResponse.error(c, "Internal Server Error", 500);
  }
};