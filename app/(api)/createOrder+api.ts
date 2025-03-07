import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import {
  appUsers,
  userCart,
  orderItems,
  orders,
  ordersRelations,
  cartItems,
  userCartRelations,
  cartItemsRelations,
  foodItems,
  foodItemsRelations,
} from "@/lib/schema";

export async function POST(request: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql, {
      schema: {
        appUsers,
        userCart,
        cartItems,
        userCartRelations,
        cartItemsRelations,
        foodItems,
        foodItemsRelations,
        orderItems,
        ordersRelations,
        orders,
      },
    });
    const { userId, totalAmount, razorpayPaymentId, restaurantId } =
      await request.json();
    if (!userId || !totalAmount || !razorpayPaymentId || !restaurantId) {
      console.log("userId", userId);
      console.log("totalAmount", totalAmount);
      console.log("razorpayPaymentId", razorpayPaymentId);

      console.log("createOrderFailed");
      return Response.json({ error: "Missing Field" });
    }

    const [order] = await db
      .insert(orders)
      .values({
        userId,
        totalAmount,
        razorpayPaymentId,
        restaurantId,
      })
      .returning();

    console.log("order", order);
    if (!order) {
      return Response.json({ error: "Order not created" });
    }
    const orderId = order.id;
    return new Response(JSON.stringify({ orderId }));
  } catch (error) {
    console.log("error", error);
    return Response.json({ error: error });
  }
}
