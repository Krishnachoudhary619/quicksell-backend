
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { sendSuccess, sendError } from '../utils/response';

const prisma = new PrismaClient();

export const onboardShopOwner = async (req: Request, res: Response) => {
  const { owner_name, owner_phone, shop_name, shop_phone } = req.body;

  try {
    // Note: The unique constraint on the User model is a combination of shop_id and phone.
    // A user with the same phone number can exist in a different shop.
    // The business logic requires that owner_phone should be unique across all users.
    const existingUser = await prisma.user.findFirst({
      where: { phone: owner_phone },
    });

    if (existingUser) {
      return sendError(res, 'User with this phone number already exists', 400);
    }

    const existingShop = await prisma.shop.findFirst({
      where: { shop_phone: shop_phone },
    });

    if (existingShop) {
      return sendError(res, 'Shop with this phone number already exists', 400);
    }

    const result = await prisma.$transaction(async (prisma) => {
      const shop = await prisma.shop.create({
        data: {
          shop_name: shop_name,
          shop_phone: shop_phone,
        },
      });

      const owner = await prisma.user.create({
        data: {
          name: owner_name,
          phone: owner_phone,
          role: 'OWNER',
          shop_id: shop.id,
        },
      });

      return { shop, owner };
    });

    sendSuccess(res, {
      shop: {
        id: result.shop.id,
        name: result.shop.shop_name,
        phone: result.shop.shop_phone,
      },
      owner: {
        id: result.owner.id,
        name: result.owner.name,
        phone: result.owner.phone,
        role: result.owner.role,
      },
    }, 'Shop owner onboarded successfully', 201);

  } catch (error) {
    console.error(error);
    sendError(res, 'Failed to onboard shop owner', 500);
  }
};
