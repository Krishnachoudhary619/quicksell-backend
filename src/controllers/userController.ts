
import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { sendResponse } from '../utils/response';
import * as userService from '../services/userService';

export const createStaff = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendResponse(res, 400, false, null, 'Shop ID not found in token');
    }
    const newStaff = await userService.createStaff(shopId, req.body);
    sendResponse(res, 201, true, newStaff, 'Staff created successfully');
  } catch (error: any) {
    sendResponse(res, 500, false, null, error.message);
  }
};

export const listStaff = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendResponse(res, 400, false, null, 'Shop ID not found in token');
    }
    const staff = await userService.listStaff(shopId);
    sendResponse(res, 200, true, staff, 'Staff list fetched successfully');
  } catch (error: any) {
    sendResponse(res, 500, false, null, error.message);
  }
};

export const updateStaffStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;
    await userService.updateStaffStatus(id, is_active);
    sendResponse(res, 200, true, null, 'Staff status updated successfully');
  } catch (error: any) {
    sendResponse(res, 500, false, null, error.message);
  }
};

export const getMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return sendResponse(res, 400, false, null, 'User ID not found in token');
    }
    const user = await userService.getMyProfile(userId);
    sendResponse(res, 200, true, user, 'Profile fetched successfully');
  } catch (error: any) {
    sendResponse(res, 500, false, null, error.message);
  }
};
