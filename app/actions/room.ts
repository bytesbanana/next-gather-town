"use server";

import { redirect } from "next/navigation";
import { joinRoomSchema } from "@/validations/room";

export async function joinRoom(
  roomId: string,
  prevState: unknown,
  formData: FormData,
) {
  console.log(roomId, prevState, formData);
  const validatedFields = joinRoomSchema.safeParse({
    username: formData.get("username") as string,
    character: formData.get("character") as string,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // const { username, character } = validatedFields.data;
  //TODO: Save to database

  redirect(`/room/${roomId}`);
}
