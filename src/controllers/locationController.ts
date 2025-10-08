import { Context } from "hono";
import { z } from "zod";
import { prisma } from "../utils/prisma";
import { baseResponse } from "../helpers/baseResponse";
import { handlePaginate } from "../helpers/handlePaginate";
import {
  createLocationSchema,
  CreateLocationType,
  updateLocationSchema,
  UpdateLocationType,
} from "../validators/locationValidator";
import { validateData } from "../validators/validator";

export const getAllLocation = async (c: Context) => {
  try {
    const page = parseInt(c.req.query("page") || "1", 10);
    const perPage = parseInt(c.req.query("perPage") || "10", 10);
    const search = c.req.query("search") || "";

    const result = await handlePaginate(
      prisma.locations,
      {},
      {},
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

export const getLocationById = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const location = await prisma.locations.findUnique({
      where: { location_id: Number(id) },
    });

    if (!location) {
      return baseResponse.error(c, "Location not found", 404);
    }

    return baseResponse.show(c, location);
  } catch (e: unknown) {
    return baseResponse.error(
      c,
      `Error: ${e instanceof Error ? e.message : "Unknown error"}`
    );
  }
};

export const createLocation = async (c: Context) => {
  try {
    const user = c.get("user");
    if (!user?.user_id) return baseResponse.unauthorized(c);

    const body: CreateLocationType = await c.req.json();
    const { data, error } = validateData(createLocationSchema, body);
    if (error) return baseResponse.error(c, JSON.stringify(error), 400);

    const location = await prisma.locations.create({
      data: { ...data, created_by: user.user_id },
    });
    return baseResponse.created(c, location);
  } catch (_) {
    return baseResponse.error(c, "Internal Server Error");
  }
};

export const updateLocation = async (c: Context) => {
  try {
    const user = c.get("user");
    if (!user?.user_id) return baseResponse.unauthorized(c);

    const id = Number(c.req.param("id"));
    if (isNaN(id)) return baseResponse.error(c, "Invalid location ID", 400);

    const body: UpdateLocationType = await c.req.json();
    const { data, error } = validateData(updateLocationSchema, body);
    if (error) return baseResponse.error(c, JSON.stringify(error), 400);

    const existing = await prisma.locations.findFirst({
      where: { location_id: id, deleted_at: null },
    });
    if (!existing) return baseResponse.error(c, "Location not found", 404);

    const location = await prisma.locations.update({
      where: { location_id: id },
      data: {
        ...data,
        updated_by: user.user_id,
      },
      include: {
        soil_type: {
          select: { soil_type_id: true, soil_name: true },
        },
      },
    });

    return baseResponse.updated(c, location);
  } catch (error) {
    console.error("updateLocation error:", error);
    return baseResponse.error(c, "Internal Server Error", 500);
  }
};

export const deleteLocation = async (c: Context) => {
  try {
    const user = c.get("user");
    if (!user?.user_id) return baseResponse.unauthorized(c);

    const id = Number(c.req.param("id"));
    if (isNaN(id)) return baseResponse.error(c, "Invalid location ID", 400);

    const existing = await prisma.locations.findFirst({
      where: { location_id: id, deleted_at: null },
    });
    if (!existing) return baseResponse.error(c, "Location not found", 404);

    await prisma.locations.update({
      where: { location_id: id },
      data: {
        deleted_at: new Date(),
        deleted_by: user.user_id,
      },
    });

    return baseResponse.deleted(c);
  } catch (error) {
    console.error("deleteLocation error:", error);
    return baseResponse.error(c, "Internal Server Error", 500);
  }
};
