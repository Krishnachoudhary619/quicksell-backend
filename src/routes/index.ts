
import { Router } from "express";
import healthRouter from "./health";
import productRouter from "./product";
import shopRouter from "./shop";
import userRouter from "./user";


const router = Router();

router.use('/health', healthRouter);
router.use('/products', productRouter);
router.use('/shop', shopRouter);
router.use('/users', userRouter);


export default router;
