
import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { sendResponse } from '../utils/response';
import * as catalogService from '../services/catalogService';

export const createCatalog = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    const userId = req.user?.userId;
    if (!shopId || !userId) {
      return sendResponse(res, 400, false, null, 'Shop ID or User ID not found in token');
    }
    const { catalog_name } = req.body;
    const catalog = await catalogService.createCatalog(shopId, userId, catalog_name);
    sendResponse(res, 201, true, { id: catalog.id, catalog_slug: catalog.catalog_slug }, 'Catalog created successfully');
  } catch (error: any) {
    sendResponse(res, 500, false, null, error.message);
  }
};

export const updateCatalog = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendResponse(res, 400, false, null, 'Shop ID not found in token');
    }
    const { id } = req.params;
    await catalogService.updateCatalog(id, shopId, req.body);
    sendResponse(res, 200, true, null, 'Catalog updated successfully');
  } catch (error: any) {
    sendResponse(res, 500, false, null, error.message);
  }
};

export const deleteCatalog = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendResponse(res, 400, false, null, 'Shop ID not found in token');
    }
    const { id } = req.params;
    await catalogService.deleteCatalog(id, shopId);
    sendResponse(res, 200, true, null, 'Catalog deleted successfully');
  } catch (error: any) {
    sendResponse(res, 500, false, null, error.message);
  }
};

export const listCatalogs = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendResponse(res, 400, false, null, 'Shop ID not found in token');
    }
    const catalogs = await catalogService.listCatalogs(shopId);
    sendResponse(res, 200, true, catalogs, 'Catalogs fetched successfully');
  } catch (error: any) {
    sendResponse(res, 500, false, null, error.message);
  }
};

export const addProductsToCatalog = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendResponse(res, 400, false, null, 'Shop ID not found in token');
    }
    const { id } = req.params;
    const { product_ids } = req.body;
    await catalogService.addProductsToCatalog(id, shopId, product_ids);
    sendResponse(res, 200, true, null, 'Products added to catalog successfully');
  } catch (error: any) {
    sendResponse(res, 500, false, null, error.message);
  }
};

export const removeProductFromCatalog = async (req: AuthRequest, res: Response) => {
  try {
    const shopId = req.user?.shopId;
    if (!shopId) {
      return sendResponse(res, 400, false, null, 'Shop ID not found in token');
    }
    const { id, productId } = req.params;
    await catalogService.removeProductFromCatalog(id, shopId, productId);
    sendResponse(res, 200, true, null, 'Product removed from catalog successfully');
  } catch (error: any) {
    sendResponse(res, 500, false, null, error.message);
  }
};

export const getCatalogBySlug = async (req: AuthRequest, res: Response) => {
  try {
    const { slug } = req.params;
    const catalog = await catalogService.getCatalogBySlug(slug);
    sendResponse(res, 200, true, catalog, 'Catalog fetched successfully');
  } catch (error: any) {
    sendResponse(res, 404, false, null, error.message);
  }
};
