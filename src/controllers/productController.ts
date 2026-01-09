import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError } from '../utils/response';
import * as productService from '../services/productService';

export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendError(res, 'Shop ID not found in token', 400);
    }

    const product = await productService.createProduct(shopId, req.body);
    sendSuccess(res, { id: product.id }, 'Product created successfully', 201);
  } catch (error) {
    sendError(res, (error as Error).message, 400);
  }
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendError(res, 'Shop ID not found in token', 400);
    }

    await productService.updateProduct(req.params.id, shopId, req.body);
    sendSuccess(res, {}, 'Product updated successfully');
  } catch (error) {
    const msg = (error as Error).message;
    sendError(res, msg, msg.toLowerCase().includes('not found') ? 404 : 500);
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendError(res, 'Shop ID not found in token', 400);
    }

    await productService.deleteProduct(req.params.id, shopId);
    sendSuccess(res, {}, 'Product deleted successfully');
  } catch (error) {
    const msg = (error as Error).message;
    sendError(res, msg, msg.toLowerCase().includes('not found') ? 404 : 500);
  }
};

export const listProducts = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendError(res, 'Shop ID not found in token', 400);
    }

    const products = await productService.listProducts(shopId, req.query);
    sendSuccess(res, products, 'Products fetched successfully');
  } catch (error) {
    sendError(res, (error as Error).message, 500);
  }
};

export const updateStock = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendError(res, 'Shop ID not found in token', 400);
    }

    await productService.updateStock(
      req.params.id,
      shopId,
      req.body.stock_quantity
    );

    sendSuccess(res, {}, 'Stock updated successfully');
  } catch (error) {
    const msg = (error as Error).message;
    sendError(res, msg, msg.toLowerCase().includes('not found') ? 404 : 500);
  }
};

export const getProductById = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendError(res, 'Shop ID not found in token', 400);
    }

    const { id } = req.params;

    const product = await productService.getProductById(id, shopId);

    sendSuccess(res, product, 'Product fetched successfully');
  } catch (error) {
    const msg = (error as Error).message;
    sendError(res, msg, msg.toLowerCase().includes('not found') ? 404 : 500);
  }
};

export const searchProducts = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendError(res, 'Shop ID not found in token', 400);
    }

    const products = await productService.searchProducts(
      shopId,
      req.query
    );

    sendSuccess(res, products, 'Products fetched successfully');
  } catch (error) {
    sendError(res, (error as Error).message, 500);
  }
};


