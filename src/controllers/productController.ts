
import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { sendResponse } from '../utils/response';
import * as productService from '../services/productService';

export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendResponse(res, 400, false, null, 'Shop ID not found in token');
    }
    const product = await productService.createProduct(shopId, req.body);
    sendResponse(res, 201, true, { id: product.id }, 'Product created successfully');
  } catch (error: any) {
    sendResponse(res, 500, false, null, error.message);
  }
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendResponse(res, 400, false, null, 'Shop ID not found in token');
    }
    const { id } = req.params;
    await productService.updateProduct(id, shopId, req.body);
    sendResponse(res, 200, true, null, 'Product updated successfully');
  } catch (error: any) {
    sendResponse(res, 500, false, null, error.message);
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendResponse(res, 400, false, null, 'Shop ID not found in token');
    }
    const { id } = req.params;
    await productService.deleteProduct(id, shopId);
    sendResponse(res, 200, true, null, 'Product deleted successfully');
  } catch (error: any) {
    sendResponse(res, 500, false, null, error.message);
  }
};

export const listProducts = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendResponse(res, 400, false, null, 'Shop ID not found in token');
    }
    const products = await productService.listProducts(shopId, req.query);
    sendResponse(res, 200, true, products, 'Products fetched successfully');
  } catch (error: any) {
    sendResponse(res, 500, false, null, error.message);
  }
};

export const updateStock = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendResponse(res, 400, false, null, 'Shop ID not found in token');
    }
    const { id } = req.params;
    const { stock_quantity } = req.body;
    await productService.updateStock(id, shopId, stock_quantity);
    sendResponse(res, 200, true, null, 'Stock updated successfully');
  } catch (error: any) {
    sendResponse(res, 500, false, null, error.message);
  }
};
