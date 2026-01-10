import { Router } from "express";
import { getHealth } from "../controllers/health";

const router = Router();

router.get("/", getHealth);
router.get('/db', async (_, res) => {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ success: true });
  });

export default router;
