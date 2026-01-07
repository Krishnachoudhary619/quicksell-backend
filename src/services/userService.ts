
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
      ...data,
      shop_id: shopId,
      role: 'STAFF',
    },
  });

  return newUser;
};

export const listStaff = async (shopId: string) => {
  const staff = await prisma.user.findMany({
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

  return staff;
};

export const updateStaffStatus = async (staffId: string, isActive: boolean) => {
    const userToUpdate = await prisma.user.findUnique({
        where: { id: staffId },
      });
    
      if (!userToUpdate) {
        throw new Error(\'Staff not found\');
      }
    
      if (userToUpdate.role === \'ADMIN\') {
        throw new Error(\'Cannot disable an admin account\');
      }
  const updatedStaff = await prisma.user.update({
    where: {
      id: staffId,
    },
    data: {
      is_active: isActive,
    },
  });

  return updatedStaff;
};

export const getMyProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      role: true,
      phone: true,
      shop_id: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
