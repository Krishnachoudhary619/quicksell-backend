
import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { sendResponse } from '../utils/response';
import * as shopService from '../services/shopService';

export const getShopDetails = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendResponse(res, 400, false, null, 'Shop ID not found in token');
    }
    const shop = await shopService.getShopDetails(shopId);
    sendResponse(res, 200, true, shop, 'Shop details fetched successfully');
  } catch (error: any) {
    sendResponse(res, 500, false, null, error.message);
  }
};

export const updateShopProfile = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendResponse(res, 400, false, null, 'Shop ID not found in token');
    }
    const updatedShop = await shopService.updateShopProfile(shopId, req.body);
    sendResponse(res, 200, true, updatedShop, 'Shop updated successfully');
  } catch (error: any) {
    sendResponse(res, 500, false, null, error.message);
  }
};
