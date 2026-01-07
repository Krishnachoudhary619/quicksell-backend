
import { Router } from 'express';
import { auth, adminOnly } from '../middleware/auth';
import * as shopController from '../controllers/shopController';

const router = Router();

router.get('/', auth, shopController.getShopDetails);
router.put('/', auth, adminOnly, shopController.updateShopProfile);

export default router;
