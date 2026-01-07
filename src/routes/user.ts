
import { Router } from 'express';
import { auth, adminOnly } from '../middleware/auth';
import * as userController from '../controllers/userController';

const router = Router();

router.post('/staff', auth, adminOnly, userController.createStaff);
router.get('/staff', auth, adminOnly, userController.listStaff);
router.patch('/staff/:id/status', auth, adminOnly, userController.updateStaffStatus);
router.get('/me', auth, userController.getMyProfile);

export default router;
