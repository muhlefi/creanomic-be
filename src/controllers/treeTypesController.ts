// src/controllers/treeTypeController.ts

import { Context } from "hono";
import { prisma } from "../utils/prisma";
import { baseResponse } from "../helpers/baseResponse";
import { handlePaginate } from "../helpers/handlePaginate";
import { validateData } from "../validators/validator";
import {
  createTreeTypeSchema,
  CreateTreeType,
  updateTreeTypeSchema,
  UpdateTreeType,
} from "../validators/treeTypesValidator";

export const getAllTreeTypes = async (c: Context) => {
  try {
    const page = parseInt(c.req.query("page") || "1", 10);
    const perPage = parseInt(c.req.query("perPage") || "10", 10);
    const search = c.req.query("search") || "";

    const result = await handlePaginate(
      prisma.tree_types,
      {
        tree_name: {
          contains: search,
        },
        deleted_at: null,
      },
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

export const getTreeTypeById = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const treeType = await prisma.tree_types.findUnique({
      where: { tree_type_id: Number(id) },
    });

    if (!treeType || treeType.deleted_at) {
      return baseResponse.error(c, "Tree type not found", 404);
    }

    return baseResponse.show(c, treeType);
  } catch (e: unknown) {
    return baseResponse.error(
      c,
      `Error: ${e instanceof Error ? e.message : "Unknown error"}`
    );
  }
};

export const createTreeType = async (c: Context) => {
  try {
    const user = c.get("user");
    if (!user?.user_id) return baseResponse.unauthorized(c);

    const body: CreateTreeType = await c.req.json();
    const { data, error } = validateData(createTreeTypeSchema, body);
    if (error) return baseResponse.error(c, JSON.stringify(error), 400);

    const treeType = await prisma.tree_types.create({
      data: { ...data, created_by: user.user_id },
    });
    return baseResponse.created(c, treeType);
  } catch (_) {
    return baseResponse.error(c, "Internal Server Error");
  }
};

export const updateTreeType = async (c: Context) => {
  try {
    const user = c.get("user");
    if (!user?.user_id) return baseResponse.unauthorized(c);

    const id = Number(c.req.param("id"));
    if (isNaN(id)) return baseResponse.error(c, "Invalid tree type ID", 400);

    const body: UpdateTreeType = await c.req.json();
    const { data, error } = validateData(updateTreeTypeSchema, body);
    if (error) return baseResponse.error(c, JSON.stringify(error), 400);

    const existing = await prisma.tree_types.findFirst({
      where: { tree_type_id: id, deleted_at: null },
    });
    if (!existing) return baseResponse.error(c, "Tree type not found", 404);

    const treeType = await prisma.tree_types.update({
      where: { tree_type_id: id },
      data: {
        ...data,
        updated_by: user.user_id,
      },
    });

    return baseResponse.updated(c, treeType);
  } catch (error) {
    console.error("updateTreeType error:", error);
    return baseResponse.error(c, "Internal Server Error", 500);
  }
};

export const deleteTreeType = async (c: Context) => {
  try {
    const user = c.get("user");
    if (!user?.user_id) return baseResponse.unauthorized(c);

    const id = Number(c.req.param("id"));
    if (isNaN(id)) return baseResponse.error(c, "Invalid tree type ID", 400);

    const existing = await prisma.tree_types.findFirst({
      where: { tree_type_id: id, deleted_at: null },
    });
    if (!existing) return baseResponse.error(c, "Tree type not found", 404);

    await prisma.tree_types.update({
      where: { tree_type_id: id },
      data: {
        deleted_at: new Date(),
        deleted_by: user.user_id,
      },
    });

    return baseResponse.deleted(c);
  } catch (error) {
    console.error("deleteTreeType error:", error);
    return baseResponse.error(c, "Internal Server Error", 500);
  }
};