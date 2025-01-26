import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { cn } from "@/lib/utils";
import StartGame from "./main";
import { socket } from "@/lib/socket";

const PhaserConatiner = ({
  userId,
  username,
  character,
  roomId,
}: {
  userId: number | string;
  username: string;
  character: string;
  roomId: number;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!gameRef.current) {
      gameRef.current = StartGame({ roomId, userId: userId.toString() });
    }
    const controller = new AbortController();

    function onConnect() {
      console.log("[ws] connect");
    }

    async function initWS() {
      socket.on("connect", onConnect);
      controller.signal.addEventListener("abort", () => {
        socket.off("connect", onConnect);
        socket.disconnect();
      });

      socket.auth = { userId, username, character, roomId };
      socket.connect();
    }

    initWS();

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        if (gameRef.current !== null) {
          gameRef.current = null;
        }
      }

      controller.abort();
    };
  }, [character, roomId, userId, username]);

  return (
    <div
      id="phaser-container"
      ref={containerRef}
      className={cn(
        "absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2",
      )}
    ></div>
  );
};

export default PhaserConatiner;
