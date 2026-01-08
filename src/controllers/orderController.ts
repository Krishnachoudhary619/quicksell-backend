
import { Request, Response } from 'express';
import * as orderService from '../services/orderService';
import { sendSuccess, sendError } from '../utils/response';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { catalog_id, items } = req.body;
    const result = await orderService.createOrder(catalog_id, items);
    sendSuccess(res, result, 'Order placed successfully', 201);
  } catch (error) {
    sendError(res, (error as Error).message, 400);
  }
};

export const listOrders = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const shopId = req.user.shop_id;
    const orders = await orderService.listOrders(shopId);
    sendSuccess(res, orders, 'Orders fetched successfully');
  } catch (error) {
    sendError(res, (error as Error).message, 500);
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // @ts-ignore
    const shopId = req.user.shop_id;
    const order = await orderService.getOrderById(id, shopId);
    sendSuccess(res, order, 'Order details fetched successfully');
  } catch (error) {
    if ((error as Error).message.toLowerCase().includes('not found')) {
      sendError(res, (error as Error).message, 404);
    } else {
      sendError(res, (error as Error).message, 500);
    }
  }
};
