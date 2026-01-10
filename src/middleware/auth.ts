
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sendError } from '../utils/response';



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
    return sendError(res, 'Unauthorized', 401);
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
    return sendError(res, 'Unauthorized', 401);
  }
};

export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'ADMIN') {
    return sendError(res, 'Forbidden: Admins only', 403);
  }
  next();
};
