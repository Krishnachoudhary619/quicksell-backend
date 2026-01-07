
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createProduct = async (shopId: string, data: any) => {
  const product = await prisma.product.create({
    data: {
      ...data,
      shop_id: shopId,
    },
  });

  return product;
};

export const updateProduct = async (productId: string, shopId: string, data: any) => {
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      shop_id: shopId,
    },
  });

  if (!product) {
    throw new Error('Product not found or you do not have permission to update it');
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id: productId,
    },
    data,
  });

  return updatedProduct;
};

export const deleteProduct = async (productId: string, shopId: string) => {
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      shop_id: shopId,
    },
  });

  if (!product) {
    throw new Error('Product not found or you do not have permission to delete it');
  }

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      is_active: false,
    },
  });
};

export const listProducts = async (shopId: string, query: any) => {
    const { category, active } = query;
    const where: any = { shop_id: shopId };
  
    if (category) {
      where.category = category;
    }
  
    if (active !== undefined) {
        where.is_active = active === 'true';
      } else {
        where.is_active = true;
      }

  const products = await prisma.product.findMany({
    where,
    select: {
      id: true,
      product_name: true,
      price: true,
      stock_quantity: true,
      is_active: true,
    },
  });

  return products;
};

export const updateStock = async (productId: string, shopId: string, stockQuantity: number) => {
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      shop_id: shopId,
    },
  });

  if (!product) {
    throw new Error('Product not found or you do not have permission to update it');
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      stock_quantity: stockQuantity,
    },
  });

  return updatedProduct;
};
