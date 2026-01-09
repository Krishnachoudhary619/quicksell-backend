import { Router } from "express";
import { auth } from "../middleware/auth";
import * as productController from "../controllers/productController";

import {
  validate,
  createProductSchema,
  updateProductSchema,
  updateStockSchema,
  searchProductQuerySchema,
} from "../middleware/validation";

const router = Router();

router.post(
  "/",
  auth,
  validate(createProductSchema),
  productController.createProduct
);
router.get(
  "/search",
  auth,
  validate(searchProductQuerySchema),
  productController.searchProducts
);

router.put(
  "/:id",
  auth,
  validate(updateProductSchema),
  productController.updateProduct
);

router.delete("/:id", auth, productController.deleteProduct);

router.get("/", auth, productController.listProducts);

router.get("/:id", auth, productController.getProductById);

router.patch(
  "/:id/stock",
  auth,
  validate(updateStockSchema),
  productController.updateStock
);

export default router;
