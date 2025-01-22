"use server";

import { redirect } from "next/navigation";
import { joinRoomSchema } from "@/validations/room";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function update(
  roomId: number,
  prevState: unknown,
  formData: FormData,
) {
  const session = await auth();
  const validatedFields = joinRoomSchema.safeParse({
    username: formData.get("username") as string,
    character: formData.get("character") as string,
  });

  if (!validatedFields.success) {
    return {
      errors: {
        fields: validatedFields.error.flatten().fieldErrors,
        message: "",
      },
    };
  }

  if (!session?.user.id) {
    return {
      errors: {
        fields: {
          username: ["User not found"],
        },
        message: "",
      },
    };
  }

  const { username, character } = validatedFields.data;
  try {
    await db
      .update(users)
      .set({
        username,
        character,
      })
      .where(eq(users.email, session.user.email))
      .returning();
  } catch (err) {
    console.log(err);
    return {
      errors: {
        fields: {},
        message: "Something went wrong",
      },
    };
  }

  revalidatePath("/room");
  redirect(`/room/${roomId}`);
}
