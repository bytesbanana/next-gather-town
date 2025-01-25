import { env } from "@/env.mjs";
import { io } from "socket.io-client";

export const socket = io(env.NEXT_PUBLIC_WS_URL, {
  autoConnect: false,
});
