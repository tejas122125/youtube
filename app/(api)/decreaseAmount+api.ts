import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { appUsers, cartItems, userCart } from "@/lib/schema";

export async function POST(request: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql);
    const { quantity, id } = await request.json();
    if (!quantity || !id) {
      console.log("decreaseAmountFailed");
      return Response.json({ error: "Missing Fields" });
    }
    if (quantity === 1) {
      await db.delete(cartItems).where(eq(cartItems.id, id)).returning();
    } else {
      await db
        .update(cartItems)
        .set({ quantity: quantity - 1 })
        .where(eq(cartItems.id, id))
        .returning();
    }

    return new Response(JSON.stringify({ data: "success" }));
  } catch (error) {
    console.log(error);
    return Response.json({ error: error });
  }
}
