import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { appUsers, userCart } from "@/lib/schema";

export async function POST(request: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql);
    const { name, phone } = await request.json();
    if (!name || !phone) {
      console.log("first");
      return Response.json({ error: "Missing Required Fields" });
    }

    const [user] = await db
      .insert(appUsers)
      .values({ phone, name, image: "" })
      .returning();

    return new Response(JSON.stringify({ user }));
  } catch (error) {
    console.log(error);
    return Response.json({ error: error });
  }
}
