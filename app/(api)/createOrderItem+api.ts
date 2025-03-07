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
    const { orderId, foodItemId, quantity, price } = await request.json();
    if (!orderId || !foodItemId || !quantity || !price) {
      console.log("userId", orderId);
      console.log("foodItemId", foodItemId);
      console.log("quantity", quantity);
      console.log("price", price);

      console.log("createOrderItemFailed");
      return Response.json({ error: "Missing Field" });
    }

    const [orderItem] = await db
      .insert(orderItems)
      .values({
        orderId,
        foodItemId,
        quantity,
        price,
      })
      .returning();
    console.log("orderItem", orderItem);
    return new Response(JSON.stringify({ orderItem }));
  } catch (error) {
    console.log("error", error);
    return Response.json({ error: error });
  }
}
