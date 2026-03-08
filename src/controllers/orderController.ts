import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import * as orderService from '../services/orderService';
import { sendSuccess, sendError } from '../utils/response';

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { catalog_id, items } = req.body;

    const result = await orderService.createOrder(
      catalog_id,
      items
    );

    sendSuccess(res, result, 'Order placed successfully', 201);
  } catch (error) {
    sendError(res, (error as Error).message, 400);
  }
};

export const listOrders = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendError(res, 'Shop ID not found in token', 400);
    }

    const orders = await orderService.listOrders(shopId);
    sendSuccess(res, orders, 'Orders fetched successfully');
  } catch (error) {
    sendError(res, (error as Error).message, 500);
  }
};

export const getOrder = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendError(res, 'Shop ID not found in token', 400);
    }

    const order = await orderService.getOrderById(
      req.params.id as string,
      shopId
    );

    sendSuccess(res, order, 'Order details fetched successfully');
  } catch (error) {
    sendError(
      res,
      (error as Error).message,
      (error as Error).message.toLowerCase().includes('not found') ? 404 : 500
    );
  }
};
