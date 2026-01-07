
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getShopDetails = async (shopId: string) => {
  const shop = await prisma.shop.findUnique({
    where: {
      id: shopId,
    },
  });

  if (!shop) {
    throw new Error('Shop not found');
  }

  return shop;
};

export const updateShopProfile = async (shopId: string, data: any) => {
  const updatedShop = await prisma.shop.update({
    where: {
      id: shopId,
    },
    data,
  });

  return updatedShop;
};
