import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { appUsers, userCart } from "@/lib/schema";

export async function POST(request: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql, {
      schema: { appUsers },
    });
    const { phone } = await request.json();
    if (!phone) {
      console.log("first");
      return Response.json({ error: "Missing Required Fields" });
    }

    const user = await db.query.appUsers.findFirst({
      where: eq(appUsers.phone, phone),
    });

    if (!user) {
      return Response.json({ error: "User not found" });
    }

    return new Response(JSON.stringify({ userId: user.id }));
  } catch (error) {
    console.log(error);
    return Response.json({ error: error });
  }
}
