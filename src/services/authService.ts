
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
// import { User } from '../models/index';

const prisma = new PrismaClient();

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOtp = async (phone: string) => {
  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  await prisma.otpSession.create({
    data: {
      phone,
      otp_code: otp,
      expires_at: expiresAt,
    },
  });

  // In a real application, you would send the OTP via an SMS gateway
  console.log(`OTP for ${phone} is ${otp}`);
};

export const verifyOtp = async (phone: string, otp: string) => {
  const otpSession = await prisma.otpSession.findFirst({
    where: {
      phone,
      otp_code: otp,
      is_used: false,
      expires_at: {
        gt: new Date(),
      },
    },
  });

  if (!otpSession) {
    throw new Error('Invalid or expired OTP');
  }

  await prisma.otpSession.update({
    where: {
      id: otpSession.id,
    },
    data: {
      is_used: true,
    },
  });

  let user = await prisma.user.findFirst({
    where: {
      phone,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      last_login_at: new Date(),
    },
  });


  const accessToken = jwt.sign(
    { userId: user.id, role: user.role, shopId: user.shop_id },
    process.env.JWT_SECRET as string,
    { expiresIn: '15m' }
  );

  const refreshToken = crypto.randomBytes(64).toString('hex');
  const refreshTokenExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

  await prisma.refreshToken.create({
    data: {
      user_id: user.id,
      token: refreshToken,
      expires_at: refreshTokenExpiry,
    },
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      role: user.role,
      shop_id: user.shop_id,
    },
  };
};

export const refreshAccessToken = async (refreshToken: string) => {
  const storedToken = await prisma.refreshToken.findFirst({
    where: {
      token: refreshToken,
      is_revoked: false,
      expires_at: {
        gt: new Date(),
      },
    },
    include: {
      user: true,
    },
  });

  if (!storedToken) {
    throw new Error('Invalid or expired refresh token');
  }

  const accessToken = jwt.sign(
    { userId: storedToken.user.id, role: storedToken.user.role, shopId: storedToken.user.shop_id },
    process.env.JWT_SECRET as string,
    { expiresIn: '15m' }
  );

  return { accessToken };
};

export const logout = async (refreshToken: string) => {
  const storedToken = await prisma.refreshToken.findFirst({
    where: {
      token: refreshToken,
    },
  });

  if (storedToken) {
    await prisma.refreshToken.update({
      where: {
        id: storedToken.id,
      },
      data: {
        is_revoked: true,
      },
    });
  }
};
