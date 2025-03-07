import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import {
  appUsers,
  foodCategories,
  foodItems,
  foodItemsRelations,
  orderItems,
  orderItemsRelations,
  orders,
  ordersRelations,
  restaurants,
  restaurantsRelations,
} from "@/lib/schema";

export async function POST(request: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql, {
      schema: {
        appUsers,
        foodCategories,
        restaurants,
        foodItems,
        restaurantsRelations,
        foodItemsRelations,
        orderItems,
        orders,
        ordersRelations,
        orderItemsRelations,
      },
    });
    const { userId } = await request.json();
    if (!userId) {
      console.log("getOrdersFailed");
      return Response.json({ error: "Missing Required Fields" });
    }
    const data = await db.query.orders.findMany({
      where: eq(orders.userId, userId),
      with: {
        orderItems: true,
      },
    });
    return Response.json({ data });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error });
  }
}
