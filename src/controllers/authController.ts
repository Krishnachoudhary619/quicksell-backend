
import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { sendSuccess, sendError } from '../utils/response';

export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;
    await authService.sendOtp(phone);
    sendSuccess(res, {}, 'OTP sent successfully');
  } catch (error) {
    sendError(res, (error as Error).message, 500);
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { phone, otp } = req.body;
    const data = await authService.verifyOtp(phone, otp);
    sendSuccess(res, data, 'Login successful');
  } catch (error) {
    sendError(res, (error as Error).message, 401);
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const { refresh_token } = req.body;
    const data = await authService.refreshAccessToken(refresh_token);
    sendSuccess(res, data, 'Access token refreshed');
  } catch (error) {
    sendError(res, (error as Error).message, 401);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { refresh_token } = req.body;
    await authService.logout(refresh_token);
    sendSuccess(res, {}, 'Logged out successfully');
  } catch (error) {
    sendError(res, (error as Error).message, 500);
  }
};
