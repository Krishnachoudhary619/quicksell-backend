
import { Request, Response, NextFunction } from 'express';
import * as orderService from '../services/orderService';
import { sendResponse } from '../utils/response';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { catalog_id, items } = req.body;
    const result = await orderService.createOrder(catalog_id, items);
    sendResponse(res, 201, true, result, 'Order placed successfully');
  } catch (error) {
    next(error);
  }
};

export const listOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const shopId = req.user.shop_id;
    const orders = await orderService.listOrders(shopId);
    sendResponse(res, 200, true, orders, 'Orders fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    // @ts-ignore
    const shopId = req.user.shop_id;
    const order = await orderService.getOrderById(id, shopId);
    sendResponse(res, 200, true, order, 'Order details fetched successfully');
  } catch (error) {
    next(error);
  }
};
