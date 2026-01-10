
import { prisma } from '../lib/prisma';

import slugify from 'slugify';

const generateUniqueSlug = async (name: string) => {
  let slug = slugify(name, { lower: true, strict: true });
  let isUnique = false;
  let counter = 1;

  while (!isUnique) {
    const existingCatalog = await prisma.catalog.findUnique({
      where: { catalog_slug: slug },
    });

    if (!existingCatalog) {
      isUnique = true;
    } else {
      slug = `${slugify(name, { lower: true, strict: true })}-${counter}`;
      counter++;
    }
  }

  return slug;
};

export const createCatalog = async (shopId: string, userId: string, catalogName: string) => {
  const catalogSlug = await generateUniqueSlug(catalogName);

  const catalog = await prisma.catalog.create({
    data: {
      catalog_name: catalogName,
      catalog_slug: catalogSlug,
      shop_id: shopId,
      created_by: userId,
    },
  });

  return catalog;
};

export const updateCatalog = async (
  catalogId: string,
  shopId: string,
  data: any
) => {
  const catalog = await prisma.catalog.findFirst({
    where: { id: catalogId, shop_id: shopId },
  });

  if (!catalog) {
    throw new Error('Catalog not found or access denied');
  }

  return prisma.catalog.update({
    where: { id: catalogId },
    data: {
      catalog_name: data.catalog_name,
      is_active: data.is_active,
    },
  });
};


export const deleteCatalog = async (catalogId: string, shopId: string) => {
  const catalog = await prisma.catalog.findFirst({
    where: {
      id: catalogId,
      shop_id: shopId,
    },
  });

  if (!catalog) {
    throw new Error('Catalog not found or you do not have permission to delete it');
  }

  await prisma.catalog.update({
    where: {
      id: catalogId,
    },
    data: {
      is_active: false,
    },
  });
};

export const listCatalogs = async (shopId: string) => {
  const catalogs = await prisma.catalog.findMany({
    where: {
      shop_id: shopId,
    },
    select: {
      id: true,
      catalog_name: true,
      catalog_slug: true,
      is_active: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: {
      created_at: 'desc',
    },
  });

  return catalogs.map((catalog) => ({
    id: catalog.id,
    catalog_name: catalog.catalog_name,
    catalog_slug: catalog.catalog_slug,
    is_active: catalog.is_active,
    product_count: catalog._count.products,
  }));
};


export const addProductsToCatalog = async (catalogId: string, shopId: string, productIds: string[]) => {
    const catalog = await prisma.catalog.findFirst({
        where: { id: catalogId, shop_id: shopId },
      });
    
      if (!catalog) {
        throw new Error('Catalog not found or you do not have permission to modify it');
      }
    
      const products = await prisma.product.findMany({
        where: {
          id: { in: productIds },
          shop_id: shopId,
        },
      });
    
      if (products.length !== productIds.length) {
        throw new Error('One or more products not found in your shop');
      }
    
      const existingMappings = await prisma.catalogProduct.findMany({
        where: {
          catalog_id: catalogId,
          product_id: { in: productIds },
        },
      });
    
      const existingProductIds = existingMappings.map((p) => p.product_id);
      const newProductIds = productIds.filter((id) => !existingProductIds.includes(id));
    
      if (newProductIds.length === 0) {
        return;
      }
    
      const maxDisplayOrder = await prisma.catalogProduct.aggregate({
        _max: {
          display_order: true,
        },
        where: {
          catalog_id: catalogId,
        },
      });
    
      let currentDisplayOrder = maxDisplayOrder._max.display_order || 0;
    
      const newCatalogProducts = newProductIds.map((productId) => {
        currentDisplayOrder++;
        return {
          catalog_id: catalogId,
          product_id: productId,
          display_order: currentDisplayOrder,
        };
      });

  await prisma.$transaction(
    newCatalogProducts.map((p) => prisma.catalogProduct.create({ data: p }))
  );
};

export const removeProductFromCatalog = async (catalogId: string, shopId: string, productId: string) => {
    const catalog = await prisma.catalog.findFirst({
        where: { id: catalogId, shop_id: shopId },
      });
    
      if (!catalog) {
        throw new Error('Catalog not found or you do not have permission to modify it');
      }
  await prisma.catalogProduct.deleteMany({
    where: {
      catalog_id: catalogId,
      product_id: productId,
    },
  });
};

export const getCatalogBySlug = async (slug: string) => {
  const catalog = await prisma.catalog.findFirst({
    where: {
      catalog_slug: slug,
      is_active: true,
    },
    select: {
      catalog_name: true,
      products: {
        where: {
          product: {
            is_active: true,
            stock_quantity: {
              gt: 0,
            },
          },
        },
        orderBy: {
          display_order: 'asc',
        },
        select: {
          product: {
            select: {
              id: true,
              product_name: true,
              price: true,
              thumbnail_url: true,
            },
          },
        },
      },
    },
  });

  if (!catalog) {
    throw new Error('Catalog not available');
  }

  return {
    catalog_name: catalog.catalog_name,
    products: catalog.products.map((p) => p.product),
  };
};
