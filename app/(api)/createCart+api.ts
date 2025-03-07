import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { appUsers, userCart } from "@/lib/schema";

export async function POST(request: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql);
    const { userId } = await request.json();
    if (!userId) {
      console.log("createCartFailed");
      return Response.json({ error: "Missing UserId" });
    }

    const [cart] = await db.insert(userCart).values({ userId }).returning();
    console.log(cart);

    return new Response(JSON.stringify({ cart }));
  } catch (error) {
    console.log(error);
    return Response.json({ error: error });
  }
}
