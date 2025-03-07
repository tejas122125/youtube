import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import {
  appUsers,
  cartItems,
  cartItemsRelations,
  foodItems,
  foodItemsRelations,
  userCart,
  userCartRelations,
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
      },
    });
    const { userId } = await request.json();
    console.log(userId);
    if (!userId) {
      return Response.json({ error: "Missing Required Fields" });
    }

    const cart = await db.query.userCart.findFirst({
      where: eq(userCart.userId, userId),
      with: {
        cartItems: true,
      },
    });

    if (!cart) {
      return Response.json({ error: "Cart not found" });
    }
    return Response.json({ data: cart });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error });
  }
}
