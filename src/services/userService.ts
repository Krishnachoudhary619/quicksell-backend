import { prisma } from '../lib/prisma';

export const createStaff = async (shopId: string, data: any) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      shop_id: shopId,
      phone: data.phone,
    },
  });

  if (existingUser) {
    throw new Error('User with this phone number already exists in this shop');
  }

  const newUser = await prisma.user.create({
    data: {
      name: data.name,
      phone: data.phone,
      shop_id: shopId,
      role: 'STAFF',
      is_active: true,
    },
    select: {
      id: true,
      name: true,
      phone: true,
      role: true,
      is_active: true,
    },
  });

  return newUser;
};

export const listStaff = async (shopId: string) => {
  return prisma.user.findMany({
    where: {
      shop_id: shopId,
      role: 'STAFF',
    },
    select: {
      id: true,
      name: true,
      phone: true,
      is_active: true,
    },
  });
};

export const updateStaffStatus = async (
  staffId: string,
  shopId: string,
  requesterId: string,
  isActive: boolean
) => {
  const user = await prisma.user.findFirst({
    where: {
      id: staffId,
      shop_id: shopId,
    },
  });

  if (!user) {
    throw new Error('Staff not found');
  }

  if (user.role === 'ADMIN') {
    throw new Error('Cannot disable an admin account');
  }

  if (user.id === requesterId) {
    throw new Error('You cannot disable your own account');
  }

  return prisma.user.update({
    where: { id: staffId },
    data: { is_active: isActive },
  });
};

export const getMyProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      role: true,
      phone: true,
      shop_id: true,
      is_active: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export const updateMyProfile = async (
  userId: string,
  data: any
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name,
    },
    select: {
      id: true,
      name: true,
      phone: true,
      role: true,
      shop_id: true,
      is_active: true,
    },
  });
};


export const updateShopDetails = async (
  shopId: string,
  data: any
) => {
  const shop = await prisma.shop.findUnique({
    where: { id: shopId },
  });

  if (!shop) {
    throw new Error('Shop not found');
  }

  return prisma.shop.update({
    where: { id: shopId },
    data: {
      shop_name: data.shop_name,
      shop_email: data.shop_email,
      shop_phone: data.shop_phone,
      shop_address: data.shop_address,
      shop_logo_url: data.shop_logo_url,
      shop_images: data.shop_images
        ? JSON.stringify(data.shop_images)
        : undefined,
    },
    select: {
      id: true,
      shop_name: true,
      shop_phone: true,
      shop_email: true,
      shop_address: true,
      shop_logo_url: true,
      is_active: true,
    },
  });
};
