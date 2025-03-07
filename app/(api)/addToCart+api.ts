import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { appUsers, cartItems, userCart } from "@/lib/schema";

export async function POST(request: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql);
    const { foodItemId, cartId, price } = await request.json();
    if (!foodItemId || !cartId || !price) {
      console.log(foodItemId, cartId, price);
      console.log("addToCartFailed");
      return Response.json({ error: "Missing Fields" });
    }

    const data = await db
      .insert(cartItems)
      .values({
        quantity: 1,
        foodItemId,
        cartId,
        price,
      })
      .returning();

    return new Response(JSON.stringify({ data }));
  } catch (error) {
    console.log(error);
    return Response.json({ error: error });
  }
}
