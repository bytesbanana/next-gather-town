import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { cn } from "@/lib/utils";

const PhaserConatiner = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    function preload() {}

    function create() {}

    function update() {}

    const config = {
      type: Phaser.AUTO,
      parent: "phaser-container",
      width: innerWidth,
      height: innerHeight - 68,
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    if (!gameRef.current) {
      gameRef.current = new Phaser.Game(config);
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
      className={cn("absolute left-[50%] -translate-x-1/2")}
    ></div>
  );
};

export default PhaserConatiner;
