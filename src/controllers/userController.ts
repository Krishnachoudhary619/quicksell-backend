
import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError } from '../utils/response';
import * as userService from '../services/userService';

export const createStaff = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendError(res, 'Shop ID not found in token', 400);
    }
    const newStaff = await userService.createStaff(shopId, req.body);
    sendSuccess(res, newStaff, 'Staff created successfully', 201);
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
    const { id } = req.params;
    const { is_active } = req.body;
    await userService.updateStaffStatus(id, is_active);
    sendSuccess(res, {}, 'Staff status updated successfully');
  } catch (error) {
    if ((error as Error).message.toLowerCase().includes('not found')) {
      sendError(res, (error as Error).message, 404);
    } else {
      sendError(res, (error as Error).message, 500);
    }
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
    if ((error as Error).message.toLowerCase().includes('not found')) {
      sendError(res, (error as Error).message, 404);
    } else {
      sendError(res, (error as Error).message, 500);
    }
  }
};
