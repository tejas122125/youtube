import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { appUsers, cartItems, userCart } from "@/lib/schema";

export async function POST(request: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql);
    const { cartId } = await request.json();
    if (!cartId) {
      console.log("removeCartItemsFailed");
      return Response.json({ error: "Missing cartId" });
    }

    const [cart] = await db
      .delete(cartItems)
      .where(eq(cartItems.cartId, cartId))
      .returning();
    console.log(cart);

    return new Response(JSON.stringify({ cart }));
  } catch (error) {
    console.log(error);
    return Response.json({ error: error });
  }
}
