
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { prisma } from '../lib/prisma';



const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOtp = async (phone: string) => {
  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  // Check if a user with this phone number exists, if not, create one.
  // This is a simplified approach. In a real app, you might have a separate registration flow.
  let user = await prisma.user.findFirst({ where: { phone } });
  if (!user) {
    // A shop should be created first, here we assume a default or detected shop context
    // For simplicity, we're skipping shop creation and linking, assuming it exists.
    // In a real scenario, you'd handle shop creation/selection before user registration.
  }


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

  const user = await prisma.user.findFirst({
    where: {
      phone,
    },
  });

  if (!user) {
    // This case should ideally not be hit if sendOtp ensures a user exists.
    // Or if the business logic allows OTP verification before user creation (e.g., during signup).
    throw new Error('User not found. Please sign up first.');
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      last_login_at: new Date(),
    },
  });


  const access_token = jwt.sign(
    { userId: user.id, role: user.role, shopId: user.shop_id },
    process.env.JWT_SECRET as string,
    { expiresIn: '15m' }
  );

  const refresh_token = crypto.randomBytes(64).toString('hex');
  const refreshTokenExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

  await prisma.refreshToken.create({
    data: {
      user_id: user.id,
      token: refresh_token,
      expires_at: refreshTokenExpiry,
    },
  });

  return {
    access_token,
    refresh_token,
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

  const access_token = jwt.sign(
    { userId: storedToken.user.id, role: storedToken.user.role, shopId: storedToken.user.shop_id },
    process.env.JWT_SECRET as string,
    { expiresIn: '15m' }
  );

  return { access_token };
};

export const logout = async (refreshToken: string) => {
  const storedToken = await prisma.refreshToken.findFirst({
    where: {
      token: refreshToken,
    },
  });

  if (storedToken && !storedToken.is_revoked) {
    await prisma.refreshToken.update({
      where: {
        id: storedToken.id,
      },
      data: {
        is_revoked: true,
      },
    });
  }
  // Do not throw an error if the token is not found or already revoked.
};
