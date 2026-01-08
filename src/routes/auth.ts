
import { Router } from 'express';
import * as authController from '../controllers/authController';
import { validate, sendOtpSchema, verifyOtpSchema, refreshTokenSchema } from '../middleware/validation';

const router = Router();

router.post('/send-otp', validate(sendOtpSchema), authController.sendOtp);
router.post('/verify-otp', validate(verifyOtpSchema), authController.verifyOtp);
router.post('/refresh-token', validate(refreshTokenSchema), authController.refreshAccessToken);
router.post('/logout', authController.logout);

export default router;
