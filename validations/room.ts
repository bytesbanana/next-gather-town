import { z } from "zod";

export const joinRoomSchema = z.object({
  username: z.string().min(1, "Username is required"),
  character: z.string().min(1, "Character is required"),
});
