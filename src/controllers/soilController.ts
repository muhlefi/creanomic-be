import type { Context } from "hono";
import { prisma } from "../utils/prisma";
import { baseResponse } from "../helpers/baseResponse";
import { validateData } from "../validators/validator";
import {
  CreateSoilSchemaType,
  createSoilTypeSchema,
  UpdateSoilSchemaType,
  updateSoilTypeSchema,
} from "../validators/soilValidator";
import { handlePaginate } from "../helpers/handlePaginate";

export const getAllSoil = async (c: Context) => {
  try {
    const page = parseInt(c.req.query("page") || "1", 10);
    const perPage = parseInt(c.req.query("perPage") || "10", 10);
    const search = c.req.query("search") || "";

    const soils = await handlePaginate(
      prisma.soil_types,
      {},
      {},
      page,
      perPage
    );

    if (!soils) {
      return baseResponse.error(c, "No soil type found");
    }

    return baseResponse.show(c, soils, "List of soil types");
  } catch (error) {
    return baseResponse.error(c, "Internal Server Error", 500);
  }
};

export const getSoilTypeById = async (c: Context) => {
  try {
    const id = c.req.param;
    const soil = await prisma.soil_types.findUnique({
      where: { soil_type_id: Number(id) },
    });
    if (!soil) return baseResponse.error(c, "No Soil Found", 404);
  } catch (_) {
    return baseResponse.error(c, "Internal Server Error", 500);
  }
};

export const createSoilType = async (c: Context) => {
  try {
    const user = c.get("user");
    if (!user?.user_id) return baseResponse.unauthorized(c);

    const body: CreateSoilSchemaType = await c.req.json();
    const { data, error } = validateData(createSoilTypeSchema, body);

    if (error) return baseResponse.error(c, JSON.stringify(error), 400);

    const soil = await prisma.soil_types.create({
      data: { ...data, created_by: user.user_id },
    });
    return baseResponse.created(c, soil);
  } catch (_) {
    return baseResponse.error(c, "Internal Server Error", 500);
  }
};

export const updateSoilType = async (c: Context) => {
  try {
    const user = c.get("user");
    if (!user?.user_id) return baseResponse.unauthorized(c);
    const soilId = Number(c.req.param("soil-id"));
    if (isNaN(soilId))
      return baseResponse.error(c, "Invalid ID parameter", 400);

    const body: UpdateSoilSchemaType = await c.req.json();
    const { data, error } = validateData(updateSoilTypeSchema, body);

    if (error) return baseResponse.error(c, JSON.stringify(error), 400);

    const updated = await prisma.soil_types.update({
      where: { soil_type_id: soilId },
      data: { ...data, updated_by: user.user_id },
    });
    return baseResponse.updated(c, updated);
  } catch (_) {
    return baseResponse.error(c, "Internal Server Error", 500);
  }
};

export const deleteSoilType = async (c: Context) => {
  try {
    const user = c.get("user");
    if (!user?.user_id) return baseResponse.unauthorized(c);

    const id = Number(c.req.param("soil-id"));
    if (isNaN(id)) return baseResponse.error(c, "Invalid ID parameter", 400);

    const existing = await prisma.soil_types.findFirst({
      where: {
        soil_type_id: id,
        deleted_at: null,
        deleted_by: user.user_id,
      },
    });

    if (!existing) {
      return baseResponse.error(
        c,
        "Soil type not found or already deleted",
        404
      );
    }

    const deleted = await prisma.soil_types.update({
      where: { soil_type_id: id },
      data: {
        deleted_at: new Date(),
        deleted_by: user.id,
      },
    });

    return baseResponse.deleted(c);
  } catch (error) {
    console.error("deleteSoilType error:", error);
    return baseResponse.error(c, "Internal Server Error", 500);
  }
};
