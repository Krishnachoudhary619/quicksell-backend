
import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError } from '../utils/response';
import * as shopService from '../services/shopService';

export const getShopDetails = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendError(res, 'Shop ID not found in token', 400);
    }
    const shop = await shopService.getShopDetails(shopId);
    sendSuccess(res, shop, 'Shop details fetched successfully');
  } catch (error) {
    if ((error as Error).message.toLowerCase().includes('not found')) {
      sendError(res, (error as Error).message, 404);
    } else {
      sendError(res, (error as Error).message, 500);
    }
  }
};

export const updateShopProfile = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendError(res, 'Shop ID not found in token', 400);
    }
    const updatedShop = await shopService.updateShopProfile(shopId, req.body);
    sendSuccess(res, updatedShop, 'Shop updated successfully');
  } catch (error) {
    if ((error as Error).message.toLowerCase().includes('not found')) {
      sendError(res, (error as Error).message, 404);
    } else {
      sendError(res, (error as Error).message, 500);
    }
  }
};
