import { prisma } from '../lib/prisma';


export const generateWhatsAppMessage = async (orderId: string): Promise<string> => {
    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                catalog: true,
                shop: true,
            },
        });

        if (!order) {
            throw new Error('Order not found');
        }

        const orderItems = JSON.parse(order.order_items as string);

        let message = `New Order Received

`;
        message += `Catalog: ${order.catalog.catalog_name}

`;

        for (const item of orderItems) {
            message += `• ${item.product_name} – Qty ${item.quantity} – ₹${item.price}
`;
        }

        message += `
Total Items: ${order.total_items}`;

        return message;
    } catch (error) {
        console.error('Error generating WhatsApp message:', error);
        throw new Error('Failed to generate WhatsApp message');
    }
};

export const generateWhatsAppRedirectUrl = (shopPhone: string, message: string): string => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${shopPhone}?text=${encodedMessage}`;
};
