import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/response';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  sendResponse(res, 500, false, null, 'Something went wrong!');
};
