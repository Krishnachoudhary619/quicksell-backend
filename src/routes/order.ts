import { Router } from 'express';
import * as orderController from '../controllers/orderController';
import { auth } from '../middleware/auth';
import { validate, createOrderSchema } from '../middleware/validation';

const router = Router();

// 🌍 Public (from catalog)
router.post(
  '/',
  validate(createOrderSchema),
  orderController.createOrder
);

// 🔐 Private (shop owner/admin)
router.get('/', auth, orderController.listOrders);
router.get('/:id', auth, orderController.getOrder);

export default router;
