
import { Router } from 'express';
import { onboardShopOwner } from '../controllers/internalController';
import { validate, onboardShopSchema } from '../middleware/validation';

const router = Router();

router.post('/onboard-shop', validate(onboardShopSchema), onboardShopOwner);

export default router;
