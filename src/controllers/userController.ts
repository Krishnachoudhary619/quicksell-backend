import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError } from '../utils/response';
import * as userService from '../services/userService';

export const createStaff = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'ADMIN' && req.user?.role !== 'OWNER' ) {
      return sendError(res, 'Only admin can create staff', 403);
    }

    const shopId = req.user.shopId;
    const staff = await userService.createStaff(shopId, req.body);

    sendSuccess(res, staff, 'Staff created successfully', 201);
  } catch (error) {
    sendError(res, (error as Error).message, 400);
  }
};

export const listStaff = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendError(res, 'Shop ID not found in token', 400);
    }

    const staff = await userService.listStaff(shopId);
    sendSuccess(res, staff, 'Staff list fetched successfully');
  } catch (error) {
    sendError(res, (error as Error).message, 500);
  }
};

export const updateStaffStatus = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'ADMIN' && req.user?.role !== 'OWNER') {
      return sendError(res, 'Only admin can update staff status', 403);
    }

    const shopId = req.user.shopId;
    const requesterId = req.user.userId;

    await userService.updateStaffStatus(
      req.params.id as string,
      shopId,
      requesterId,
      req.body.is_active
    );

    sendSuccess(res, {}, 'Staff status updated successfully');
  } catch (error) {
    const msg = (error as Error).message;
    sendError(res, msg, msg.toLowerCase().includes('not found') ? 404 : 400);
  }
};

export const getMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return sendError(res, 'User ID not found in token', 400);
    }

    const user = await userService.getMyProfile(userId);
    sendSuccess(res, user, 'Profile fetched successfully');
  } catch (error) {
    sendError(res, (error as Error).message, 404);
  }
};

export const updateMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return sendError(res, 'User ID not found in token', 400);
    }

    const updatedUser = await userService.updateMyProfile(
      userId,
      req.body
    );

    sendSuccess(res, updatedUser, 'Profile updated successfully');
  } catch (error) {
    sendError(res, (error as Error).message, 400);
  }
};

export const updateMyShop = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'ADMIN' && req.user?.role !== 'OWNER' ) {
      return sendError(res, 'Only admin can update shop details', 403);
    }

    const shopId = req.user.shopId;

    const updatedShop = await userService.updateShopDetails(
      shopId,
      req.body
    );

    sendSuccess(res, updatedShop, 'Shop details updated successfully');
  } catch (error) {
    sendError(res, (error as Error).message, 400);
  }
};

