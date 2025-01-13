import { z } from "zod";

export const joinRoomSchema = z.object({
  username: z.string(),
  character: z.string(),
});
