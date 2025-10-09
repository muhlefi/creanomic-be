import { Hono } from "hono";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
} from "../controllers/supplierController";

const router = new Hono();

router.use("/*", authMiddleware);

router.get("/", getAllSuppliers);
router.get("/:id", getSupplierById);
router.post("/", createSupplier);
router.patch("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

export const supplierRoutes = router;