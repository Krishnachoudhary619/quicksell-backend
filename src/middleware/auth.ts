
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sendResponse } from '../utils/response';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
    shopId: string;
  };
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendResponse(res, 401, false, null, 'Unauthorized');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
      role: string;
      shopId: string;
    };

    req.user = payload;
    next();
  } catch (error) {
    return sendResponse(res, 401, false, null, 'Unauthorized');
  }
};

export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'ADMIN') {
    return sendResponse(res, 403, false, null, 'Forbidden: Admins only');
  }
  next();
};
