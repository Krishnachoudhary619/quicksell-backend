import { Response } from 'express';

/**
 * Sends a success response following the global response contract.
 * @param res - The Express response object.
 * @param data - The data payload.
 * @param message - A human-readable message.
 * @param statusCode - The HTTP status code (defaults to 200).
 */
export const sendSuccess = (res: Response, data: object, message: string, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    data,
    message,
  });
};

/**
 * Sends an error response following the global response contract.
 * @param res - The Express response object.
 * @param message - A human-readable error message.
 * @param statusCode - The HTTP status code (defaults to 500).
 */
export const sendError = (res: Response, message: string, statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    data: null,
    message,
  });
};
