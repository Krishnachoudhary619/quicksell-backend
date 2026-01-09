import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createProduct = async (shopId: string, data: any) => {
  return prisma.product.create({
    data: {
      sku_code: data.sku_code,
      product_name: data.product_name,
      description: data.description,
      price: data.price,
      currency: data.currency ?? 'INR',
      stock_quantity: data.stock_quantity ?? 0,
      is_active: data.is_active ?? true,
      thumbnail_url: data.thumbnail_url,
      image_urls: data.image_urls
        ? JSON.stringify(data.image_urls)
        : null,
      category: data.category,
      shop_id: shopId,
    },
  });
};

export const updateProduct = async (
  productId: string,
  shopId: string,
  data: any
) => {
  const product = await prisma.product.findFirst({
    where: { id: productId, shop_id: shopId },
  });

  if (!product) {
    throw new Error('Product not found or access denied');
  }

  return prisma.product.update({
    where: { id: productId },
    data: {
      sku_code: data.sku_code,
      product_name: data.product_name,
      description: data.description,
      price: data.price,
      currency: data.currency,
      is_active: data.is_active,
      thumbnail_url: data.thumbnail_url,
      image_urls: data.image_urls
        ? JSON.stringify(data.image_urls)
        : undefined,
      category: data.category,
    },
  });
};

export const deleteProduct = async (productId: string, shopId: string) => {
  const product = await prisma.product.findFirst({
    where: { id: productId, shop_id: shopId },
  });

  if (!product) {
    throw new Error('Product not found or access denied');
  }

  await prisma.product.update({
    where: { id: productId },
    data: { is_active: false },
  });
};

export const listProducts = async (shopId: string, query: any) => {
  const where: any = { shop_id: shopId };

  if (query.category) {
    where.category = query.category;
  }

  where.is_active =
    query.active !== undefined ? query.active === 'true' : true;

  return prisma.product.findMany({
    where,
    select: {
      id: true,
      product_name: true,
      thumbnail_url: true,
      price: true,
      stock_quantity: true,
      is_active: true,
    },
  });
};

export const updateStock = async (
  productId: string,
  shopId: string,
  stockQuantity: number
) => {
  const product = await prisma.product.findFirst({
    where: { id: productId, shop_id: shopId },
  });

  if (!product) {
    throw new Error('Product not found or access denied');
  }

  return prisma.product.update({
    where: { id: productId },
    data: { stock_quantity: stockQuantity },
  });
};

export const getProductById = async (productId: string, shopId: string) => {
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      shop_id: shopId,
    },
  });

  if (!product) {
    throw new Error('Product not found or access denied');
  }

  return {
    ...product,
    image_urls: product.image_urls
      ? JSON.parse(product.image_urls)
      : [],
  };
};

export const searchProducts = async (
  shopId: string,
  query: any
) => {
  const {
    q,
    category,
    min_price,
    max_price,
    active,
  } = query;

  const where: any = {
    shop_id: shopId,
  };

  // Text search ( when migrated to sql from sqllite)
  // if (q) {
  //   where.OR = [
  //     { product_name: { contains: q, mode: 'insensitive' } },
  //     { sku_code: { contains: q, mode: 'insensitive' } },
  //     { category: { contains: q, mode: 'insensitive' } },
  //   ];
  // }
  if (q) {
    const keyword = q.toLowerCase();

    where.OR = [
      { product_name: { contains: keyword } },
      { sku_code: { contains: keyword } },
      { category: { contains: keyword } },
    ];
  }

  if (category) {
    where.category = category;
  }

  if (active !== undefined) {
    where.is_active = active === 'true';
  } else {
    where.is_active = true;
  }

  if (min_price || max_price) {
    where.price = {};
    if (min_price) where.price.gte = Number(min_price);
    if (max_price) where.price.lte = Number(max_price);
  }

  return prisma.product.findMany({
    where,
    select: {
      id: true,
      product_name: true,
      price: true,
      stock_quantity: true,
      is_active: true,
    },
    orderBy: {
      created_at: 'desc',
    },
  });
};
