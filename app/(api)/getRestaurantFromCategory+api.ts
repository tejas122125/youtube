import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import {
  appUsers,
  foodCategories,
  foodItems,
  foodItemsRelations,
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
      },
    });
    const { id } = await request.json();
    if (!id) {
      console.log("first");
      return Response.json({ error: "Missing Required Fields" });
    }
    const data = await db.query.foodCategories.findFirst({
      where: eq(foodCategories.id, id),
    });
    return Response.json({ data });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error });
  }
}
