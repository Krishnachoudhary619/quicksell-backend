
import { Request, Response } from 'express';
import * as orderService from '../services/orderService';
import { sendSuccess } from '../utils/response';

export const createOrder = async (req: Request, res: Response, next: Function) => {
  try {
    const { catalog_id, items } = req.body;
    const result = await orderService.createOrder(catalog_id, items);
    sendSuccess(res, result, 'Order placed successfully');
  } catch (error) {
    next(error);
  }
};

export const listOrders = async (req: Request, res: Response, next: Function) => {
  try {
    // @ts-ignore
    const shopId = req.user.shop_id;
    const orders = await orderService.listOrders(shopId);
    sendSuccess(res, orders, 'Orders fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (req: Request, res: Response, next: Function) => {
  try {
    const { id } = req.params;
    // @ts-ignore
    const shopId = req.user.shop_id;
    const order = await orderService.getOrderById(id, shopId);
    sendSuccess(res, order, 'Order details fetched successfully');
  } catch (error) {
    next(error);
  }
};
