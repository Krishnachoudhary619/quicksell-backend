
import { PrismaClient } from '@prisma/client';
import { generateWhatsAppMessage, generateWhatsAppRedirectUrl } from '../utils/whatsapp';

const prisma = new PrismaClient();

export const createOrder = async (catalogId: string, items: { product_id: string; quantity: number }[]) => {
  const catalog = await prisma.catalog.findFirst({
    where: {
      id: catalogId,
      is_active: true,
    },
    include: {
      shop: true,
    },
  });

  if (!catalog) {
    throw new Error('Catalog not found or is inactive');
  }

  const productIds = items.map((item) => item.product_id);
  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
      shop_id: catalog.shop_id,
      is_active: true,
      stock_quantity: { gt: 0 },
    },
  });

  if (products.length !== productIds.length) {
    throw new Error('One or more products are invalid or out of stock');
  }

  const orderItems: any[] = [];
  let totalItems = 0;

  for (const item of items) {
    const product = products.find((p) => p.id === item.product_id);
    if (!product) {
      throw new Error(`Product with ID ${item.product_id} not found`);
    }
    if (item.quantity > product.stock_quantity) {
      throw new Error(`Quantity of product ${product.product_name} exceeds stock`);
    }
    orderItems.push({
      product_id: product.id,
      product_name: product.product_name,
      price: product.price,
      quantity: item.quantity,
    });
    totalItems += item.quantity;
  }

  const order = await prisma.order.create({
    data: {
      shop_id: catalog.shop_id,
      catalog_id: catalogId,
      order_items: JSON.stringify(orderItems),
      total_items: totalItems,
      whatsapp_sent: true, // as per requirement
    },
  });

  const message = await generateWhatsAppMessage(order.id);
  const whatsappUrl = generateWhatsAppRedirectUrl(catalog.shop.shop_phone, message);

  return { whatsapp_url: whatsappUrl };
};

export const listOrders = async (shopId: string) => {
  const orders = await prisma.order.findMany({
    where: {
      shop_id: shopId,
    },
    orderBy: {
      created_at: 'desc',
    },
    select: {
      id: true,
      total_items: true,
      created_at: true,
    },
  });
  return orders;
};

export const getOrderById = async (orderId: string, shopId: string) => {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      shop_id: shopId,
    },
    select: {
      id: true,
      order_items: true,
      total_items: true,
      created_at: true,
    },
  });

  if (!order) {
    throw new Error('Order not found');
  }

  return { ...order, order_items: JSON.parse(order.order_items as string) };
};
