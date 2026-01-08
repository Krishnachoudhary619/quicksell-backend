
import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError } from '../utils/response';
import * as catalogService from '../services/catalogService';

export const createCatalog = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    const userId = req.user?.userId;
    if (!shopId || !userId) {
      return sendError(res, 'Shop ID or User ID not found in token', 400);
    }
    const { catalog_name } = req.body;
    const catalog = await catalogService.createCatalog(shopId, userId, catalog_name);
    sendSuccess(res, { id: catalog.id, catalog_slug: catalog.catalog_slug }, 'Catalog created successfully', 201);
  } catch (error) {
    sendError(res, (error as Error).message, 400);
  }
};

export const updateCatalog = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendError(res, 'Shop ID not found in token', 400);
    }
    const { id } = req.params;
    await catalogService.updateCatalog(id, shopId, req.body);
    sendSuccess(res, {}, 'Catalog updated successfully');
  } catch (error) {
    if ((error as Error).message.toLowerCase().includes('not found')) {
      sendError(res, (error as Error).message, 404);
    } else {
      sendError(res, (error as Error).message, 500);
    }
  }
};

export const deleteCatalog = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendError(res, 'Shop ID not found in token', 400);
    }
    const { id } = req.params;
    await catalogService.deleteCatalog(id, shopId);
    sendSuccess(res, {}, 'Catalog deleted successfully');
  } catch (error) {
    if ((error as Error).message.toLowerCase().includes('not found')) {
      sendError(res, (error as Error).message, 404);
    } else {
      sendError(res, (error as Error).message, 500);
    }
  }
};

export const listCatalogs = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendError(res, 'Shop ID not found in token', 400);
    }
    const catalogs = await catalogService.listCatalogs(shopId);
    sendSuccess(res, catalogs, 'Catalogs fetched successfully');
  } catch (error) {
    sendError(res, (error as Error).message, 500);
  }
};

export const addProductsToCatalog = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendError(res, 'Shop ID not found in token', 400);
    }
    const { id } = req.params;
    const { product_ids } = req.body;
    await catalogService.addProductsToCatalog(id, shopId, product_ids);
    sendSuccess(res, {}, 'Products added to catalog successfully');
  } catch (error) {
    if ((error as Error).message.toLowerCase().includes('not found')) {
      sendError(res, (error as Error).message, 404);
    } else {
      sendError(res, (error as Error).message, 500);
    }
  }
};

export const removeProductFromCatalog = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendError(res, 'Shop ID not found in token', 400);
    }
    const { id, productId } = req.params;
    await catalogService.removeProductFromCatalog(id, shopId, productId);
    sendSuccess(res, {}, 'Product removed from catalog successfully');
  } catch (error) {
    if ((error as Error).message.toLowerCase().includes('not found')) {
      sendError(res, (error as Error).message, 404);
    } else {
      sendError(res, (error as Error).message, 500);
    }
  }
};

export const getCatalogBySlug = async (req: AuthRequest, res: Response) => {
  try {
    const { slug } = req.params;
    const catalog = await catalogService.getCatalogBySlug(slug);
    sendSuccess(res, catalog, 'Catalog fetched successfully');
  } catch (error) {
    sendError(res, (error as Error).message, 404);
  }
};
