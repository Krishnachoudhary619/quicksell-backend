
import { Router } from "express";
import healthRouter from "./health";
import productRouter from "./product";
import shopRouter from "./shop";
import userRouter from "./user";
import catalogRouter from "./catalog";


const router = Router();

router.use('/health', healthRouter);
router.use('/products', productRouter);
router.use('/shop', shopRouter);
router.use('/users', userRouter);
router.use('/', catalogRouter);


export default router;
