import { Router } from 'express';
import { auth } from '../middleware/auth';
import * as catalogController from '../controllers/catalogController';
import {
  validate,
  createCatalogSchema,
  updateCatalogSchema,
  addProductsToCatalogSchema,
} from '../middleware/validation';

const router = Router();

// 🌍 Public
router.get('/catalog/:slug', catalogController.getCatalogBySlug);

// 🔐 Private (Admin only)
router.post(
  '/catalogs',
  auth,
  validate(createCatalogSchema),
  catalogController.createCatalog
);

router.put(
  '/catalogs/:id',
  auth,
  validate(updateCatalogSchema),
  catalogController.updateCatalog
);

router.delete(
  '/catalogs/:id',
  auth,
  catalogController.deleteCatalog
);

router.get('/catalogs', auth, catalogController.listCatalogs);

router.post(
  '/catalogs/:id/products',
  auth,
  validate(addProductsToCatalogSchema),
  catalogController.addProductsToCatalog
);

router.delete(
  '/catalogs/:id/products/:productId',
  auth,
  catalogController.removeProductFromCatalog
);

export default router;
