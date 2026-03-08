import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError } from '../utils/response';
import * as catalogService from '../services/catalogService';

export const createCatalog = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'ADMIN' && req.user?.role !== 'OWNER' ) {
      return sendError(res, 'Only admin can create catalogs', 403);
    }

    const catalog = await catalogService.createCatalog(
      req.user.shopId,
      req.user.userId,
      req.body.catalog_name
    );

    sendSuccess(
      res,
      { id: catalog.id, catalog_slug: catalog.catalog_slug },
      'Catalog created successfully',
      201
    );
  } catch (error) {
    sendError(res, (error as Error).message, 400);
  }
};

export const updateCatalog = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'ADMIN' && req.user?.role !== 'OWNER') {
      return sendError(res, 'Only admin can update catalogs', 403);
    }

    await catalogService.updateCatalog(
      req.params.id as string,
      req.user.shopId,
      req.body
    );

    sendSuccess(res, {}, 'Catalog updated successfully');
  } catch (error) {
    sendError(res, (error as Error).message, 400);
  }
};

export const deleteCatalog = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'ADMIN'  && req.user?.role !== 'OWNER') {
      return sendError(res, 'Only admin can delete catalogs', 403);
    }

    await catalogService.deleteCatalog(
      req.params.id as string,
      req.user.shopId
    );

    sendSuccess(res, {}, 'Catalog deleted successfully');
  } catch (error) {
    sendError(res, (error as Error).message, 400);
  }
};

export const listCatalogs = async (req: AuthRequest, res: Response) => {
  try {
    const catalogs = await catalogService.listCatalogs(req.user.shopId);
    sendSuccess(res, catalogs, 'Catalogs fetched successfully');
  } catch (error) {
    sendError(res, (error as Error).message, 500);
  }
};

export const addProductsToCatalog = async (req: AuthRequest, res: Response) => {
  try {
    await catalogService.addProductsToCatalog(
      req.params.id as string,
      req.user.shopId,
      req.body.product_ids
    );

    sendSuccess(res, {}, 'Products added to catalog successfully');
  } catch (error) {
    sendError(res, (error as Error).message, 400);
  }
};

export const removeProductFromCatalog = async (req: AuthRequest, res: Response) => {
  try {
    await catalogService.removeProductFromCatalog(
      req.params.id as string,
      req.user.shopId,
      req.params.productId as string
    );

    sendSuccess(res, {}, 'Product removed from catalog successfully');
  } catch (error) {
    sendError(res, (error as Error).message, 400);
  }
};

export const getCatalogBySlug = async (req: AuthRequest, res: Response) => {
  try {
    const catalog = await catalogService.getCatalogBySlug(req.params.slug as string);
    sendSuccess(res, catalog, 'Catalog fetched successfully');
  } catch (error) {
    sendError(res, (error as Error).message, 404);
  }
};

export const getCatalogProductsForAdmin = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (
      req.user?.role !== 'ADMIN' &&
      req.user?.role !== 'OWNER' &&
      req.user?.role !== 'STAFF'
    ) {
      return sendError(res, 'Unauthorized', 403);
    }

    const catalog = await catalogService.getCatalogProductsForAdmin(
      req.params.id as string,
      req.user.shopId
    );

    sendSuccess(res, catalog, 'Catalog products fetched successfully');
  } catch (error) {
    sendError(res, (error as Error).message, 404);
  }
};

