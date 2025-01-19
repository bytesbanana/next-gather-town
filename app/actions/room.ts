"use server";

import { redirect } from "next/navigation";
import { joinRoomSchema } from "@/validations/room";
import { db } from "@/db/db";
import { users, usersToRooms } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { MAX_USERS_IN_ROOM } from "@/lib/constants";

export async function joinRoom(
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

  if (!session?.user?.id) {
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
      .where(eq(users.id, session.user.id));

    const result = await db
      .select({ count: count(usersToRooms.userId) })
      .from(usersToRooms)
      .where(eq(usersToRooms.roomId, roomId));

    if (result.at(0)!.count > MAX_USERS_IN_ROOM) {
      return {
        errors: {
          fields: {},
          message: "Room is full",
        },
      };
    }

    await db
      .insert(usersToRooms)
      .values({
        userId: session.user.id,
        roomId,
      })
      .onConflictDoUpdate({
        target: [usersToRooms.userId, usersToRooms.roomId],
        set: {
          userId: session.user.id,
          roomId,
        },
      });
  } catch {
    return {
      errors: {
        fields: {},
        message: "Something went wrong",
      },
    };
  }

  redirect(`/room/${roomId}`);
}
