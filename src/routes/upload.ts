import { Router } from 'express';
import { auth } from '../middleware/auth';
import { getPresignedUploadUrls } from '../controllers/uploadController';

const router = Router();

// routes/upload.ts
router.post('/presigned-urls', auth, getPresignedUploadUrls);


export default router;
