import { Router } from 'express';
import { auth } from '../middleware/auth';
import * as userController from '../controllers/userController';
import {
  validate,
  createStaffSchema,
  updateStaffStatusSchema,
  updateMyProfileSchema,
  updateShopSchema,
} from '../middleware/validation';

const router = Router();

router.post(
  '/staff',
  auth,
  validate(createStaffSchema),
  userController.createStaff
);

router.get('/staff', auth, userController.listStaff);

router.patch(
  '/staff/:id/status',
  auth,
  validate(updateStaffStatusSchema),
  userController.updateStaffStatus
);

// Update my profile (self)
router.patch(
    '/me',
    auth,
    validate(updateMyProfileSchema),
    userController.updateMyProfile
  );
  
  // Update shop details (admin only)
  router.patch(
    '/shop',
    auth,
    validate(updateShopSchema),
    userController.updateMyShop
  );
  

router.get('/me', auth, userController.getMyProfile);

export default router;
