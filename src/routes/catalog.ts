
import { Router } from 'express';
import { auth } from '../middleware/auth';
import * as catalogController from '../controllers/catalogController';

const router = Router();

// Public route
router.get('/catalog/:slug', catalogController.getCatalogBySlug);

// Private routes
router.post('/catalogs', auth, catalogController.createCatalog);
router.put('/catalogs/:id', auth, catalogController.updateCatalog);
router.delete('/catalogs/:id', auth, catalogController.deleteCatalog);
router.get('/catalogs', auth, catalogController.listCatalogs);
router.post('/catalogs/:id/products', auth, catalogController.addProductsToCatalog);
router.delete('/catalogs/:id/products/:productId', auth, catalogController.removeProductFromCatalog);

export default router;
