
import { Response } from 'express';

interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
}

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  data: T | null,
  message: string
) => {
  const response: ApiResponse<T> = {
    success,
    data,
    message,
  };
  res.status(statusCode).json(response);
};
