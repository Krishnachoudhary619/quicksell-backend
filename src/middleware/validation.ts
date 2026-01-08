import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { sendError } from '../utils/response';

export const validate = (schema: z.ZodObject<any, any>) => 
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) { 
      if (error instanceof ZodError) {
        const message = error.issues.map((e) => e.message).join(', ');
        sendError(res, message, 400);
      } else {
        sendError(res, 'An unexpected validation error occurred', 400);
      }
    }
};

export const sendOtpSchema = z.object({
  phone: z.string().regex(/^[1-9][0-9]{9}$/, 'Phone number must be a valid 10-digit number and should not start with 0'),
});

export const verifyOtpSchema = z.object({
  phone: z.string().regex(/^[1-9][0-9]{9}$/, 'Phone number must be a valid 10-digit number'),
  otp: z.string().min(4).max(6).regex(/^[0-9]+$/, 'OTP must be numeric and between 4 to 6 digits'),
});

export const refreshTokenSchema = z.object({
  refresh_token: z.string().nonempty('Refresh token is required'),
});
