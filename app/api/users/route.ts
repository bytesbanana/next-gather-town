import { auth } from "@/auth";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = auth(async ({ auth }) => {
  if (!auth?.user.email) {
    return NextResponse.json(
      {
        user: null,
      },
      {
        status: 401,
      },
    );
  }
  const result = await db
    .select({
      id: users.id,
      email: users.email,
      image: users.image,
      username: users.username,
      character: users.character,
    })
    .from(users)
    .where(eq(users.email, auth?.user.email));

  if (!result?.length) {
    return NextResponse.json(
      {
        user: null,
      },
      {
        status: 401,
      },
    );
  }

  return NextResponse.json({
    ...result[0],
  });
});
