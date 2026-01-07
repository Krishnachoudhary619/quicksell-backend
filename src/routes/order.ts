
import { Router } from 'express';
import * as orderController from '../controllers/orderController';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/', orderController.createOrder);
router.get('/', auth, orderController.listOrders);
router.get('/:id', auth, orderController.getOrder);

export default router;
