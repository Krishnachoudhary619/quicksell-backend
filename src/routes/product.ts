
import { Router } from 'express';
import { auth } from '../middleware/auth';
import * as productController from '../controllers/productController';

const router = Router();

router.post('/', auth, productController.createProduct);
router.put('/:id', auth, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);
router.get('/', auth, productController.listProducts);
router.patch('/:id/stock', auth, productController.updateStock);

export default router;
