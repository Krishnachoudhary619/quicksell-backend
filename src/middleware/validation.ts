import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { sendError } from '../utils/response';

export const validate = (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues
        .map((e) => e.message)
        .join(', ');
      return sendError(res, message, 400); // 👈 MUST return
    }

    // ✅ overwrite body with validated & sanitized data
    req.body = result.data;

    next();
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

export const onboardShopSchema = z.object({
  owner_name: z.string().min(2),
  owner_phone: z.string().regex(/^[0-9]{10}$/, 'owner_phone must be a 10-digit number'),
  shop_name: z.string().min(2),
  shop_phone: z.string().regex(/^[0-9]{10}$/, 'shop_phone must be a 10-digit number'),
});

export const createProductSchema = z.object({
  sku_code: z.string().max(50).optional(),
  product_name: z.string().min(2).max(150),
  description: z.string().max(1000).optional(),
  price: z.coerce.number().positive(),
  currency: z.string().length(3).default('INR'),
  stock_quantity: z.coerce.number().int().min(0).optional(),
  is_active: z.boolean().optional(),
  thumbnail_url: z.string().url().optional(),
  image_urls: z.array(z.string().url()).max(10).optional(),
  category: z.string().max(50).optional(),
}).strict();

export const updateProductSchema = z.object({
  sku_code: z.string().max(50).optional(),
  product_name: z.string().min(2).max(150).optional(),
  description: z.string().max(1000).optional(),
  price: z.coerce.number().positive().optional(),
  currency: z.string().length(3).optional(),
  is_active: z.boolean().optional(),
  thumbnail_url: z.string().url().optional(),
  image_urls: z.array(z.string().url()).max(10).optional(),
  category: z.string().max(50).optional(),
}).strict();

export const updateStockSchema = z.object({
  stock_quantity: z.coerce.number().int().min(0),
}).strict();

export const searchProductQuerySchema = z.object({
  q: z.string().min(1).optional(),
  category: z.string().optional(),
  min_price: z.coerce.number().positive().optional(),
  max_price: z.coerce.number().positive().optional(),
  active: z.enum(['true', 'false']).optional(),
});

//Shop Validation

export const createStaffSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^[1-9][0-9]{9}$/, 'Invalid phone number'),
}).strict();

export const updateStaffStatusSchema = z.object({
  is_active: z.boolean(),
}).strict();

export const updateMyProfileSchema = z.object({
  name: z.string().min(2).max(100),
}).strict();

export const updateShopSchema = z.object({
  shop_name: z.string().min(2).max(150).optional(),
  shop_phone: z.string().regex(/^[1-9][0-9]{9}$/).optional(),
  shop_email: z.string().email().optional(),
  shop_address: z.string().max(500).optional(),
  shop_logo_url: z.string().url().optional(),
  shop_images: z.array(z.string().url()).max(10).optional(),
}).strict();



