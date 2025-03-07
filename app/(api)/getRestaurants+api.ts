import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { appUsers, foodCategories, restaurants } from "@/lib/schema";

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql, {
      schema: { appUsers, foodCategories, restaurants },
    });
    const data = await db.query.restaurants.findMany({
      where: eq(restaurants.isVerified, "true"),
    });
    return Response.json({ data });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error });
  }
}
