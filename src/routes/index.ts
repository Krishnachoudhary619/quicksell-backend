
import { Router } from "express";
import healthRouter from "./health";
import productRouter from "./product";
import shopRouter from "./shop";
import userRouter from "./user";
import catalogRouter from "./catalog";
import authRouter from "./auth";
import internalRouter from "./internal";
import orderRouter from './order';


const router = Router();

router.use('/health', healthRouter);
router.use('/products', productRouter);
router.use('/shop', shopRouter);
router.use('/users', userRouter);
router.use('/', catalogRouter);
router.use('/auth', authRouter);
router.use('/internal', internalRouter);
router.use('/orders', orderRouter);



export default router;
