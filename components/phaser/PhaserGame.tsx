import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { cn } from "@/lib/utils";
import StartGame from "./main";

const PhaserConatiner = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!gameRef.current) {
      gameRef.current = StartGame();
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        if (gameRef.current !== null) {
          gameRef.current = null;
        }
      }
    };
  }, []);

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
